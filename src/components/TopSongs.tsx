"use client";

import Image from "next/image";
import useSWRImmutable from "swr";
import { Transition } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const TopSongs = (props: any) => {
    const { data, error } = useSWRImmutable("/api/topsongs?time_range=short_term&limit=10", fetcher);

    if (error) {
        return (
            <div className="h-full rounded-lg min-h-[13rem] bg-box border-[1px] border-borcol w-full">
                <div className="p-5 w-full">
                    <h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
                        Top Spotify Songs
                    </h1>
                    <div className="mt-2 flex gap-4 w-full overflow-x-auto">
                        <p className="text-text-color font-metropolis">Failed to load top songs. Please retry later.</p>
                    </div>
                </div>
            </div>
        );
    }
    if (!data) return <div></div>;

    return (
        <>
            <Transition
                show={data != undefined}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
            >
                <div className="h-full rounded-lg min-h-[13rem] bg-box border-[1px] border-borcol w-full">
                    <div className="p-5 w-full">
                        <h1 className="relative font-metropolis-bold text-text-lighter text-xl w-auto">
                            Top Spotify Songs
                        </h1>
                        <div className="mt-2 flex gap-4 w-full overflow-x-auto">
                            {data.data.items.map((song: any) => (
                                <a key={song.id} href={song.external_urls.spotify} className="w-fit">
                                    <div className="group w-[170px] relative h-full">
                                        <div
                                            style={{ width: 170, height: 170 }}
                                            className="z-10 cursor-pointer flex flex-col transition-color duration-200 rounded-lg bg-transparent group-hover:bg-black group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent group-hover:bg-transparent absolute"
                                        >
                                            <div className="absolute bottom-3 px-2 transition-all duration-200 text-transparent group-hover:text-white">
                                                <h4 className="font-metropolis-bold text-lg leading-5 line-clamp-2">
                                                    {song.name}
                                                </h4>
                                                <p className="text-md font-metropolis leading-5 w-36 text-ellipsis whitespace-nowrap overflow-hidden">
                                                    {song.artists.map((artist: any) => artist.name).join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-[170px] w-[170px]">
                                            <Image
                                                fill
                                                alt={song.name}
                                                src={song.album.images[0].url}
                                                placeholder="blur"
                                                style={{ objectFit: "cover" }}
                                                blurDataURL={song.album.images[2].url}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

function getSpotifyTopSongs() {
    const res = fetch(`https://api.jackli.dev/spotify/top-items/tracks?time_range=short_term&limit=10`);
    return res;
}
