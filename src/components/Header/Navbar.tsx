import { useState, useEffect } from "react";
import { NavbarButton } from "./NavbarButton"
import { Squash as Hamburger } from "hamburger-react";

export const Header = () => {
    const [height, setHeight] = useState('0px');
    const [isOpen, setOpen] = useState(false);

    const handleClickMenu = () => {(height == '0px') ? setHeight('24px') : setHeight('0px'); setOpen(!isOpen)};
    return (
        <div className="relative w-[100%] flex items-center justify-center text-sorta-white z-10">
            <div className="pt-[20px] sm:py-[22px]">
                <div className="block sm:hidden">
                    <div className="flex justify-center">
                        <Hamburger rounded toggled={isOpen} onToggle={handleClickMenu} />
                    </div>
                    <div className={`transition-all ease-in-out overflow-hidden transform-gpu motion-reduce:transition-none duration-200 bg-main-gray`} style={{height: height}}>
                        <HeaderContent onClick={handleClickMenu} />
                    </div>
                </div>
                <div className="hidden sm:block">
                    <HeaderContent onClick={handleClickMenu} />
                </div>
            </div>
        </div>
    )
}

const HeaderContent = (props: any) => {
    return (
        <div className="flex">
            <NavbarButton link="/" label="/" onClick={props.onClick} />
            <NavbarButton link="/photos" label="/photos" onClick={props.onClick} />
        </div>
    )
}