export interface PhotoAlbum {
    message: string;
    name: string;
    downloadEnabled: boolean;
    isNsfw: boolean;
    files: Photo[];
    count: number;
}

export interface Photo {
    name: string;
    id: number;
    url: string;
    thumb: string;
    thumbSquare: string;
}