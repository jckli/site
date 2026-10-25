"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import useSWRInfinite from "swr/infinite";

interface Photo {
	id: string;
	thumbnailUrl: string;
	imageUrl?: string;
	width: number;
	height: number;
	takenAt?: string;
	cameraMake?: string;
	cameraModel?: string;
	lens?: string;
	aperture?: number;
	exposureTime?: number;
	isoSpeed?: number;
	focalLength?: number;
}

interface PhotosResponse {
	items: Photo[];
	nextCursor?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

function photoMetadata(photo: Photo) {
	const make = photo.cameraMake?.trim();
	const model = photo.cameraModel?.trim();
	const camera = make && model && (model.toLowerCase() === make.toLowerCase() || model.toLowerCase().startsWith(`${make.toLowerCase()} `))
		? model
		: [make, model].filter(Boolean).join(" ");
	return {
		camera,
		date: photo.takenAt?.split(" ")[0].replaceAll(":", "-") ?? "",
		settings: [
			photo.focalLength && `${photo.focalLength} mm`,
			photo.aperture && `ƒ/${photo.aperture}`,
			photo.exposureTime && `${photo.exposureTime} s`,
			photo.isoSpeed && `ISO ${photo.isoSpeed}`,
		]
			.filter(Boolean)
			.join(" · "),
	};
}

function syncPhotoOrientation(element: HTMLImageElement, photo: Photo) {
	if ((element.naturalWidth > element.naturalHeight) === (photo.width > photo.height)) return;
	const link = element.closest<HTMLAnchorElement>(".pswp-item");
	if (!link) return;
	link.dataset.pswpWidth = String(photo.height);
	link.dataset.pswpHeight = String(photo.width);
	link.dataset.dimensions = `${photo.height} × ${photo.width}`;
}

export default function PhotosPage() {
	const galleryRef = useRef<HTMLDivElement>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const { data, error, isValidating, setSize } = useSWRInfinite<PhotosResponse>(
		(index, previousPageData) => {
			if (previousPageData && !previousPageData.nextCursor) return null;
			return index === 0 ? "/api/photos" : `/api/photos?cursor=${encodeURIComponent(previousPageData.nextCursor)}`;
		},
		fetcher,
		{ revalidateOnFocus: false }
	);
	const images = data?.flatMap(page => page.items) ?? [];
	const hasMore = Boolean(data?.at(-1)?.nextCursor);

	useEffect(() => {
		const gallery = galleryRef.current;
		if (!gallery) return;

		const lightbox = new PhotoSwipeLightbox({
			gallery,
			children: ".pswp-item",
			pswpModule: () => import("photoswipe"),
		});
		lightbox.on("uiRegister", () => {
			const pswp = lightbox.pswp;
			if (!pswp?.ui) return;

			pswp.ui.registerElement({
				name: "photo-info",
				className: "pswp__photo-info",
				appendTo: "root",
				onInit: (panel, instance) => {
					const update = () => {
						const trigger = instance.currSlide?.data.element;
						if (!(trigger instanceof HTMLElement)) return;

						const title = document.createElement("p");
						title.className = "pswp__photo-title";
						title.textContent = trigger.dataset.camera || "Photo";

						const details = document.createElement("p");
						details.className = "pswp__photo-details";
						details.textContent = [trigger.dataset.date, trigger.dataset.lens]
							.filter(Boolean)
							.join(" · ");

						const settings = document.createElement("p");
						settings.className = "pswp__photo-settings";
						settings.textContent = trigger.dataset.settings || trigger.dataset.dimensions || "";

						panel.replaceChildren(title, details, settings);
					};

					instance.on("change", update);
					update();
				},
			});
		});
		lightbox.init();

		return () => lightbox.destroy();
	}, [images.length]);

	useEffect(() => {
		const target = loadMoreRef.current;
		if (!target || !hasMore) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !isValidating) setSize(size => size + 1);
		});
		observer.observe(target);
		return () => observer.disconnect();
	}, [hasMore, isValidating, setSize]);

	if (error) {
		return (
			<div className="w-full text-center mt-24">
				<h1 className="font-metropolis-bold text-text-lighter text-xl">Failed to load pictures.</h1>
				<p className="text-text-color font-metropolis">Please retry later.</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="w-full text-center mt-24">
				<h1 className="font-metropolis-bold text-text-lighter text-xl">Loading pictures...</h1>
				<p className="text-text-color font-metropolis">They&apos;re cool. I swear.</p>
			</div>
		);
	}

	return (
		<>
			<div ref={galleryRef} className="columns-1 gap-4 sm:columns-2 xl:columns-3" aria-label="Photo gallery">
				{images.map(image => {
					const metadata = photoMetadata(image);
					const hoverDetails = [metadata.date, metadata.settings].filter(Boolean).join(" · ");
					const imageUrl = image.imageUrl || image.thumbnailUrl.replace(/=[^=]+$/, "=s0");
					return (
						<article key={image.id} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-borcol bg-box/70">
							<a
								className="pswp-item block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pink-accent"
								href={imageUrl}
								data-pswp-width={image.width}
								data-pswp-height={image.height}
								data-date={metadata.date}
								data-camera={metadata.camera}
								data-lens={image.lens}
								data-settings={metadata.settings}
								data-dimensions={`${image.width} × ${image.height}`}
								aria-label={`Open photo${metadata.camera ? ` taken with ${metadata.camera}` : ""}`}
							>
								<Image
									alt={metadata.camera ? `Photo taken with ${metadata.camera}` : "Photo"}
									src={image.thumbnailUrl}
									width={image.width}
									height={image.height}
									className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.015]"
									placeholder="blur"
									blurDataURL={image.thumbnailUrl}
									unoptimized
									onLoad={event => syncPhotoOrientation(event.currentTarget, image)}
								/>
							</a>
							<div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-mainbg/95 via-mainbg/15 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
								<div className="min-w-0 text-sm">
									<p className="truncate font-metropolis-bold text-text-lighter">
										{metadata.camera || "Photo"}
									</p>
									{image.lens && <p className="mt-0.5 truncate text-xs text-text-color">{image.lens}</p>}
									<p className="mt-0.5 truncate text-xs text-text-color">
										{hoverDetails || `${image.width} × ${image.height}`}
									</p>
								</div>
								<a
									className="pointer-events-auto ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pink-accent/30 bg-pink-accent/10 text-lg text-pink-accent backdrop-blur-sm transition-colors hover:bg-pink-accent hover:text-mainbg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-accent"
									href={imageUrl}
									target="_blank"
									rel="noreferrer"
									aria-label="Open full-quality photo in a new tab"
								>
									↗
								</a>
							</div>
						</article>
					);
				})}
			</div>
			{hasMore && <div ref={loadMoreRef} className="h-px" />}
		</>
	);
}
