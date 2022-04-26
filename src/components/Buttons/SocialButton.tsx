import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SocialButton = (props: any) => {
    return (
        <motion.a
            href={props.link}
            target="_blank"
            className="
            leading-[1.3] py-[9px] px-[12px] mr-[8px] mb-[8px] inline-block text-[#007bff] border-[#313338] border-solid border-[1px] 
            bg-[#1a1c21] rounded-[10px] hover:bg-hover-gray hover:border-[#4b4b4b] hover:transition-all hover:duration-200 hover:ease-out hover:text-[#007bff]
            "
            whileTap={{ scale: 0.95 }}
        >
            <FontAwesomeIcon icon={props.icon} />
            <span className="ml-[8px] hidden suprsm:inline-block">{props.name}</span>
        </motion.a>
    );
};
