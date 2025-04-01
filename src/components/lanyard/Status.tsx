"use client";

import { useLanyardWS } from "use-lanyard";
import { FaDiscord } from "react-icons/fa";
import { Transition } from "@headlessui/react";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export const Status = (props: any) => {
	const data = useLanyardWS("326498384758308875");
	const status = data?.discord_status ?? "offline";
	return (
		<>
			<Transition
				show={data != undefined}
				enter="ease-out duration-100 min-h-full"
				enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
				enterTo="opacity-100 translate-y-0 sm:scale-100 min-h-full"
				leave="ease-in duration-200 min-h-full"
				leaveFrom="opacity-100 translate-y-0 sm:scale-100 min-h-full"
				leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-[0.98]"
			>
				<div
					className={classNames(
						"min-h-[13vh] h-full md:min-h-[248px] w-full flex items-center justify-center rounded-lg",
						{
							online: "bg-green-500 text-white",
							idle: "bg-orange-400 text-white ",
							dnd: "bg-red-500 text-white ",
							offline: "bg-[#5865F2] text-white",
						}[status]
					)}
				>
					<div className="scale-[1.5] space-y-1 text-center flex items-center flex-col">
						<p className="scale-[1.6]">
							<FaDiscord />
						</p>
						<span>{status}</span>
					</div>
				</div>
			</Transition>
		</>
	);
};
