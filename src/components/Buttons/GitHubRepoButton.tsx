import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const GitHubRepoButton = (props: any) => {
    return (
        <motion.a
            href={props.link}
            target="_blank"
            className="text-2xl text-sorta-white hover:text-sorta-white"
            whileTap={{ scale: 0.95 }}
        >
            <FontAwesomeIcon icon={props.icon} />
        </motion.a>
    );
};