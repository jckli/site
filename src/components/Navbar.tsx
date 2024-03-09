"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = (props: any) => {
    const pathname = usePathname();

    return (
        <>
            <div className="flex-grow py-2 px-2 border-[1px] border-borcol rounded-xl">
                <NavigationMenu>
                    <NavigationMenuList className="text-text-color font-metropolis-bold">
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink active={"/" === pathname} className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/projects" legacyBehavior passHref>
                                <NavigationMenuLink
                                    active={"/projects" === pathname}
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Projects
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
};
