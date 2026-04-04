import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const params = new URLSearchParams(req.query as Record<string, string>);

	const response = await fetch(`https://gomapi.hayasaka.moe/personal/myanimelist/list/all`);
	const data = await response.json();

	res.status(200).json(data);
}
