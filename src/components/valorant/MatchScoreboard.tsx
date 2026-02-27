import { Fragment, useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import { MatchData } from "./types";
import { PARTY_COLORS } from "./utils";

export const MatchScoreboard = ({ match }: { match: MatchData }) => {
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
											<a
												href={`https://tracker.gg/valorant/profile/riot/${encodeURIComponent(
													player.name
												)}%23${encodeURIComponent(
													player.tag
												)}/overview`}
												target="_blank"
												rel="noopener noreferrer"
												onClick={e =>
													e.stopPropagation()
												}
												className="flex items-center gap-1 group/link w-fit"
											>
												<span
													className={clsx(
														"font-metropolis-bold text-sm truncate group-hover/link:underline",
														team.id ===
															"Blue"
															? "text-cyan-200"
															: "text-rose-300"
													)}
												>
													{player.name}
												</span>
												<span className="text-text-darker text-[10px] hidden sm:inline group-hover/link:text-text-color transition-colors">
													#{player.tag}
												</span>
											</a>
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
