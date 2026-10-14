import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const response = await fetch(
			`https://gomapi.hayasaka.moe/personal/myanimelist/list/all`
		);
		const data = await response.json();

		res.status(response.status).json(data);
	} catch {
		res.status(502).json({ error: "MyAnimeList API unavailable" });
	}
}
