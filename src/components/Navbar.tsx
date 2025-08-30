"use client";

import {
	NavigationMenu,
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
			<div className="flex-grow py-2 px-2 border-[1px] border-borcol bg-box/70 rounded-xl">
				<NavigationMenu>
					<NavigationMenuList className="text-text-color font-metropolis-bold">
						<NavigationMenuItem>
							<Link href="/" passHref>
								<NavigationMenuLink
									active={"/" === pathname}
									className={navigationMenuTriggerStyle()}
								>
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/projects" passHref>
								<NavigationMenuLink
									active={"/projects" === pathname}
									className={navigationMenuTriggerStyle()}
								>
									Projects
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/photos" passHref>
								<NavigationMenuLink
									active={"/photos" === pathname}
									className={navigationMenuTriggerStyle()}
								>
									Photos
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</>
	);
};
