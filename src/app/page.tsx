import { CurrentTime } from "@/components/CurrentTime";
import { Status } from "@/components/lanyard/Status";
import { TopSongs } from "@/components/TopSongs";
import { RecentMal } from "@/components/RecentMal";
import { RecentValorant } from "@/components/ValorantStats";

export default function Home() {
	return (
		<>
			<div className="flex-grow flex flex-col md:grid md:grid-cols-6 gap-6 font-metropolis">
				<div className="col-span-3 sm:col-span-2 min-h-full">
					<CurrentTime />
				</div>
				<div className="col-span-3 sm:col-span-4 h-full">
					<div className="h-full rounded-xl p-4 border-[1px] border-borcol bg-box/70 min-h-[13rem]">
						<h1 className="text-xl text-text-lighter font-metropolis-bold">
							Who am I?
						</h1>
						<p className="text-text-color mt-2">
							I recently graduated summa cum laude at Arizona State
							University. I like creating cool things in my free time using
							modern, efficient, and scalable technologies.
						</p>
						<p className="text-text-color mt-2">
							When I&apos;m not coding, you can catch me grabbing boba with
							friends, tinkering with my home server, or creating new random
							playlists.
						</p>
					</div>
				</div>
				<div className="col-span-5 h-full">
					<TopSongs />
				</div>
				<div className="col-span-1 min-h-full">
					<Status />
				</div>
				<div className="col-span-6 md:col-span-3 h-full">
					<RecentMal />
				</div>
				<div className="col-span-6 md:col-span-3 h-full">
					<RecentValorant />
				</div>
			</div>
		</>
	);
}
