import Image from "next/image";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export async function ValorantMatch(props: any) {
    const data = await getValorantMatchData(props.matchId);
    const playerData = data.data.players.find((player: any) => player.subject === props.puuid);

    const teamScore = data.data.teams.find((team: any) => team.teamId === playerData.teamId);
    const enemyScore = data.data.teams.find((team: any) => team.teamId !== playerData.teamId);

    const agentData = await getValorantAgents();
    const agent = agentData.data.find((agent: any) => agent.uuid === playerData.characterId);
    return (
        <>
            <div
                className="h-full w-full rounded-md flex justify-between overflow-hidden relative"
                style={{ backgroundColor: props.backgroundColor }}
            >
                <div className="flex flex-col justify-center items-center pl-5 z-50">
                    <div>
                        <p className="text-sm font-metropolis">
                            {formatMilliseconds(data.data.matchInfo.gameLengthMillis)}
                        </p>
                        <h1 className="text-lg">{teamScore.won ? "VICTORY" : "DEFEAT"}</h1>
                        <div className="font-metropolis">
                            <p className="leading-5">
                                {teamScore.numPoints} - {enemyScore.numPoints}
                            </p>
                            <p
                                className={classNames(
                                    "text-sm leading-4",
                                    props.rrEarned > 0
                                        ? "text-green-500"
                                        : props.rrEarned < 0
                                        ? "text-red-500"
                                        : "text-text-color"
                                )}
                            >
                                {props.rrEarned > 0 ? `+${props.rrEarned}` : props.rrEarned}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-base leading-5">KDA</h1>
                            <div className="font-metropolis">
                                <p className="leading-5 text-sm">
                                    {playerData.stats.kills}/{playerData.stats.deaths}/{playerData.stats.assists}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <div className="h-full w-full overflow-hidden">
                        <Image
                            alt="Agent icon"
                            fill
                            src={agent.fullPortrait}
                            className="object-none translate-x-20"
                            style={{ objectPosition: "center 10%" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

async function getValorantMatchData(matchId: string) {
    const res = await fetch(`https://api.jackli.dev/valorant/match-details/${matchId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch valorant match data");
    }

    return res.json();
}

async function getValorantAgents() {
    const res = await fetch("https://valorant-api.com/v1/agents");
    if (!res.ok) {
        throw new Error("Failed to fetch valorant agents");
    }

    return res.json();
}

function formatMilliseconds(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = "";
    if (hours > 0) {
        if (hours < 10) {
            result += hours.toString() + ":";
        } else {
            result += hours.toString().padStart(2, "0") + ":";
        }
    }
    if (hours > 0 || minutes > 0) {
        if (minutes < 10) {
            result += minutes.toString() + ":";
        } else {
            result += minutes.toString().padStart(2, "0") + ":";
        }
    }
    if (hours > 0 || minutes > 0) {
        result += seconds.toString().padStart(2, "0");
    } else {
        result += "0:" + seconds.toString().padStart(2, "0");
    }
    return result;
}
