import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SocialButton } from "../components/SocialButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faSpotify, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Home: NextPage = () => {
    return (
        <>
            <div id="intro" className="min-h-[650px] py-[60px] items-center justify-center relative flex">
                <div id="title" className="px-[40px] w-[750px] h-[50%]">
                    <div className="flex mb-4 items-center justify-between">
                        <span>
                            <h1 className="text-white text-[2em] font-firamono mb-2">Jack Li</h1>
                            <p id="main-bio" className="font-firamono text-[#5e5e5e] text-[1.4em] hidden sm:block">Full-Stack Developer</p>
                            <p id="alt-bio" className="font-firamono text-[#5e5e5e] text-[1.4em] block sm:hidden">Developer</p>
                        </span>
                        <div className="w-[120.967px] h-[80px] relative hidden md:block">
                            <Image alt="Signature" src="/signature.png" layout="fill"></Image>
                        </div>
                    </div>
                    <p className="mb-0">High school junior. Software/Web development on the side.</p>
                    <br />
                    <div>
                        <SocialButton link="mailto:jack@jackli.dev" name="jack@jackli.dev" icon={faEnvelope} />
                        <SocialButton link="https://github.com/jckli" name="jckli" icon={faGithub} />
                        <SocialButton link="https://open.spotify.com/user/mcinvasion" name="Jack Li" icon={faSpotify} />
                        <SocialButton link="https://twitter.com/notjackli" name="notjackli" icon={faTwitter} />
                        <SocialButton link="https://www.youtube.com/channel/UCL1LOsBY8pIx-7QyXEcTBpw" name="Jack Li" icon={faYoutube} />
                    </div>
                    <br />
                    <p>
                        <a href="mailto:jack@jackli.dev">Ask me </a>
                        for my resume.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Home;
