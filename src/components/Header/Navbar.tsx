import { useState } from "react";
import { NavbarButton } from "./NavbarButton"
import { Squash as Hamburger } from "hamburger-react";

export const Header = () => {
    const [height, setHeight] = useState('0px');

    const handleClickMenu = () => ((height == '0px') ? setHeight('24px') : setHeight('0px'));
    return (
        <div className="relative w-[100%] flex items-center justify-center text-sorta-white z-10">
            <div className="pt-[20px] sm:py-[22px]">
                <div className="block sm:hidden">
                    <div className="flex justify-center">
                        <Hamburger rounded onToggle={handleClickMenu} />
                    </div>
                    <div className={`transition-all ease-in-out overflow-hidden transform-gpu motion-reduce:transition-none duration-200 bg-main-gray`} style={{height: height}}>
                        <HeaderContent />
                    </div>
                </div>
                <div className="hidden sm:block">
                    <HeaderContent />
                </div>
            </div>
        </div>
    )
}

const HeaderContent = () => {
    return (
        <div className="flex">
            <NavbarButton link="/" label="/" />
            <NavbarButton link="/photos" label="/photos" />
        </div>
    )
}