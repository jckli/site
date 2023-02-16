"use client";

import { useState, useEffect } from "react";

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
    const pastSix = parseInt(timeInAz.split(":")[0]) >= 18;
    return (
        <>
            <div
                className={classNames(
                    "h-full w-full flex flex-col items-center justify-center rounded-lg min-h-[13rem] text-white",
                    pastSix ? "bg-sky-900" : "bg-sky-300"
                )}
            >
                <h1 className="text-2xl">{timeInAz}</h1>
                <p className="font-metropolis">in arizona, us</p>
            </div>
        </>
    );
};
