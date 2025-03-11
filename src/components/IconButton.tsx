"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IconButtonProps {
	href: string;
	children: ReactNode;
}

export const IconButton = ({ href, children }: IconButtonProps) => {
	return (
		<motion.a
			href={href}
			target="_blank"
			className="
            text-text-color transition-all ease-in-out transition-200 hover:text-pink-accent
            "
			whileTap={{ scale: 0.9 }}
		>
			{children}
		</motion.a>
	);
};
