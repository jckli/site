import { CurrentTime } from "@/components/CurrentTime";
import { Status } from "@/components/Lanyard/Status";
import { QA } from "@/components/QA";
import { Technologies } from "@/components/Technologies";

const FrequentlyAskedQuestions = () => {
    return (
        <>
            <div className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6">
                <QA
                    question="Who am I?"
                    answer="I'm a casual full stack developer that creates cool things in my free time using modern, efficient, and scalable technologies."
                    cols="col-span-4"
                />
                <div className="col-span-2 h-full">
                    <Status />
                </div>
                <div className="col-span-3 sm:col-span-2 h-full">
                    <CurrentTime />
                </div>
                <QA
                    question="hayasaka.moe?"
                    customAnswer={
                        <p className="mt-2 text-text-darker font-metropolis">
                            <a
                                href="https://hayasaka.moe"
                                className="text-text-darkest hover:text-pink-accent transition-all ease-in-out hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[1px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-pink-accent before:absolute before:left-0 before:bottom-0"
                            >
                                hayasaka.moe
                            </a>{" "}
                            <span>is a domain that I use to host my non personal projects.</span>
                        </p>
                    }
                    cols="col-span-3 sm:col-span-4"
                />
                <div className="col-span-6 sm:col-span-3 h-full">
                    <Technologies />
                </div>
            </div>
        </>
    );
};

export default FrequentlyAskedQuestions;
