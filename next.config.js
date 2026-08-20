/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.scdn.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.myanimelist.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.valorant-api.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "myanimelist.net",
				port: "",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 604800,
	},
	async redirects() {
		return [
			{
				source: "/hayasaka.moe",
				destination: "https://hayasaka.moe",
				permanent: false,
			},
			{
				source: "/discord",
				destination: "https://discord.gg/7aYTPJJWqA",
				permanent: false,
			},
			{
				source: "/mangaupdates",
				destination:
					"https://discord.com/oauth2/authorize?client_id=880694914365685781&scope=applications.commands%20bot&permissions=268856384",
				permanent: false,
			},
			{
				source: "/picsiv",
				destination:
					"https://discord.com/oauth2/authorize?client_id=947361674703302738&scope=applications.commands%20bot&permissions=3072",
				permanent: false,
			},
			{
				source: "/hyme",
				destination:
					"https://discord.com/api/oauth2/authorize?client_id=1037633541263073291&permissions=36965376&scope=bot%20applications.commands",
				permanent: false,
			},
		];
	},
};
