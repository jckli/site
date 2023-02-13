import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="absolute bottom-0 flex justify-center w-full text-text-color">
            <div className="py-[30px] items-center flex flex-row justify-between xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[530px]">
                <div id="first" className="text-norm-gray text-sm hidden sm:block">
                    Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
                    <a
                        href="https://github.com/jckli"
                        className="underline underline-offset-3 decoration-2 transition-all ease-in-out duration-200 hover:text-pink-accent"
                    >
                        jckli
                    </a>
                    .
                </div>
                <div id="second" className="text-norm-gray text-sm">
                    © 2018 - {currentYear} jckli
                </div>
            </div>
        </div>
    );
};
