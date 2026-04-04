"use client";

import Image from "next/image";
import useSWRImmutable from "swr";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const formatRelativeDate = (dateString: string) => {
	const itemDate = new Date(dateString);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	today.setHours(0, 0, 0, 0);
	yesterday.setHours(0, 0, 0, 0);
	itemDate.setHours(0, 0, 0, 0);

	if (itemDate.getTime() === today.getTime()) {
		return "Today";
	}

	if (itemDate.getTime() === yesterday.getTime()) {
		return "Yesterday";
	}

	return itemDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

const normalizeMalItem = (item: any) => {
	const entry = item.type === "anime" ? item.anime_entry : item.manga_entry;
	const node = entry.node;
	const listStatus = entry.list_status;
	const url = `https://myanimelist.net/${item.type}/${node.id}`;

	let statusText = "";
	if (item.type === "anime") {
		let verb = "Watching";
		if (listStatus.is_rewatching) {
			verb = "Rewatching";
		} else if (listStatus.status === "completed") {
			verb = "Watched";
		}

		statusText = `${verb}: ${listStatus.num_episodes_watched} ep`;
	} else {
		let verb = "Reading";
		if (listStatus.is_rereading) {
			verb = "Rereading";
		} else if (listStatus.status === "completed") {
			verb = "Read";
		}

		statusText = `${verb}: ${listStatus.num_chapters_read} ch`;
	}

	const formattedDate = formatRelativeDate(item.updated_at);

	return {
		node,
		listStatus,
		url,
		statusText,
		type: item.type,
		updated_at: item.updated_at,
		formattedDate,
	};
};

export const RecentMal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data, error } = useSWRImmutable("/api/mal", fetcher);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	if (!data && !error) {
		return (
			<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full flex flex-row gap-4 p-4">
				<div className="animate-pulse w-28 flex-shrink-0 bg-gray-600/50 rounded-md"></div>
				<div className="flex-1 flex flex-col">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
						Recent Anime/Manga
					</h1>
					<div className="animate-pulse mt-2">
						<div className="h-5 bg-gray-600/50 rounded w-full mb-2"></div>
						<div className="h-5 bg-gray-600/50 rounded w-10/12 mb-2"></div>
						<div className="h-4 bg-gray-600/50 rounded w-1/2 mt-1"></div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full">
				<div className="p-5 w-full">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
						Recent Anime/Manga
					</h1>
					<div className="mt-2">
						<p className="text-text-color font-metropolis">
							Failed to load MAL activity. Please retry later.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const allItems = data.data.data.map(normalizeMalItem);
	const mostRecent = allItems[0];

	return (
		<>
			<div
				className="h-full rounded-lg min-h-[13rem] w-full cursor-pointer group bg-box/70 border-[1px] border-borcol overflow-hidden 
                           flex flex-row gap-4 p-4"
				onClick={openModal}
			>
				<div className="relative w-28 flex-shrink-0">
					<Image
						fill
						alt={mostRecent.node.title}
						src={mostRecent.node.main_picture.medium}
						style={{ objectFit: "cover" }}
						className="rounded-md transition-transform duration-300 group-hover:scale-105"
						unoptimized={true}
					/>
					<span className="absolute top-1 left-1 bg-black/70 text-white text-xs font-metropolis-bold py-1 px-2 rounded-md">
						{mostRecent.type.toUpperCase()}
					</span>
				</div>

				<div className="flex-1 flex flex-col">
					<div>
						<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
							Recent Anime/Manga
						</h1>
					</div>
					<div className="mt-2">
						<h4 className="font-metropolis-bold text-lg leading-5 line-clamp-3 text-text-color group-hover:text-text-lighter/80 transition-colors">
							{mostRecent.node.title}
						</h4>
						<p className="text-md font-metropolis leading-5 text-text-darker mt-1">
							{mostRecent.statusText} &bull; {mostRecent.formattedDate}
						</p>
					</div>
				</div>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50 outline-none" onClose={closeModal}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-box/80 backdrop-blur-sm" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-200"
								enterFrom="opacity-0 scale-[0.98]"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-[0.98]"
							>
								<DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-box/95 border-[1px] border-borcol p-6 text-left align-middle shadow-xl transition-all relative">
									<DialogTitle
										as="h3"
										className="font-metropolis-bold text-text-lighter text-xl leading-6"
									>
										Recent MyAnimeList Activity
									</DialogTitle>
									<button
										onClick={closeModal}
										className="absolute top-4 right-4 text-text-color hover:text-text-lighter p-1 rounded-full transition-colors hover:cursor-pointer"
									>
										<span className="sr-only">
											Close modal
										</span>
										<X size={24} />
									</button>

									<div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
										<div className="flex flex-col gap-4">
											{allItems.map((entry: any) => (
												<a
													key={
														entry.updated_at
													}
													href={entry.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/90 transition-colors duration-200"
												>
													<div className="relative h-20 w-14 flex-shrink-0">
														<Image
															fill
															alt={
																entry
																	.node
																	.title
															}
															src={
																entry
																	.node
																	.main_picture
																	.large
															}
															style={{
																objectFit: "cover",
															}}
															className="rounded-md"
														/>
													</div>
													<div className="overflow-hidden">
														<h4 className="font-metropolis-bold text-text-color text-lg leading-5 truncate">
															{
																entry
																	.node
																	.title
															}
														</h4>
														<p className="text-md font-metropolis text-text-darker">
															{
																entry.statusText
															}{" "}
															&bull;{" "}
															{
																entry.formattedDate
															}
														</p>
													</div>
												</a>
											))}
										</div>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
