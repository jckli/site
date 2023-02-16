import Link from "next/link";

export const QA = (props: any) => {
    return (
        <>
            <div className={`text-text-color bg-[#1a202c] rounded-lg h-52 ${props.cols}`}>
                <div className="p-5 h-full flex flex-col justify-center">
                    <h1 className="font-bold">{props.question}</h1>
                    <p className="mt-2 text-text-darker font-metropolis ">{props.answer}</p>
                </div>
            </div>
        </>
    );
};
