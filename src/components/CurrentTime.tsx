"use client";

import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

function TimeCard({ date, label, timeZone }: { date: Date; label: string; timeZone: string }) {
    const time = new Intl.DateTimeFormat(undefined, {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
    }).format(date);
    const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(date));
    const nighttime = hour >= 18 || hour <= 7;

    return (
        <div
            className={`flex min-h-0 flex-col items-center justify-center rounded-xl text-white ${
                nighttime ? "bg-sky-900/60" : "bg-sky-300/60"
            }`}
        >
            <h1 className="text-2xl">{time}</h1>
            <p className="font-metropolis">in {label}</p>
        </div>
    );
}

export const CurrentTime = () => {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        const update = () => setDate(new Date());
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Transition
            show={Boolean(date)}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
        >
            <div className="grid h-full min-h-[13rem] w-full grid-rows-2 gap-3">
                {date && (
                    <>
                        <TimeCard date={date} label="arizona, us" timeZone="America/Phoenix" />
                        <TimeCard date={date} label="california, us" timeZone="America/Los_Angeles" />
                    </>
                )}
            </div>
        </Transition>
    );
};
