"use client";

import useSWR from "swr";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface ValorantRankResponse {
	status: number;
	data: {
		account: { name: string; tag: string };
		current: {
			tier: {
				name: string;
				rank_icon_url?: string;
				rank_color?: string;
				rank_background_color?: string;
			};
			rr: number;
		};
	};
}

interface MatchPlayer {
	puuid: string;
	name: string;
	tag: string;
	team_id: string;
	party_id: string;
	agent: { name: string; icon_url: string };
	stats: { kda: string; acs: number; score: number };
	tier: { name: string; rank_icon_url?: string };
}

interface ValorantMatchResponse {
	status: number;
	data: Array<{
		metadata: { map: { name: string }; started_at: string; queue: { id: string; name: string } };
		players: MatchPlayer[];
		teams: Array<{ team_id: string; won: boolean }>;
		my_stats: {
			result: string;
			score: string;
			agent: string;
			agent_icon_url: string;
			kda: string;
			acs: number;
			damage_delta_per_round: number;
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

const PARTY_COLORS = [
	"bg-purple-500",
	"bg-yellow-500",
	"bg-emerald-500",
	"bg-pink-500",
	"bg-orange-500",
	"bg-cyan-500",
];

const MatchScoreboard = ({ match }: { match: ValorantMatchResponse["data"][0] }) => {
	const isCompetitive = match.metadata.queue.id === "competitive";

	const partyColorMap = useMemo(() => {
		const counts = match.players.reduce(
			(acc, p) => ({ ...acc, [p.party_id]: (acc[p.party_id] || 0) + 1 }),
			{} as Record<string, number>
		);
		let cIdx = 0;
		return Object.entries(counts).reduce((acc, [id, count]) => {
			if (count > 1) acc[id] = PARTY_COLORS[cIdx++ % PARTY_COLORS.length];
			return acc;
		}, {} as Record<string, string>);
	}, [match.players]);

	const teams = ["Blue", "Red"].map(teamId => ({
		id: teamId,
		won: match.teams.find(t => t.team_id === teamId)?.won,
		players: match.players.filter(p => p.team_id === teamId).sort((a, b) => b.stats.score - a.stats.score),
	}));

	return (
		<div className="px-4 pb-4 pt-2 overflow-x-auto">
			<table className="w-full text-left text-sm border-collapse min-w-[400px]">
				<thead>
					<tr className="text-text-darker border-b border-white/5 text-xs uppercase tracking-wider">
						<th className="py-2 pl-2 pr-2 font-medium w-14">Agent</th>
						<th className="py-2 pl-3 font-medium">Player</th>
						{isCompetitive && <th className="py-2 font-medium">Rank</th>}
						<th className="py-2 text-right font-medium">KDA</th>
						<th className="py-2 text-right pr-4 font-medium">ACS</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/5">
					{teams.map(team => (
						<Fragment key={team.id}>
							<tr
								className={
									team.id === "Blue"
										? "bg-blue-900/20"
										: "bg-red-900/20"
								}
							>
								<td
									colSpan={isCompetitive ? 5 : 4}
									className={clsx(
										"py-1.5 px-3 border-l-4",
										team.id === "Blue"
											? "border-blue-500"
											: "border-red-500"
									)}
								>
									<span
										className={clsx(
											"font-metropolis-bold text-xs tracking-wider",
											team.id === "Blue"
												? "text-blue-400"
												: "text-red-400"
										)}
									>
										TEAM {team.id.toUpperCase()}{" "}
										{team.won ? " • VICTORY" : " • DEFEAT"}
									</span>
								</td>
							</tr>
							{team.players.map((player, idx) => {
								const rankName =
									player.tier.name === "Unrated"
										? "Unranked"
										: player.tier.name;
								return (
									<tr
										key={player.puuid || idx}
										className="hover:bg-white/5 transition-colors group/row"
									>
										<td className="py-2 pl-3 pr-2 w-14 relative">
											{partyColorMap[
												player.party_id
											] && (
												<div
													className={clsx(
														"absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-sm",
														partyColorMap[
															player
																.party_id
														]
													)}
												/>
											)}
											<div className="relative w-8 h-8 rounded border border-white/10 overflow-hidden bg-black/20 ml-2">
												{player.agent
													.icon_url && (
													<Image
														src={
															player
																.agent
																.icon_url
														}
														alt={
															player
																.agent
																.name
														}
														fill
														className="object-cover"
													/>
												)}
											</div>
										</td>
										<td className="py-2 pl-3">
											<div className="flex items-center gap-1">
												<span
													className={clsx(
														"font-metropolis-bold text-sm truncate",
														team.id ===
															"Blue"
															? "text-cyan-200"
															: "text-rose-300"
													)}
												>
													{player.name}
												</span>
												<span className="text-text-darker text-[10px] hidden sm:inline">
													#{player.tag}
												</span>
											</div>
										</td>
										{isCompetitive && (
											<td className="py-2">
												<div
													className="relative w-6 h-6"
													title={rankName}
												>
													{player.tier
														.rank_icon_url && (
														<Image
															src={
																player
																	.tier
																	.rank_icon_url
															}
															alt={
																rankName
															}
															fill
															className="object-contain"
														/>
													)}
												</div>
											</td>
										)}
										<td className="py-2 text-right font-mono text-text-lighter whitespace-nowrap">
											{player.stats.kda}
										</td>
										<td className="py-2 text-right pr-4 font-mono text-emerald-400">
											{player.stats.acs}
										</td>
									</tr>
								);
							})}
						</Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const RecentValorant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [expandedMatchIdx, setExpandedMatchIdx] = useState<number | null>(null);

	const { data: rankData, error: rankError } = useSWR<ValorantRankResponse>("/api/valorant/rank", fetcher);
	const { data: matchData } = useSWR<ValorantMatchResponse>("/api/valorant/matches", fetcher);

	if (!rankData && !rankError) return <SkeletonLoader />;
	if (rankError) return <ErrorState />;

	const rank = rankData?.data?.current;
	const lastMatch = matchData?.data?.[0];
	const accentColor = rank?.tier?.rank_color || "#ffffff";
	const bgColor = rank?.tier?.rank_background_color || "#000000";

	return (
		<>
			<div
				className="h-full rounded-lg min-h-[13rem] w-full cursor-pointer group bg-box/70 border-[1px] border-borcol overflow-hidden flex flex-col p-4 relative transition-all hover:bg-box/80"
				onClick={() => setIsOpen(true)}
				style={{
					background: bgColor === "#000000" ? undefined : `${bgColor}80`,
					borderColor: `${accentColor}30`,
				}}
			>
				<h1 className="font-metropolis-bold text-text-lighter text-xl drop-shadow-md z-10">
					Valorant Stats
				</h1>

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
				<Dialog
					as="div"
					className="relative z-50 outline-none"
					onClose={() => {
						setIsOpen(false);
						setExpandedMatchIdx(null);
					}}
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
								<DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-box/95 border-[1px] border-borcol p-6 text-left align-middle shadow-xl transition-all relative flex flex-col max-h-[85vh]">
									<div className="flex justify-between items-center mb-4">
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
												{rank?.tier?.name ===
												"Unrated"
													? "Unranked"
													: rank?.tier
															?.name}
											</span>
										</DialogTitle>
										<button
											onClick={() => {
												setIsOpen(false);
												setExpandedMatchIdx(
													null
												);
											}}
											className="text-text-color hover:text-text-lighter p-1 rounded-full transition-colors hover:cursor-pointer"
										>
											<X size={24} />
										</button>
									</div>

									<div className="overflow-y-auto pr-2 -mr-2 flex-1">
										<div className="flex flex-col gap-3">
											{matchData?.data?.map(
												(match, idx) => {
													const isExpanded =
														expandedMatchIdx ===
														idx;
													const stats =
														match.my_stats;
													return (
														<div
															key={
																idx
															}
															className="flex flex-col rounded-lg bg-zinc-800/50 overflow-hidden transition-all duration-300 border-[1px] border-transparent hover:border-white/10"
														>
															<div
																className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-zinc-800/90 hover:cursor-pointer border-l-4 transition-colors"
																style={{
																	borderLeftColor:
																		stats.result ===
																		"Victory"
																			? "#34d399"
																			: stats.result ===
																			  "Defeat"
																			? "#f87171"
																			: "#9ca3af",
																}}
																onClick={e => {
																	e.stopPropagation();
																	setExpandedMatchIdx(
																		prev =>
																			prev ===
																			idx
																				? null
																				: idx
																	);
																}}
															>
																<div className="flex flex-col justify-center w-32 sm:w-40 flex-shrink-0 overflow-hidden">
																	<span className="text-text-lighter font-metropolis-bold text-lg truncate w-full">
																		{
																			match
																				.metadata
																				.map
																				.name
																		}
																	</span>

																	<span
																		className="text-text-darker text-sm truncate w-full"
																		title={`${
																			match
																				.metadata
																				.queue
																				.name
																		} • ${formatRelativeDate(
																			match
																				.metadata
																				.started_at
																		)}`}
																	>
																		{
																			match
																				.metadata
																				.queue
																				.name
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
																	{stats.agent_icon_url && (
																		<div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10 bg-black/20">
																			<Image
																				src={
																					stats.agent_icon_url
																				}
																				alt={
																					stats.agent
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
																				stats.result ===
																					"Victory"
																					? "text-emerald-400"
																					: stats.result ===
																					  "Defeat"
																					? "text-red-400"
																					: "text-gray-400"
																			)}
																		>
																			{
																				stats.score
																			}
																		</span>
																		<span className="text-text-color text-xs">
																			{
																				stats.agent
																			}
																		</span>
																	</div>
																</div>

																<div className="grid grid-cols-4 gap-x-4 gap-y-1 sm:text-right flex-1 items-center">
																	<div className="flex flex-col">
																		<span className="text-text-darker text-xs uppercase tracking-wide">
																			KDA
																		</span>
																		<span className="text-text-lighter font-medium text-sm">
																			{
																				stats.kda
																			}
																		</span>
																	</div>
																	<div className="flex flex-col">
																		<span className="text-text-darker text-xs uppercase tracking-wide">
																			HS%
																		</span>
																		<span className="text-text-lighter font-medium text-sm">
																			{
																				stats.hs_percent
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
																				stats.damage_delta_per_round >
																					0
																					? "text-emerald-400"
																					: "text-red-400"
																			)}
																		>
																			{stats.damage_delta_per_round >
																			0
																				? "+"
																				: ""}
																			{
																				stats.damage_delta_per_round
																			}
																		</span>
																	</div>
																	<div className="flex justify-end">
																		{isExpanded ? (
																			<ChevronUp className="text-text-darker w-5 h-5" />
																		) : (
																			<ChevronDown className="text-text-darker w-5 h-5" />
																		)}
																	</div>
																</div>
															</div>

															{isExpanded && (
																<div className="bg-black/20 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
																	<MatchScoreboard
																		match={
																			match
																		}
																	/>
																</div>
															)}
														</div>
													);
												}
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

const SkeletonLoader = () => (
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

const ErrorState = () => (
	<div className="h-full rounded-lg min-h-[13rem] bg-box/70 border-[1px] border-borcol w-full">
		<div className="p-5 w-full">
			<h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
				Valorant Stats
			</h1>
			<p className="mt-2 text-text-color font-metropolis">
				Failed to load Valorant data. Please retry later.
			</p>
		</div>
	</div>
);
