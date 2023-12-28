import Image from "next/image";
import { PhotoClientComp } from "@/components/PhotoClientComp";

const Photos = async () => {
    const photos = await getPhotos();
    return (
        <>
            {photos.album.files.length != 0 ? (
                <div className="flex flex-col justify-center items-center text-text-darker">
                    <h1 className="text-center text-sm px-10">All photos were taken by me, using a Canon Rebel T6.</h1>
                    <PhotoClientComp>
                        {photos.album.files.map((photo: any) => (
                            <div key={photo.name} className="relative">
                                <Image
                                    className="object-contain rounded-md mb-6 w-full h-auto"
                                    src={photo.url}
                                    alt={photo.name}
                                    width="700"
                                    height="700"
                                    placeholder="blur"
                                    blurDataURL={photo.thumb}
                                />
                            </div>
                        ))}
                    </PhotoClientComp>
                </div>
            ) : (
                <div className="flex-1 flex justify-center items-center text-text-darker">
                    <h1 className="text-center text-sm px-10">No photos found, check back later.</h1>
                </div>
            )}
        </>
    );
};

export default Photos;

async function getPhotos() {
    const res = await fetch("https://cdn.hayasaka.moe/api/album/3pvqr8/view", { next: { revalidate: 180 } });
    if (!res.ok) {
        return { album: { files: [] } };
    }

    const a = res.json();
    return a;
}
