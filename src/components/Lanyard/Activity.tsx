"use client";

import { useLanyardWS } from "use-lanyard";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { Transition } from "@headlessui/react";

export const Activity = (props: any) => {
    const data = useLanyardWS("326498384758308875");
    return (
        <>
            <Transition
                show={data != undefined}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
            >
                <div className="bg-[#1a202c] rounded-lg">
                    {data && data.activities.length > 0 && (
                        <div className="px-5 py-4">
                            <div className="flex flex-col text-text-color gap-3">
                                {data.listening_to_spotify && data.activities[0].type === 2 && (
                                    <>
                                        <h1 className="font-bold">
                                            Listening to {data.activities[0].name} <LiveDot />
                                        </h1>
                                        <div className="flex flex-row">
                                            <Image
                                                alt={`${data.activities[0].name} Image`}
                                                src={
                                                    data.spotify!.album_art_url
                                                        ? data.spotify!.album_art_url
                                                        : "https://avatars.githubusercontent.com/u/39673993"
                                                }
                                                width={80}
                                                height={80}
                                                className="rounded-lg"
                                            />
                                            <div className="flex flex-col ml-4 min-w-[180px]">
                                                <p className="font-metropolis-bold text-lg leading-6 max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                    {data.spotify!.song}
                                                </p>
                                                <p className="font-metropolis text-base text-text-darker leading-6 max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                    by {data.spotify!.artist}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data.activities[0].type === 0 && (
                                    <>
                                        <h1 className="font-bold">Playing Something</h1>
                                        <div className="flex flex-row">
                                            <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
                                                <Image
                                                    alt={`${data.activities[0].name} Image`}
                                                    src={
                                                        data.activities[0].assets
                                                            ? `https://cdn.discordapp.com/app-assets/${data.activities[0].application_id}/${data.activities[0].assets.large_image}.png`
                                                            : "https://avatars.githubusercontent.com/u/39673993"
                                                    }
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg"
                                                />
                                                {data.activities[0].assets && data.activities[0].assets.small_image && (
                                                    <div className="absolute bottom-[-5px] right-[-5px] ">
                                                        <Image
                                                            alt={`${data.activities[0].name} Small Image`}
                                                            src={`https://cdn.discordapp.com/app-assets/${data.activities[0].application_id}/${data.activities[0].assets.small_image}.png`}
                                                            width={30}
                                                            height={30}
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center md:justify-start ml-4 min-w-[180px]">
                                                <p className="font-metropolis-bold text-lg leading-6 max-w-[180px] sm:max-w-[290px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                    {data.activities[0].name}
                                                </p>
                                                {data.activities[0].details && (
                                                    <p className="font-metropolis text-base text-text-darker leading-6 max-w-[180px] sm:max-w-[290px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                        {data.activities[0].details}
                                                    </p>
                                                )}
                                                {data.activities[0].state && (
                                                    <p className="font-metropolis text-base text-text-darker leading-6 max-w-[180px] sm:max-w-[290px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                        {data.activities[0].state}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Transition>
        </>
    );
};

const fadeInOut = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const LiveDot = styled.div`
    display: inline-block;
    margin-left: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff5252;
    animation: ${fadeInOut} 2s ease-in-out infinite;
`;
