"use client";

import useSWR from "swr";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface ValorantRankResponse {
	status: number;
	data: {
		account: { name: string; tag: string };
		current: {
			tier: { name: string };
			rr: number;
			elo: number;
			rank_icon_url: string;
			rank_color: string;
			rank_background_color: string;
		};
	};
}

interface ValorantMatchResponse {
	status: number;
	data: Array<{
		metadata: {
			map: { name: string };
			mode: string;
			started_at: string;
		};
		my_stats: {
			result: string;
			score: string;
			agent: string;
			agent_icon_url: string;
			kda: string;
			rank_in_game: string;
			damage_delta_per_round: number;
			acs: number;
			hs_percent: number;
		};
	}>;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const formatRelativeDate = (dateString: string) => {
	const itemDate = new Date(dateString);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	if (itemDate.toDateString() === today.toDateString()) return "Today";
	if (itemDate.toDateString() === yesterday.toDateString()) return "Yesterday";
	return itemDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const RecentValorant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: rankData, error: rankError } = useSWR<ValorantRankResponse>("/api/valorant/rank", fetcher);
	const { data: matchData } = useSWR<ValorantMatchResponse>("/api/valorant/matches", fetcher);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	if (!rankData && !rankError) {
		return (
			<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full flex flex-row gap-4 p-4">
				<div className="flex-1 flex flex-col">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
						Valorant Stats
					</h1>
					<div className="animate-pulse mt-2 flex gap-3">
						<div className="w-12 h-12 bg-gray-600/50 rounded-md"></div>
						<div className="animate-pulse flex-1 flex flex-col">
							<div className="h-5 bg-gray-600/50 rounded w-1/2 mb-2"></div>
							<div className="h-4 bg-gray-600/50 rounded w-1/4 mt-1"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (rankError) {
		return (
			<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full">
				<div className="p-5 w-full">
					<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
						Valorant Stats
					</h1>
					<div className="mt-2">
						<p className="text-text-color font-metropolis">
							Failed to load Valorant data. Please retry later.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const rank = rankData?.data?.current;
	const recentMatches = matchData?.data || [];
	const lastMatch = recentMatches[0];
	const accentColor = rank?.rank_color || "#ffffff";
	const bgColor = rank?.rank_background_color || "#181a1b";

	return (
		<>
			<div
				className="h-full rounded-lg min-h-[13rem] w-full cursor-pointer group bg-box/70 border-[1px] border-borcol overflow-hidden flex flex-col p-4 relative transition-all hover:bg-box/90"
				onClick={openModal}
				style={{
					background: `${bgColor}80`,
					borderColor: `${accentColor}30`,
				}}
			>
				<div className="flex flex-row justify-between items-start z-10">
					<h1 className="font-metropolis-bold text-text-lighter text-xl drop-shadow-md">
						Valorant Stats
					</h1>
				</div>

				<div className="flex flex-row items-center mt-2 z-10 gap-3">
					{rank?.rank_icon_url && (
						<div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
							<Image
								src={rank.rank_icon_url}
								alt={rank.tier.name}
								fill
								style={{ objectFit: "contain" }}
								className="drop-shadow-lg"
							/>
						</div>
					)}
					<div className="flex flex-col justify-center">
						<h2 className="text-xl font-metropolis-bold text-text-lighter drop-shadow-sm">
							{rank?.tier.name}
						</h2>
						<p
							className="text-lg font-metropolis-bold"
							style={{ color: accentColor }}
						>
							{rank?.rr} RR
						</p>
					</div>
				</div>

				{lastMatch && (
					<div className="mt-4 pt-4 border-t border-white/5 z-10">
						<p className="text-xs text-text-color font-metropolis uppercase tracking-wider mb-1">
							Last Game
						</p>
						<div className="flex items-center justify-between">
							<span
								className={clsx(
									"font-metropolis-bold",
									lastMatch.my_stats.result === "Victory"
										? "text-emerald-400"
										: lastMatch.my_stats.result === "Defeat"
										? "text-red-400"
										: "text-gray-400"
								)}
							>
								{lastMatch.my_stats.result}
							</span>
							<span className="text-text-color text-sm flex items-center gap-2">
								{lastMatch.my_stats.agent_icon_url && (
									<div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20">
										<Image
											src={
												lastMatch.my_stats
													.agent_icon_url
											}
											alt={lastMatch.my_stats.agent}
											fill
											style={{ objectFit: "cover" }}
										/>
									</div>
								)}
								{lastMatch.my_stats.kda}
							</span>
						</div>
					</div>
				)}
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
										className="font-metropolis-bold text-text-lighter text-xl leading-6 flex items-center gap-2"
									>
										Recent Matches
										<span
											className="text-sm font-metropolis-bold px-2 py-0.5 rounded text-black/80"
											style={{
												backgroundColor:
													accentColor,
											}}
										>
											{rank?.tier.name}
										</span>
									</DialogTitle>

									<button
										onClick={closeModal}
										className="absolute top-4 right-4 text-text-color hover:text-text-lighter p-1 rounded-full transition-colors hover:cursor-pointer"
									>
										<X size={24} />
									</button>

									<div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
										<div className="flex flex-col gap-3">
											{recentMatches.map(
												(match, idx) => (
													<div
														key={
															idx
														}
														className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/90 transition-colors duration-200 border-l-4"
														style={{
															borderColor:
																match
																	.my_stats
																	.result ===
																"Victory"
																	? "#34d399"
																	: match
																			.my_stats
																			.result ===
																	  "Defeat"
																	? "#f87171"
																	: "#9ca3af",
														}}
													>
														<div className="flex sm:flex-col items-center sm:items-start min-w-[120px]">
															<span className="text-text-lighter font-metropolis-bold text-lg">
																{
																	match
																		.metadata
																		.map
																		.name
																}
															</span>
															<span className="text-text-darker text-sm ml-1 sm:ml-0">
																{
																	match
																		.metadata
																		.mode
																}{" "}
																&bull;{" "}
																{formatRelativeDate(
																	match
																		.metadata
																		.started_at
																)}
															</span>
														</div>

														<div className="flex items-center gap-3 min-w-[140px]">
															{match
																.my_stats
																.agent_icon_url && (
																<div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10 bg-black/20">
																	<Image
																		src={
																			match
																				.my_stats
																				.agent_icon_url
																		}
																		alt={
																			match
																				.my_stats
																				.agent
																		}
																		fill
																		style={{
																			objectFit: "cover",
																		}}
																	/>
																</div>
															)}
															<div className="flex flex-col">
																<span
																	className={clsx(
																		"font-metropolis-bold text-lg leading-tight",
																		match
																			.my_stats
																			.result ===
																			"Victory"
																			? "text-emerald-400"
																			: match
																					.my_stats
																					.result ===
																			  "Defeat"
																			? "text-red-400"
																			: "text-gray-400"
																	)}
																>
																	{
																		match
																			.my_stats
																			.score
																	}
																</span>
																<span className="text-text-color text-xs">
																	{
																		match
																			.my_stats
																			.agent
																	}
																</span>
															</div>
														</div>

														<div className="grid grid-cols-4 gap-x-4 gap-y-1 sm:text-right flex-1">
															<div className="flex flex-col">
																<span className="text-text-darker text-xs uppercase tracking-wide">
																	KDA
																</span>
																<span className="text-text-lighter font-medium text-sm">
																	{
																		match
																			.my_stats
																			.kda
																	}
																</span>
															</div>
															<div className="flex flex-col">
																<span className="text-text-darker text-xs uppercase tracking-wide">
																	HS%
																</span>
																<span className="text-text-lighter font-medium text-sm">
																	{
																		match
																			.my_stats
																			.hs_percent
																	}

																	%
																</span>
															</div>
															<div className="flex flex-col">
																<span className="text-text-darker text-xs uppercase tracking-wide">
																	ADR
																</span>
																<span
																	className={clsx(
																		"font-medium text-sm",
																		match
																			.my_stats
																			.damage_delta_per_round >
																			0
																			? "text-emerald-400"
																			: "text-text-lighter"
																	)}
																>
																	{match
																		.my_stats
																		.damage_delta_per_round >
																	0
																		? "+"
																		: ""}
																	{
																		match
																			.my_stats
																			.damage_delta_per_round
																	}
																</span>
															</div>
															{/* ACS Column */}
															<div className="flex flex-col">
																<span className="text-text-darker text-xs uppercase tracking-wide">
																	ACS
																</span>
																<span className="text-text-lighter font-medium text-sm">
																	{
																		match
																			.my_stats
																			.acs
																	}
																</span>
															</div>
														</div>
													</div>
												)
											)}
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
