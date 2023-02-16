"use client";

import { Project } from "@/components/Project";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 2,
    700: 1,
};

const Projects = () => {
    return (
        <>
            <div className="text-text-color flex flex-col justify-center items-center">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto smd:ml-[-1.5rem] gap-6 px-6"
                    columnClassName="smd:pl-6 flex flex-col gap-6"
                >
                    <Project
                        name="MangaUpdates Bot"
                        src="/projects/mangaupdates-bot.png"
                        lang="Python"
                        description="Track your favorite mangas, manhwas, or doujins and get every new chapter update sent to you!"
                        button_link="https://tsuuchi.hayasaka.moe/"
                        button_text="Invite"
                        github_link="https://github.com/jckli/mangaupdates-bot"
                    />
                    <Project
                        name="Retrievify"
                        src="/projects/retrievify.png"
                        lang="TypeScript, Python"
                        description="Get insights into all your listening statistics and see how you've spent your time listening to music."
                        button_link="https://retrievify.hayasaka.moe/"
                        button_text="Visit"
                        github_link="https://github.com/jckli/statsify"
                    />
                    <Project
                        name="Picsiv"
                        src="/projects/picsiv.png"
                        lang="Python"
                        description="Enhance your Discord experience with the ability to view full images from Pixiv and other art-related features!"
                        button_link="https://picsiv.hayasaka.moe/"
                        button_text="Invite"
                        github_link="https://github.com/jckli/picsiv/"
                    />
                    <Project
                        name="SugoiArt"
                        src="https://avatars.githubusercontent.com/u/104050203"
                        lang="Go"
                        description="A simple, fast, and open source anime art API completely hosted using GitHub repositories."
                        button_link="https://art.hayasaka.moe/"
                        button_text="Visit"
                        github_link="https://github.com/sugoiart/art"
                    />
                    <Project
                        name="valorant.go"
                        src="/projects/valorant.png"
                        lang="Go"
                        description="Access the unofficial Valorant API with ease using this user-friendly, efficient, Golang API wrapper."
                        github_link="https://github.com/jckli/valorant.go/"
                    />
                    <Project
                        name="Hyme"
                        src="/projects/hyme.png"
                        lang="Go"
                        description="Enjoy music effortlessly from YouTube, Spotify, Soundcloud, and Bandcamp using Hyme."
                        button_link="https://jackli.dev/hyme"
                        button_text="Invite"
                        github_link="https://github.com/jckli/hyme"
                    />
                    <Project
                        name="cheinstein.py"
                        src="/projects/cheinstein.png"
                        lang="Python"
                        description="Quickly extract and parse questions and answers from Chegg.com, all within a python library."
                        button_link="https://pypi.org/project/cheinstein.py/"
                        button_text="PyPI"
                        github_link="https://github.com/DouglasTaylorSupportGroup/cheinstein.py"
                    />
                    <Project
                        name="Aidoku Sources"
                        src="https://avatars.githubusercontent.com/u/97767528"
                        lang="Rust"
                        description="I develop some sources for the manga reader app, Aidoku. It's Tachiyomi but for iOS. (I don't own this)"
                        button_link="https://aidoku.app/"
                        button_text="Visit"
                        github_link="https://github.com/Skittyblock/aidoku-community-sources"
                    />
                </Masonry>
            </div>
        </>
    );
};

export default Projects;
