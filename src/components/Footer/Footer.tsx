import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getCurrentYear } from "../../util/year";

export const Footer = () => {
    const currentYear = getCurrentYear();
    return (
        <div className="flex justify-center">
            <div className="font-firamono py-[30px] items-center flex flex-row justify-between xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[530px]">
                <div id="first" className="text-norm-gray text-sm hidden sm:block">
                    Made with <FontAwesomeIcon icon={faHeart} /> by ohashi.
                </div>
                <div id="second" className="text-norm-gray text-sm">
                    © 2018 - {currentYear} Jack Li
                </div>
            </div>
        </div>
    );
};