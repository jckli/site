/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "cdn.hayasaka.moe",
      "i.scdn.co",
      "cdn.discordapp.com"
    ],
  },
  async redirects() {
    return [
      {
        source: "/hayasaka.moe",
        destination: "https://hayasaka.moe",
        permanent: false,
      },
    ]
  },
}
