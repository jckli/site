"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Project = (props: any) => {
    return (
        <>
            <div className="bg-box border-[1px] border-borcol rounded-xl font-metropolis">
                <div className="p-5 mmlg:max-w-[360px]">
                    <div className="flex items-center">
                        <Image
                            alt={`${props.name} Image`}
                            src={props.src}
                            width={60}
                            height={60}
                            className="rounded-lg"
                        />
                        <div className="ml-4">
                            <h1 className="font-metropolis-bold text-text-lighter">{props.name}</h1>
                            <p className="text-sm text-text-color leading-6">{props.lang}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="font-metropolis text-base text-text-darker leading-6">{props.description}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        {props.button_text && props.button_link && (
                            <motion.a
                                href={props.button_link}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-text-color bg-[#282930] hover:bg-[#383940] transition-all ease-in-out duration-200
                                "
                                whileTap={{ scale: 0.95 }}
                            >
                                <FontAwesomeIcon icon={faLink} />
                                <h1 className="ml-2">{props.button_text}</h1>
                            </motion.a>
                        )}
                        <motion.a
                            href={props.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-2xl text-text-color transition-all ease-in-out duration-200 hover:text-white/75 hover:cursor-pointer"
                            whileTap={{ scale: 0.95 }}
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </motion.a>
                    </div>
                </div>
            </div>
        </>
    );
};
