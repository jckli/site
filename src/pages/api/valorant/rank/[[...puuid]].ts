import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { puuid } = req.query;
	const puuidStr = Array.isArray(puuid) ? puuid[0] : puuid;
	const fetchUrl = puuidStr
		? `https://api.jackli.dev/valorant/rank/${puuidStr}`
		: `https://api.jackli.dev/valorant/rank`;

	try {
		const response = await fetch(fetchUrl);
		const data = await response.json();

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch matches" });
	}
}
