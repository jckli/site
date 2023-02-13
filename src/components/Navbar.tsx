"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";

export const Navbar = (props: any) => {
    const isBreakpoint = useMediaQuery("894px");
    var active = props.active;
    const navigation = [
        { name: "/index", href: "/" },
        { name: "/projects", href: "/projects" },
        { name: "/faq", href: "/faq" },
    ];
    return (
        <>
            <div className="w-full flex justify-center items-center gap-6 text-text-color h-[10vh]">
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
        </>
    );
};
