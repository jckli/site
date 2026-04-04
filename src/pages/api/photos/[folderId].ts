import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { folderId } = req.query;

	const response = await fetch(`https://gomapi.hayasaka.moe/personal/onedrive/folder/${folderId}`);
	const data = await response.json();

	res.status(200).json(data);
}
