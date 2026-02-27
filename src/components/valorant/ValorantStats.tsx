"use client";

import useSWR from "swr";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { ValorantRankResponse, ValorantMatchResponse } from "./types";
import { ACCOUNTS, fetcher } from "./utils";
import { ModalMatchList } from "./ModalMatchList";

const SkeletonLoader = () => (
	<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full flex flex-row gap-4 p-4">
		<div className="flex-1 flex flex-col">
			<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
				Valorant Stats
			</h1>
			<div className="animate-pulse mt-2 flex gap-3">
				<div className="w-12 h-12 bg-gray-600/50 rounded-md" />
				<div className="flex-1 flex flex-col">
					<div className="h-5 bg-gray-600/50 rounded w-1/2 mb-2" />
					<div className="h-4 bg-gray-600/50 rounded w-1/4 mt-1" />
				</div>
			</div>
		</div>
	</div>
);

const ErrorState = () => (
	<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full p-5">
		<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">Valorant Stats</h1>
		<p className="mt-2 text-text-color font-metropolis">
			Failed to load Valorant data. Please retry later.
		</p>
	</div>
);

const WidgetFace = ({
	rank,
	lastMatch,
	onClick,
	bgColor,
	accentColor,
}: {
	rank: any;
	lastMatch: any;
	onClick: () => void;
	bgColor: string;
	accentColor: string;
}) => (
	<div
		className="h-full rounded-lg min-h-[13rem] w-full cursor-pointer group bg-box/70 border-[1px] border-borcol overflow-hidden flex flex-col p-4 relative transition-all hover:bg-box/90"
		onClick={onClick}
		style={{
			background: bgColor === "#000000" ? undefined : `${bgColor}80`,
			borderColor: `${accentColor}30`,
		}}
	>
		<h1 className="font-metropolis-bold text-text-lighter text-xl drop-shadow-md z-10">Valorant Stats</h1>

		<div className="flex flex-row items-center mt-2 z-10 gap-3">
			{rank?.tier?.rank_icon_url && (
				<div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
					<Image
						src={rank.tier.rank_icon_url}
						alt={rank.tier.name}
						fill
						style={{ objectFit: "contain" }}
						className="drop-shadow-lg"
					/>
				</div>
			)}
			<div className="flex flex-col justify-center">
				<h2 className="text-xl font-metropolis-bold text-text-lighter drop-shadow-sm">
					{rank?.tier?.name === "Unrated" ? "Unranked" : rank?.tier?.name}
				</h2>
				<p className="text-lg font-metropolis-bold" style={{ color: accentColor }}>
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
									src={lastMatch.my_stats.agent_icon_url}
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
);

export const RecentValorant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeAccountIdx, setActiveAccountIdx] = useState(0);

	const { data: mainRankData, error: rankError } = useSWR<ValorantRankResponse>("/api/valorant/rank", fetcher);
	const { data: mainMatchData } = useSWR<ValorantMatchResponse>("/api/valorant/matches", fetcher);

	const activePuuid = ACCOUNTS[activeAccountIdx].puuid;
	const dynamicRankUrl = activePuuid ? `/api/valorant/rank/${activePuuid}` : "/api/valorant/rank";

	const { data: dynamicRankData } = useSWR<ValorantRankResponse>(isOpen ? dynamicRankUrl : null, fetcher);

	if (!mainRankData && !rankError) return <SkeletonLoader />;
	if (rankError) return <ErrorState />;

	const mainRank = mainRankData?.data?.current;
	const lastMatch = mainMatchData?.data?.[0];
	const mainAccentColor = mainRank?.tier?.rank_color || "#ffffff";
	const mainBgColor = mainRank?.tier?.rank_background_color || "#000000";

	const activeRank = dynamicRankData?.data?.current || mainRank;
	const modalAccentColor = activeRank?.tier?.rank_color || "#ffffff";
	const modalRankName = activeRank?.tier?.name === "Unrated" ? "Unranked" : activeRank?.tier?.name;

	return (
		<>
			<WidgetFace
				rank={mainRank}
				lastMatch={lastMatch}
				onClick={() => setIsOpen(true)}
				bgColor={mainBgColor}
				accentColor={mainAccentColor}
			/>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 outline-none"
					onClose={() => setIsOpen(false)}
				>
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
									<div className="flex justify-between items-center mb-2">
										<DialogTitle
											as="h3"
											className="font-metropolis-bold text-text-lighter text-xl leading-6 flex items-center gap-2"
										>
											Recent Matches
											<span
												className="text-sm font-metropolis-bold px-2 py-0.5 rounded text-black/80 transition-colors duration-300"
												style={{
													backgroundColor:
														modalAccentColor,
												}}
											>
												{modalRankName}{" "}
												{activeRank?.rr
													? `• ${activeRank.rr} RR`
													: ""}
											</span>
										</DialogTitle>
										<button
											onClick={() => setIsOpen(false)}
											className="absolute top-4 right-4 text-text-color hover:text-text-lighter p-1 rounded-full transition-colors hover:cursor-pointer"
										>
											<X size={24} />
										</button>
									</div>

									<div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar border-b border-white/5">
										{ACCOUNTS.map((acc, idx) => (
											<button
												key={idx}
												onClick={() =>
													setActiveAccountIdx(
														idx
													)
												}
												className={clsx(
													"px-4 py-1.5 rounded-full text-sm font-metropolis-bold whitespace-nowrap transition-all duration-200 cursor-pointer outline-none border",
													activeAccountIdx ===
														idx
														? "bg-borcol text-text-lighter border-white/5 shadow-sm"
														: "bg-mainbg text-text-darker border-transparent hover:bg-borcol/60 hover:text-text-lighter"
												)}
											>
												{acc.label}
											</button>
										))}
									</div>
									<div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
										<ModalMatchList
											activeAccountIdx={
												activeAccountIdx
											}
										/>
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
