/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://127.0.0.1:8080/api/:path*/",
			},
			{
				source: "/getfile/:path*",
				destination: "http://127.0.0.1:8080/getfile/:path*",
			},
		];
	},
	reactStrictMode: false,
};

module.exports = withPlugins(
	[
		[
			withPWA,
			{
				pwa: {
					dest: "public",
					register: true,
					skipWaiting: true,
				},
			},
		],
	],
	nextConfig
);
