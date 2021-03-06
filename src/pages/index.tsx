import type { NextPage } from "next";
import Image from "next/image";
import { SocialButton } from "../components/Buttons/SocialButton";
import { Lanyard } from "../components/Lanyard";
import { LanyardData } from "../hooks/LanyardData";
import { Project } from "../components/Project";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faSpotify, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Home: NextPage = () => {
    const lanyardData = LanyardData();
    return (
        <>
            {lanyardData?.activities[0] ? (
                <div className="hidden lg:block">
                    <Lanyard />
                </div>
            ) : null}
            <div id="intro" className="min-h-[650px] pb-[68px] relative flex items-center justify-center flex-col">
                <div id="title" className="px-[40px] max-w-[750px] h-[50%]">
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
                {lanyardData?.activities[0] ? (
                    <div>
                        <div className="relative top-[70px] lg:static lg:top-0 lg:hidden">
                            <div className="flex justify-center items-center">
                                <div className="px-[20px]">
                                    <Lanyard />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="bg-black flex justify-center items-center">
                <div id="projects" className="max-w-[1000px] py-[40px] px-[50px] text-white">
                    <h2 className="text-[1.5em] font-firamono">Projects</h2>
                    <br />
                    <div className="mx-[-20px]">
                        <div className="block amstlg:grid grid-cols-2 gap-[30px]">
                            <Project
                                name="MangaUpdates Bot"
                                img_src="/projects/mangaupdatesbot.png"
                                type="Discord Bot"
                                time_period="Sep 2021 - Current"
                                description="I developed a Discord bot in Python using discord.py to be able to send manga chapter updates for mangas, manhwas, and doujins conveniently through the Discord platform."
                                button_text="Invite the Bot"
                                button_link="https://discord.com/oauth2/authorize?client_id=880694914365685781&scope=bot&permissions=268856384"
                                repo_link="https://github.com/jckli/mangaupdates-bot"
                            />
                            <Project 
                                name="cheinstein.py"
                                img_src="/projects/einsteinbot.png"
                                type="Python Library"
                                time_period="Dec 2021 - Apr 2022"
                                description="This nifty Python library allows for easy accessibility of the questions and answers given by Chegg.com. It was mainly created to parse Chegg for the Discord bot, EinsteinBot."
                                button_text="View on PyPI"
                                button_link="https://pypi.org/project/cheinsteinpy/"
                                repo_link="https://github.com/DouglasTaylorSupportGroup/cheinstein.py"
                            />
                        </div>
                        <div className="block amstlg:grid grid-cols-2 gap-[30px]">
                            <Project 
                                name="Website"
                                img_src="https://avatars.githubusercontent.com/u/39673993"
                                type="Web App"
                                time_period="Oct 2021"
                                description="You're looking at it! This website is just a place to display things about me along with showcasing my projects and skills. It was made in Next.js in TypeScript with TailwindCSS."
                                button_text="Website Link"
                                button_link="https://jackli.dev"
                                repo_link="https://github.com/jckli/site"
                            />
                            <Project
                                name="sugoiart"
                                img_src="https://avatars.githubusercontent.com/u/104050203"
                                type="API"
                                time_period="Jun 2022 - Current"
                                description="This is a simple, fast, and open source art API of to get many various artworks from a bunch of artists. It uses Go for the API and Next.js in TypeScript for the website."
                                button_text="Try the API"
                                button_link="https://art.hayasaka.moe/"
                                repo_link="https://github.com/sugoiart"
                            />
                        </div>
                        <div className="block amstlg:grid grid-cols-2 gap-[30px]">
                            <Project
                                name="Statsify"
                                img_src="/projects/statsify.png"
                                type="Web App"
                                time_period="Aug 2021 - Current"
                                description="This Flask web app allows easy viewing of one's spotify statistics with only a simple login. It can also utilize one's Spotify data package to calculate more detailed statistics."
                                button_text="Website Link"
                                button_link="https://statsify.hayasaka.moe/"
                                repo_link="https://github.com/jckli/Statsify"
                            />
                            <Project
                                name="Picsiv"
                                img_src="/projects/picsiv.png"
                                type="Discord Bot"
                                time_period="Feb 2022 - Current"
                                description="This stylish Discord bot allows the viewing of images from a variety of anime art sources. It uses my various Cloudflare workers to be able to seamlessly and swiftly fetch images."
                                button_text="Invite the Bot"
                                button_link="https://discord.com/oauth2/authorize?client_id=947361674703302738&scope=applications.commands%20bot&permissions=3072"
                                repo_link="https://github.com/jckli/picsiv"
                            />
                        </div>
                        <span className="block text-md text-center text-norm-gray">
                            View my other projects on my
                            <a href="https://github.com/jckli"> GitHub </a>
                            profile.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
