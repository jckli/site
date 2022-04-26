import Image from "next/image";
import { ProjectButton } from "./Buttons/ProjectButton";
import { GitHubRepoButton } from "./Buttons/GitHubRepoButton";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Project = (props: any) => {
    return (
        <div className="bg-main-gray rounded-[12px] items-center flex mb-[30px] min-h-auto">
            <div className="py-[30px] px-[40px]">
                <div className="flex justify-center items-center">
                    <div className="mr-4 min-w-[64px] h-[64px] relative rounded-[8px] overflow-hidden">
                        <Image alt={`${props.name} Icon`}  src={props.img_src} layout="fill" />
                    </div>
                    <div className="grow">
                        <h1 className="text-[24px] text-white">{props.name}</h1>
                        <span className="text-norm-gray hidden suprsm:block">{props.type} · {props.time_period}</span>
                    </div>
                </div>
                <p className="text-norm-gray my-4">
                    {props.description}
                </p>
                <div className="flex">
                    {props.button_text && props.button_link &&
                        <div className="mr-4">
                            <ProjectButton link={props.button_link} name={props.button_text} />
                        </div>
                    }
                    {props.repo_link && 
                        <div className="flex items-center">
                            <GitHubRepoButton link={props.repo_link} icon={faGithub} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
