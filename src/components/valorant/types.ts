export interface ValorantRankResponse {
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

export interface MatchPlayer {
	puuid: string;
	name: string;
	tag: string;
	team_id: string;
	party_id: string;
	agent: { name: string; icon_url: string };
	stats: { kda: string; acs: number; score: number };
	tier: { name: string; rank_icon_url?: string };
}

export interface MatchData {
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
}

export interface ValorantMatchResponse {
	status: number;
	data: MatchData[];
}
