"use client";

import {
    SiAmazonaws,
    SiBootstrap,
    SiCloudflare,
    SiCss3,
    SiDebian,
    SiDiscord,
    SiDocker,
    SiFlask,
    SiGit,
    SiGithub,
    SiGo,
    SiHtml5,
    SiJavascript,
    SiLinux,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiOracle,
    SiPostgresql,
    SiPython,
    SiReact,
    SiRedis,
    SiRust,
    SiTailwindcss,
    SiTypescript,
    SiUbuntu,
    SiVisualstudiocode,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const Technologies = (props: any) => {
    return (
        <>
            <div className="h-full w-full flex flex-col items-center justify-center rounded-xl min-h-[13rem] text-text-color bg-box border-[1px] border-borcol">
                <div className="p-5 h-full grid w-full grid-cols-7 grid-rows-4 xxsm:grid-cols-8 xsm:grid-cols-9 sm:grid-cols-6 sm:grid-rows-5 md:grid-cols-7 md:grid-rows-4 gap-4">
                    <SiPython size="28" />
                    <SiTypescript size="28" />
                    <SiGo size="28" />
                    <SiRust size="28" />
                    <SiJavascript size="28" />
                    <FaJava size="28" />
                    <SiHtml5 size="28" />
                    <SiCss3 size="28" />
                    <SiLinux size="28" />
                    <SiDebian size="28" />
                    <SiUbuntu size="28" />
                    <SiTailwindcss size="28" />
                    <SiNextdotjs size="28" />
                    <SiReact size="28" />
                    <SiFlask size="28" />
                    <SiBootstrap size="28" />
                    <SiAmazonaws size="28" />
                    <SiOracle size="28" />
                    <SiRedis size="28" />
                    <SiMongodb size="28" />
                    <SiPostgresql size="28" />
                    <SiDocker size="28" />
                    <SiNodedotjs size="28" />
                    <SiGit size="28" />
                    <SiGithub size="28" />
                    <SiCloudflare size="28" />
                    <SiVisualstudiocode size="28" />
                    <SiDiscord size="28" />
                </div>
            </div>
        </>
    );
};
