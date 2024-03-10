"use client";

import { useLanyardWS } from "use-lanyard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Transition } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export const Status = (props: any) => {
    const data = useLanyardWS("326498384758308875");
    const status = data?.discord_status ?? "offline";
    return (
        <>
            <Transition
                show={data != undefined}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98] h-full"
                enterTo="opacity-100 translate-y-0 sm:scale-100 h-full"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100 h-full"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98] h-full"
            >
                <div
                    className={classNames(
                        "min-h-[13rem] w-full flex items-center justify-center rounded-lg",
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
            </Transition>
        </>
    );
};
