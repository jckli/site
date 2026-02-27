import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { MatchData } from "./types";
import { formatRelativeDate } from "./utils";
import { MatchScoreboard } from "./MatchScoreboard";

export const MatchCard = ({ match }: { match: MatchData }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const stats = match.my_stats;

	return (
		<div className="flex flex-col rounded-lg bg-zinc-800/50 overflow-hidden transition-all duration-300 border-[1px] border-transparent hover:border-white/10">
			<div
				className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-zinc-800/90 hover:cursor-pointer border-l-4 transition-colors"
				style={{
					borderLeftColor:
						stats.result === "Victory"
							? "#34d399"
							: stats.result === "Defeat"
							? "#f87171"
							: "#9ca3af",
				}}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="flex flex-col justify-center w-32 sm:w-40 flex-shrink-0 overflow-hidden">
					<span className="text-text-lighter font-metropolis-bold text-lg truncate w-full">
						{match.metadata.map.name}
					</span>
					<span
						className="text-text-darker text-sm truncate w-full"
						title={`${match.metadata.queue.name} • ${formatRelativeDate(
							match.metadata.started_at
						)}`}
					>
						{match.metadata.queue.name} &bull;{" "}
						{formatRelativeDate(match.metadata.started_at)}
					</span>
				</div>

				<div className="flex items-center gap-3 min-w-[140px]">
					{stats.agent_icon_url && (
						<div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10 bg-black/20">
							<Image
								src={stats.agent_icon_url}
								alt={stats.agent}
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					)}
					<div className="flex flex-col">
						<span
							className={clsx(
								"font-metropolis-bold text-lg leading-tight",
								stats.result === "Victory"
									? "text-emerald-400"
									: stats.result === "Defeat"
									? "text-red-400"
									: "text-gray-400"
							)}
						>
							{stats.score}
						</span>
						<span className="text-text-color text-xs">{stats.agent}</span>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-x-4 gap-y-1 sm:text-right flex-1 items-center">
					<div className="flex flex-col">
						<span className="text-text-darker text-xs uppercase tracking-wide">
							KDA
						</span>
						<span className="text-text-lighter font-medium text-sm">
							{stats.kda}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-text-darker text-xs uppercase tracking-wide">
							HS%
						</span>
						<span className="text-text-lighter font-medium text-sm">
							{stats.hs_percent}%
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-text-darker text-xs uppercase tracking-wide">
							ADR
						</span>
						<span
							className={clsx(
								"font-medium text-sm",
								stats.damage_delta_per_round > 0
									? "text-emerald-400"
									: "text-red-400"
							)}
						>
							{stats.damage_delta_per_round > 0 ? "+" : ""}
							{stats.damage_delta_per_round}
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
					<MatchScoreboard match={match} />
				</div>
			)}
		</div>
	);
};
