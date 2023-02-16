import { CurrentTime } from "@/components/CurrentTime";
import { Status } from "@/components/Lanyard/Status";
import { QA } from "@/components/QA";

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
            </div>
        </>
    );
};

export default FrequentlyAskedQuestions;
