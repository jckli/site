import useSWR from "swr";
import { PhotoAlbum } from "../util/types";

export function usePhotoAlbum() {
	const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data: info, error } = useSWR<PhotoAlbum>("/api/photos", fetcher);
    return { info, error };
}