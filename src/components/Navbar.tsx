"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";

export const Navbar = (props: any) => {
    const isBreakpoint = useMediaQuery("894px");
    const navigation = [
        { name: "/index", href: "/" },
        { name: "/projects", href: "/projects" },
        { name: "/faq", href: "/faq" },
        { name: "/photos", href: "/photos" },
    ];

    const [toggled, setToggled] = useState(false);
    const [height, setHeight] = useState("0px");

    const expand = () => {
        height === "0px" ? setHeight("15rem") : setHeight("0px");
        toggled ? setToggled(false) : setToggled(true);
    };
    return (
        <>
            {isBreakpoint ? (
                <div className="w-full flex justify-center items-center gap-6 text-text-color min-h-[90px]">
                    {navigation.map(item => (
                        <Link
                            href={item.href}
                            key={item.name}
                            className="underline underline-offset-2 decoration-2 transition-all ease-in-out duration-200 hover:text-pink-accent"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="my-6">
                    <div className="flex flex-col justify-center items-center text-text-color">
                        <Hamburger toggled={toggled} toggle={expand} />
                    </div>
                    <div
                        className="mt-2 w-full text-center flex flex-col justify-center items-center gap-2 text-text-color transition-all duration-200 overflow-hidden"
                        style={{ maxHeight: height }}
                    >
                        {navigation.map(item => (
                            <Link
                                href={item.href}
                                key={item.name}
                                className="px-3 py-2 rounded-md hover:bg-pink-accent hover:text-text-darker transition-all ease-in-out duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
