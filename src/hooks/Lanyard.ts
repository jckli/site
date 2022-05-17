import { useLanyard } from "use-lanyard";

const discord_id = "326498384758308875";

export function LanyardData() {
    const activity = useLanyard(discord_id);
    return activity;
}