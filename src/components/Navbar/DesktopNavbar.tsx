import Link from "next/link";

export const DesktopNavbar = (props: any) => {
	return (
		<>
			<div className="w-full flex justify-center items-center gap-6 text-text-color min-h-[90px]">
				{props.navigation.map((item: any) => (
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
