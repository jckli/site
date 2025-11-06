"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import useSWRImmutable from "swr/immutable";

interface OnedriveItem {
	"@microsoft.graph.downloadUrl": string;
	"name": string;
	"size": number;
	"lastModifiedDateTime": string;
	"file": {
		mimeType: string;
	};
	"image": {
		height: number;
		width: number;
	};
	"thumbnails": OnedriveThumbnail[];
}

interface OnedriveThumbnail {
	small: {
		url: string;
		width: number;
		height: number;
	};
	medium: {
		url: string;
		width: number;
		height: number;
	};
	large: {
		url: string;
		width: number;
		height: number;
	};
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface OnedriveApiResponse {
	status: number;
	data: {
		value: OnedriveItem[];
	};
}

const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	375: 1,
};

export default function ProjectsPage() {
	const { data, error } = useSWRImmutable<OnedriveApiResponse>(
		"/api/photos/01NV5GJPTEVQP3Z732KJF2EWCKNROO7U7R",
		fetcher,
		{
			revalidateOnFocus: false,
		}
	);

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

	if (data.status !== 200) {
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

	// const images = data.data.value.filter(image => image.image.width > 0 && image.image.height > 0);
	const images = data.data.value;

	return (
		<>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="flex w-full smd:ml-[-1.5rem] gap-6"
				columnClassName="smd:pl-6 flex flex-col gap-6"
			>
				{images.map(image => (
					<div key={image.name}>
						<Image
							alt={image.name}
							src={image.thumbnails[0].large.url}
							width={image.thumbnails[0].large.width}
							height={image.thumbnails[0].large.height}
							className="rounded-lg"
							placeholder="blur"
							blurDataURL={image.thumbnails[0].small.url}
							unoptimized={true}
						/>
					</div>
				))}
			</Masonry>
		</>
	);
}
