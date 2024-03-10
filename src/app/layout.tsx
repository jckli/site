import "../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Image from "next/image";
import { IconButton } from "@/components/IconButton";
import { Navbar } from "@/components/Navbar";
import { Activity } from "@/components/lanyard/Activity";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
config.autoAddCss = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <div className="py-20 px-8 lg:flex">
                    <div>
                        <div className="bg-box border-[1px] border-borcol rounded-2xl">
                            <div className="p-8 font-metropolis max-w-[22rem]">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/39673993"
                                    alt="jckli"
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                />
                                <div className="mt-4 flex items-center">
                                    <h1 className="text-2xl font-metropolis-bold text-text-lighter">Jack Li</h1>
                                    <a
                                        href="https://github.com/jckli"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-sf-mono text-text-darkest text-xl ml-2 transition-all ease-in-out duration-200 hover:text-pink-accent"
                                    >
                                        (@jckli)
                                    </a>
                                </div>
                                <p className="text-base text-text-color">CS @ ASU. I create cool things using code.</p>
                                <div className="mt-4 flex gap-4">
                                    <IconButton icon={faEnvelope} href="mailto:me@jackli.dev" />
                                    <IconButton icon={faGithub} href="https://github.com/jckli" />
                                    <IconButton icon={faLinkedin} href="https://www.linkedin.com/in/jackhli/" />
                                    <IconButton icon={faTwitter} href="https://twitter.com/notjackli" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Activity />
                        </div>
                    </div>
                    <div className="ml-8 flex-grow">
                        <Navbar />
                        <div className="mt-4 flex-grow">{children}</div>
                    </div>
                </div>
            </body>
        </html>
    );
}
