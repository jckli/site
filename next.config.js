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
      {
        source: "/discord",
        destination: "https://discord.gg/7aYTPJJWqA",
        permanent: false,
      },
      {
        source: "/mangaupdates",
        destination: "https://discord.com/oauth2/authorize?client_id=880694914365685781&scope=applications.commands%20bot&permissions=268856384",
        permanent: false,
      },
      {
        source: "/picsiv",
        destination: "https://discord.com/oauth2/authorize?client_id=947361674703302738&scope=applications.commands%20bot&permissions=3072",
        permanent: false,
      },
      {
        source: "/hyme",
        destination: "https://discord.com/api/oauth2/authorize?client_id=1037633541263073291&permissions=36965376&scope=bot%20applications.commands",
        permanent: false,
      }
    ]
  },
}
