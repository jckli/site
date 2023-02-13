"use client";

import Image from "next/image";

export const Project = (props: any) => {
    return (
        <>
            <div className="px-6 mmlg:px-0">
                <div className="bg-[#1a202c] rounded-lg">
                    <div className="p-5 mmlg:max-w-[360px]">
                        <div className="flex items-center">
                            <Image
                                alt={`${props.name} Image`}
                                src={props.src}
                                width={60}
                                height={60}
                                className="rounded-lg"
                            />
                            <div className="ml-4">
                                <h1 className="font-bold">{props.name}</h1>
                                <p className="text-sm text-text-darker leading-6">{props.lang}</p>
                            </div>
                        </div>
                        <div>
                            <p className="mt-4 font-metropolis text-base text-text-darker leading-6">
                                {props.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
