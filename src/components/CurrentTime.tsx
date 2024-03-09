"use client";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export const CurrentTime = (props: any) => {
    const [timeInAz, setTimeInAz] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const AZTimeFormatter = new Intl.DateTimeFormat(undefined, {
                timeZone: "America/Phoenix",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            });
            const currentTime = AZTimeFormatter.format(new Date());
            setTimeInAz(currentTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const nighttime = parseInt(timeInAz.split(":")[0]) >= 18 || parseInt(timeInAz.split(":")[0]) <= 7;
    return (
        <>
            <Transition
                show={timeInAz != ""}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
            >
                <div
                    className={classNames(
                        "h-full w-full flex flex-col items-center justify-center rounded-xl min-h-[13rem] text-white",
                        nighttime ? "bg-sky-900" : "bg-sky-300"
                    )}
                >
                    <h1 className="text-2xl">{timeInAz}</h1>
                    <p className="font-metropolis">in arizona, us</p>
                </div>
            </Transition>
        </>
    );
};
