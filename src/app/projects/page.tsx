"use client";

import { Project } from "@/components/Project";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
	default: 2,
	700: 1,
};

export default function ProjectsPage() {
	return (
		<>
			<div className="flex-grow font-metropolis">
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="flex w-auto smd:ml-[-1.5rem] gap-6"
					columnClassName="smd:pl-6 flex flex-col gap-6"
				>
					<Project
						name="MangaUpdates Bot"
						src="/projects/mangaupdates-bot.png"
						lang="Go, Rust"
						description="Track your favorite mangas, manhwas, or doujins and get every new chapter update sent to you!"
						button_link="https://tsuuchi.hayasaka.moe/"
						button_text="Invite"
						github_link="https://github.com/jckli/mangaupdates-bot"
					/>
					<Project
						name="GitCloser"
						src="/projects/gitcloser.png"
						lang="Go, TypeScript"
						description="Find how close you are to another GitHub user in less than 20 seconds using a Bi-directional BFS algorithm."
						button_link="https://gitcloser.hayasaka.moe/"
						button_text="Visit"
						github_link="https://github.com/jckli/gitcloser"
					/>
					<Project
						name="Retrievify"
						src="/projects/retrievify.png"
						lang="TypeScript, Go"
						description="Get insights into all your listening statistics and see how you've spent your time listening to music."
						button_link="https://retrievify.hayasaka.moe/"
						button_text="Visit"
						github_link="https://github.com/jckli/statsify"
					/>
					<Project
						name="Picsiv"
						src="/projects/picsiv.png"
						lang="Go"
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
						name="art-workers"
						src="https://avatars.githubusercontent.com/u/39673993"
						lang="TypeScript"
						description="Discover and view new art from Pixiv, Reddit, and other sources using my serverless Cloudflare Workers."
						github_link="https://github.com/jckli/art-workers"
					/>
					<Project
						name="valorant.go"
						src="/projects/valorant.png"
						lang="Go"
						description="Access the unofficial Valorant API with ease using this user-friendly, efficient, Golang API wrapper."
						github_link="https://github.com/jckli/valorant.go/"
					/>
					<Project
						name="cheinstein.py"
						src="/projects/cheinstein.png"
						lang="Python"
						description="Quickly extract and parse questions and answers from Chegg.com, all within a python library."
						button_link="https://pypi.org/project/cheinsteinpy/"
						button_text="PyPI"
						github_link="https://github.com/DouglasTaylorSupportGroup/cheinstein.py"
					/>
				</Masonry>
			</div>
		</>
	);
}
