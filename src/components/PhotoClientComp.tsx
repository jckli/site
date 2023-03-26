"use client";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
};

export const PhotoClientComp = ({ children }: any) => {
    return (
        <>
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-6 max-w-[1000px] px-10 mt-6">
                {children}
            </Masonry>
        </>
    );
};
