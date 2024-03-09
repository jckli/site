"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconButton = (props: any) => {
    return (
        <motion.a
            href={props.href}
            target="_blank"
            className="
            text-text-color transition-all ease-in-out transition-200 hover:text-pink-accent
            "
            whileTap={{ scale: 0.9 }}
        >
            <FontAwesomeIcon icon={props.icon} size="2xl" />
        </motion.a>
    );
};
