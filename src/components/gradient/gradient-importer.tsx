/*
 * Gradient background importer
 * ngl this was taken fully from @espeon (https://github.com/espeon/blog)
 * with some modifications as i dont have different themes
 *
 * (@espeon if you want me to take this down please contact me @oha4 on discord)
 */

"use client";
import dynamic from "next/dynamic";

// do not ssr gradientreact
const GradientReact = dynamic(() => import("./gradient"), {
	ssr: false,
});

export default function Gradient() {
	return <GradientReact />;
}
