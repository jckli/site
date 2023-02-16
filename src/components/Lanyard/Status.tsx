"use client";

import { useLanyardWS } from "use-lanyard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export const Status = (props: any) => {
    const data = useLanyardWS("326498384758308875");
    const status = data?.discord_status ?? "offline";
    return (
        <>
            <div
                className={classNames(
                    "h-full w-full flex items-center justify-center rounded-lg",
                    {
                        online: "bg-green-500 text-white",
                        idle: "bg-orange-400 text-white ",
                        dnd: "bg-red-500 text-white ",
                        offline: "bg-[#5865F2] text-white",
                    }[status]
                )}
            >
                <div className="scale-[0.9] sm:scale-[1.5] space-y-1 text-center">
                    <p className="scale-[1.6]">
                        <FontAwesomeIcon icon={faDiscord} />
                    </p>
                    <span>{status}</span>
                </div>
            </div>
        </>
    );
};
