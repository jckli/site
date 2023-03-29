"use client";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export const ValorantSwitch = ({ children }: any) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <button onClick={handleShow} className="h-full w-full absolute rounded-md">
                <div className="h-full w-full rounded-md">
                    <Transition
                        show={show}
                        enter="transition-opacity duration-75 h-full w-full"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        entered="opacity-100 h-full w-full"
                        leave="transition-opacity duration-200 h-full w-full"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {children}
                    </Transition>
                </div>
            </button>
        </>
    );
};
