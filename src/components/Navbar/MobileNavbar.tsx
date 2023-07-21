"use client";

import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export const MobileNavbar = (props: any) => {
	const path = usePathname();

	const [toggled, setToggled] = useState(false);
	const [height, setHeight] = useState("0px");

	const expand = () => {
		height === "0px" ? setHeight("15rem") : setHeight("0px");
		toggled ? setToggled(false) : setToggled(true);
	};

	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				navRef.current &&
				!navRef.current.contains(event.target as Node) &&
				toggled &&
				!document.querySelector(".navbar")?.contains(event.target as Node)
			) {
				expand();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [toggled]);

	return (
		<>
			<div className="navbar my-6" ref={navRef}>
				<div className="flex flex-col justify-center items-center text-text-color">
					<Hamburger toggled={toggled} toggle={expand} />
				</div>
				<div
					className="mt-2 w-full text-center flex flex-col justify-center items-center gap-2 text-text-color transition-all duration-200 overflow-hidden"
					style={{ maxHeight: height }}
				>
					{props.navigation.map((item: any) => (
						<Link
							href={item.href}
							key={item.name}
							onClick={expand}
							className={classNames(
								"px-2 py-1 rounded-md hover:bg-pink-accent hover:text-text-darkest transition-all ease-in-out duration-200",
								path == item.href && "text-text-lighter"
							)}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</>
	);
};
