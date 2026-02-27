import useSWR from "swr";
import { ValorantMatchResponse } from "./types";
import { ACCOUNTS, fetcher } from "./utils";
import { MatchCard } from "./MatchCard";

export const ModalMatchList = ({ activeAccountIdx }: { activeAccountIdx: number }) => {
	const puuid = ACCOUNTS[activeAccountIdx].puuid;
	const fetchUrl = puuid ? `/api/valorant/matches/${puuid}` : "/api/valorant/matches";
	const { data, error } = useSWR<ValorantMatchResponse>(fetchUrl, fetcher);

	if (error)
		return (
			<div className="text-center py-10 text-red-400 text-sm">
				Failed to load matches for this account.
			</div>
		);
	if (!data)
		return (
			<div className="flex justify-center items-center py-10 text-text-darker/50">
				<div className="animate-pulse flex gap-2 items-center text-sm">
					<div className="w-2 h-2 bg-text-darker/50 rounded-full animate-bounce" />
					<div className="w-2 h-2 bg-text-darker/50 rounded-full animate-bounce delay-75" />
					<div className="w-2 h-2 bg-text-darker/50 rounded-full animate-bounce delay-150" />
				</div>
			</div>
		);

	return (
		<div className="flex flex-col gap-3">
			{data.data.map((match, idx) => (
				<MatchCard key={match.metadata.started_at || idx} match={match} />
			))}
		</div>
	);
};
