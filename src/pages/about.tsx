import type { NextPage } from "next";
import Image from "next/image";
import { useTimePassed } from "../hooks/useTimePassed";
import ReactTooltip from 'react-tooltip';

const About: NextPage = () => {
    const birthday = 1128294000000;
    const age = useTimePassed(birthday);
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-[750px] px-[40px] py-[20px]">
                <div className="flex items-center">
                    <div className="inline-block mr-4 min-w-[64px] h-[64px] relative rounded-[50%] overflow-hidden">
                        <Image src="/me.jpg" alt="Me!" layout="fill" />
                    </div>
                    <h1 className="text-white text-2xl font-firamono inline-block">Jack Li</h1>
                </div>
                <br />
                <div className="inline-block">
                    
                    <p className="inline">Hey! I am Jack Li, a </p>
                    <p data-tip data-for="age" className="inline underline">{Math.floor(age)}</p>
                    <ReactTooltip id="age" effect="solid">{age.toString().substring(0, 12)}</ReactTooltip>
                    <p className="inline"> year-old full stack developer. 
                        Thinking of random new ideas and making them come true is my passion.
                        I love creating open-source software, and I&apos;m always looking for new ways to improve my skills.
                    </p>
                    <p className="mt-4">
                        Outside of programming, I enjoy photography, playing video games, and spending time with my friends. You can find some of my photos on the
                        /photos page. Currently, the games I&apos;m playing are VALORANT and Fortnite. Some of my favorite songs are listed below as well.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;