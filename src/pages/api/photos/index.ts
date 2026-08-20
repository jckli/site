import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const cursor = typeof req.query.cursor === "string" ? `?cursor=${encodeURIComponent(req.query.cursor)}` : "";
	const response = await fetch(`https://gomapi.hayasaka.moe/personal/google-drive/photos${cursor}`);
	const data = await response.json();
	res.status(response.status).json(data);
}
