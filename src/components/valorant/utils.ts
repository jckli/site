export const ACCOUNTS = [
	{ label: "ohashi#lol", puuid: "" },
	{ label: "laura#mommy", puuid: "7631e6ac-f3d7-5e30-91df-93d9d83e7242" },
	{ label: "GAME INTER 3000#NOCAP", puuid: "ca5a587c-5afe-5df5-a25d-ce404d9d6a06" },
];

export const PARTY_COLORS = [
	"bg-purple-500",
	"bg-yellow-500",
	"bg-emerald-500",
	"bg-pink-500",
	"bg-orange-500",
	"bg-cyan-500",
];

export const fetcher = (url: string) => fetch(url).then(res => res.json());

export const formatRelativeDate = (dateString: string) => {
	const itemDate = new Date(dateString);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	if (itemDate.toDateString() === today.toDateString()) return "Today";
	if (itemDate.toDateString() === yesterday.toDateString()) return "Yesterday";
	return itemDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
