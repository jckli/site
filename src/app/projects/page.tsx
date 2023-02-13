"use client";

import { Project } from "@/components/Project";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Projects = () => {
    const isBreakpoint = useMediaQuery("810px");
    return (
        <>
            <div className="text-text-color flex flex-col justify-center items-center">
                {isBreakpoint ? (
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5">
                            <Project
                                name="MangaUpdates Bot"
                                src="/projects/mangaupdates-bot.png"
                                lang="Python"
                                description="Track your favorite mangas, manhwas, or doujins and get every new chapter update sent to you!"
                            />
                            <Project
                                name="Picsiv"
                                src="/projects/picsiv.png"
                                lang="Python"
                                description="Enhance your Discord experience with the ability to view full images from Pixiv and other art-related features!"
                            />
                            <Project
                                name="valorant.go"
                                src="/projects/valorant.png"
                                lang="Go"
                                description="Access the unofficial Valorant API with ease using this user-friendly, efficient, Golang API wrapper."
                            />
                            <Project
                                name="cheinstein.py"
                                src="/projects/cheinstein.png"
                                lang="Python"
                                description="Quickly extract and parse questions and answers from Chegg.com, all within a python library."
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <Project
                                name="Retrievify"
                                src="/projects/retrievify.png"
                                lang="TypeScript, Python"
                                description="Get insights into all your listening statistics and see how you've spent your time listening to music."
                            />
                            <Project
                                name="SugoiArt"
                                src="https://avatars.githubusercontent.com/u/104050203"
                                lang="Go"
                                description="A simple, fast, and open source anime art API completely hosted using GitHub repositories."
                            />
                            <Project
                                name="Hyme"
                                src="/projects/hyme.png"
                                lang="Go"
                                description="Enjoy music effortlessly from YouTube, Spotify, Soundcloud, and Bandcamp using Hyme."
                            />
                            <Project
                                name="Aidoku Sources"
                                src="https://avatars.githubusercontent.com/u/97767528"
                                lang="Rust"
                                description="I develop some sources for this manga reader app, Aidoku. It's Tachiyomi but for iOS. Check it out!"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <Project
                            name="MangaUpdates Bot"
                            src="/projects/mangaupdates-bot.png"
                            lang="Python"
                            description="Track your favorite mangas, manhwas, or doujins and get every new chapter update sent to you!"
                        />
                        <Project
                            name="Retrievify"
                            src="/projects/retrievify.png"
                            lang="TypeScript, Python"
                            description="Get insights into all your listening statistics and see how you've spent your time listening to music."
                        />
                        <Project
                            name="Picsiv"
                            src="/projects/picsiv.png"
                            lang="Python"
                            description="Enhance your Discord experience with the ability to view full images from Pixiv and other art-related features!"
                        />
                        <Project
                            name="SugoiArt"
                            src="https://avatars.githubusercontent.com/u/104050203"
                            lang="Go"
                            description="A simple, fast, and open source anime art API completely hosted using GitHub repositories."
                        />
                        <Project
                            name="valorant.go"
                            src="/projects/valorant.png"
                            lang="Go"
                            description="Access the unofficial Valorant API with ease using this user-friendly, efficient, Golang API wrapper."
                        />
                        <Project
                            name="Hyme"
                            src="/projects/hyme.png"
                            lang="Go"
                            description="Enjoy music effortlessly from YouTube, Spotify, Soundcloud, and Bandcamp using Hyme."
                        />
                        <Project
                            name="cheinstein.py"
                            src="/projects/cheinstein.png"
                            lang="Python"
                            description="Quickly extract and parse questions and answers from Chegg.com, all within a python library."
                        />
                        <Project
                            name="Aidoku Sources"
                            src="https://avatars.githubusercontent.com/u/97767528"
                            lang="Rust"
                            description="I develop some sources for this manga reader app, Aidoku. It's Tachiyomi but for iOS. Check it out!"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Projects;
