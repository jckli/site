import Image from "next/image";
import { ValorantSwitch } from "./ValorantSwitch";
import { ValorantMatch } from "./ValorantMatch";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export async function ValorantRank(props: any) {
    const puuid = "32df10f8-f9c5-5d39-a9b2-f811357ae4b1";
    const data = await getValorantPlayerData(puuid);
    const ranks = await getValorantRanks();
    const currentPlayerRankData =
        ranks.data[ranks.data.length - 1].tiers[data.data.LatestCompetitiveUpdate.TierAfterUpdate];
    const rankedRatingEarned = data.data.LatestCompetitiveUpdate.RankedRatingEarned;
    const latestMatchId = data.data.LatestCompetitiveUpdate.MatchID;

    return (
        <>
            <div
                className="h-full w-full relative flex flex-col items-center justify-center rounded-lg min-h-[13rem] text-white"
                style={{ backgroundColor: `#${currentPlayerRankData.backgroundColor.slice(0, -2)}` }}
            >
                <ValorantSwitch>
                    {/* @ts-expect-error Server Component */}
                    <ValorantMatch
                        backgroundColor={`#${currentPlayerRankData.backgroundColor.slice(0, -2)}`}
                        matchId={latestMatchId}
                        puuid={puuid}
                        rrEarned={rankedRatingEarned}
                    />
                </ValorantSwitch>
                <div className="flex flex-col items-center justify-center">
                    <Image alt="Valorant Rank Icon" src={currentPlayerRankData.largeIcon} width={96} height={96} />
                    <div className="mt-2 flex flex-col items-center justify-center">
                        <h1 className="text-lg leading-6">{currentPlayerRankData.tierName}</h1>
                        <div className="font-metropolis w-full flex flex-col justify-center items-center mt-1">
                            <p className="leading-5">{data.data.LatestCompetitiveUpdate.RankedRatingAfterUpdate}/100</p>
                            <p className="leading-4 text-sm">click for last game</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

async function getValorantPlayerData(puuid: string) {
    const res = await fetch(`https://api.jackli.dev/valorant/mmr/players/${puuid}`, { next: { revalidate: 60 } });
    if (!res.ok) {
        throw new Error("Failed to fetch valorant player data");
    }

    return res.json();
}

async function getValorantRanks() {
    const res = await fetch(`https://valorant-api.com/v1/competitivetiers`);
    if (!res.ok) {
        throw new Error("Failed to fetch valorant rank data");
    }

    return res.json();
}
