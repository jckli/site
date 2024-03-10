import { CurrentTime } from "@/components/CurrentTime";
import { Status } from "@/components/lanyard/Status";
import { Technologies } from "@/components/Technologies";
import { TopSongs } from "@/components/TopSongs";

export default function Home() {
    return (
        <>
            <div className="flex-grow flex flex-col md:grid md:grid-cols-6 gap-6 font-metropolis">
                <div className="col-span-3 sm:col-span-2 h-full">
                    <CurrentTime />
                </div>
                <div className="col-span-3 sm:col-span-4 h-full">
                    <div className="h-full rounded-xl p-6 border-[1px] border-borcol bg-box min-h-[13rem]">
                        <h1 className="text-xl text-text-lighter font-metropolis-bold">Domains</h1>
                        <p className="text-text-color mt-2">My only two domains, excluding their subdomains, are:</p>
                        <ul className="list-disc list-inside text-text-color mt-2">
                            <li>jackli.dev (for all personal things, like home services)</li>
                            <li>hayasaka.moe (for all projects that I code)</li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-4 h-full">
                    <div className="h-full rounded-xl p-6 border-[1px] border-borcol bg-box min-h-[13rem]">
                        <h1 className="text-xl text-text-lighter font-metropolis-bold">Who am I?</h1>
                        <p className="text-text-color mt-2">
                            I&apos;m a casual full stack developer that creates cool things in my free time using
                            modern, efficient, and scalable technologies.
                        </p>
                    </div>
                </div>
                <div className="col-span-2 h-full">
                    <Status />
                </div>
                <div className="col-span-3 xl:col-span-2 h-full">
                    <Technologies />
                </div>
                <div className="col-span-3 xl:col-span-4 h-full">
                    <TopSongs />
                </div>
            </div>
        </>
    );
}
