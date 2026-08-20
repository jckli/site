"use client";

import { useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

interface Photo {
	id: string;
	name: string;
	thumbnailUrl: string;
	width: number;
	height: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface PhotosResponse {
	items: Photo[];
	nextCursor?: string;
}

const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	375: 1,
};

export default function ProjectsPage() {
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const { data, error, isValidating, setSize } = useSWRInfinite<PhotosResponse>(
		(index, previousPageData) => {
			if (previousPageData && !previousPageData.nextCursor) return null;
			return index === 0 ? "/api/photos" : `/api/photos?cursor=${encodeURIComponent(previousPageData.nextCursor)}`;
		},
		fetcher,
		{
			revalidateOnFocus: false,
		}
	);
	const images = data?.flatMap(page => page.items) ?? [];
	const hasMore = Boolean(data?.at(-1)?.nextCursor);

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
			<>
				<div className="w-full text-center mt-24">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
						Failed to load pictures.
					</h1>
					<p className="text-text-color font-metropolis">Please retry later.</p>
				</div>
			</>
		);
	}

	if (!data) {
		return (
			<>
				<div className="w-full text-center mt-24 ">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl">
						Loading pictures...
					</h1>
					<p className="text-text-color font-metropolis">They&apos;re cool. I swear.</p>
				</div>
			</>
		);
	}

	return (
		<>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="flex w-full smd:ml-[-1.5rem] gap-6"
				columnClassName="smd:pl-6 flex flex-col gap-6"
			>
				{images.map(image => (
					<div key={image.id}>
						<Image
							alt={image.name}
							src={image.thumbnailUrl}
							width={image.width}
							height={image.height}
							className="rounded-lg"
							placeholder="blur"
							blurDataURL={image.thumbnailUrl}
							unoptimized={true}
						/>
					</div>
				))}
			</Masonry>
			{hasMore && <div ref={loadMoreRef} className="h-px" />}
		</>
	);
}
