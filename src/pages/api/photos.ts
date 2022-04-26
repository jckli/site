import type { NextApiRequest, NextApiResponse } from "next"
import { PhotoAlbum } from "../../util/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoAlbum>
) {
  const address = "https://cdn.hayasaka.moe/api/album/camera";
  const response = await fetch(address);
  const json: PhotoAlbum = await response.json();
  res.status(200).json(json);
}
