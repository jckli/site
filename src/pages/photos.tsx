import type { NextPage } from "next";
import Masonry from "react-masonry-css";
import { Photo } from "../util/types";
import { usePhotoAlbum } from "../hooks/PhotoData";

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
};

const Photography: NextPage = () => {
    const photos = usePhotoAlbum();
    if (!photos.info || photos.error) {
        return (
            <div className="flex py-[50px] justify-center items-center flex-auto">
                <div className="font-firamono text-[#5e5e5e] ">Loading...</div>
            </div>
        );
    }
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-[1000px] p-[40px] text-[#5e5e5e] font-firamono">
                    <h1 className="text-sm text-center">All photos were taken by me, using a Canon Rebel T6.</h1>
                    <br />
                    <div className="mb-[-1.5rem]">
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto smd:ml-[-1.5rem]"
                            columnClassName="smd:pl-6"
                        >
                            {photos.info.files.map((photo: Photo) => (
                                <div key={photo.id} className="mb-6 relative">
                                    <img className="rounded-[8px]" alt={photo.name} src={photo.url} />
                                </div>
                            ))}
                        </Masonry>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Photography;