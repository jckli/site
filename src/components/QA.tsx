import Link from "next/link";

export const QA = (props: any) => {
    return (
        <>
            <div className="text-text-color bg-[#1a202c] rounded-lg">
                <div className="p-5 flex flex-col">
                    <h1 className="font-bold">{props.question}</h1>
                    <p className="mt-2 text-text-darker font-metropolis ">{props.answer}</p>
                </div>
            </div>
        </>
    );
};
