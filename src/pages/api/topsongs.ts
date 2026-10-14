import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const params = new URLSearchParams(req.query as Record<string, string>);
		const queryString = params.toString();

		const response = await fetch(
			`https://gomapi.hayasaka.moe/personal/spotify/top-items/tracks?${queryString}`
		);
		const data = await response.json();

		res.status(response.status).json(data);
	} catch {
		res.status(502).json({ error: "Spotify API unavailable" });
	}
}
