/*
 * Gradient background component
 * ngl this was taken fully from @espeon (https://github.com/espeon/blog)
 * with some modifications as i dont have different themes
 *
 * (@espeon if you want me to take this down please contact me @oha4 on discord)
 */

"use client";
import { useRef, useEffect, useState } from "react";
import { Gradient } from "./stripe";
const GRADIENT_COLORS_NUM = [0x5a3a7a, 0x7a3a6b, 0x312a5c, 0x1f162b];
const GRADIENT_COLORS_HEX = ["#5A3A7A", "#7A3A6B", "#312A5C", "#1F162B"];

export function triggerOnIdle(callback: () => void) {
	if (window && "requestIdleCallback" in window) {
		return window.requestIdleCallback(callback);
	}
	return setTimeout(callback, 1);
}

const GradientReact = () => {
	// Correctly typed refs
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const gradientRef = useRef<Gradient | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (gradientRef.current) return;

		const initAndSetGradient = async () => {
			const gradient: any = new Gradient();
			await gradient.initGradient("#gradient-canvas");

			if (gradient) {
				gradient.amp = 360;
				gradientRef.current = gradient;

				const targetColors = GRADIENT_COLORS_NUM;
				if (gradient?.sectionColors?.length > 0) {
					targetColors.forEach((targetColor, index) => {
						const [r, g, b] = [
							((targetColor >> 16) & 255) / 255,
							((targetColor >> 8) & 255) / 255,
							(targetColor & 255) / 255,
						];
						if (gradient.sectionColors[index]) {
							gradient.sectionColors[index] = [r, g, b];
						}
					});

					if (gradient.uniforms?.u_baseColor) {
						gradient.uniforms.u_baseColor.value = gradient.sectionColors[0];
					}
					if (gradient.uniforms?.u_waveLayers) {
						gradient.uniforms.u_waveLayers.value.forEach(
							(layer: any, index: number) => {
								if (layer?.value?.color) {
									layer.value.color.value =
										gradient.sectionColors[index + 1] ||
										gradient.sectionColors[index];
								}
							}
						);
					}
				}

				setIsInitialized(true);

				if (overlayRef.current) {
					overlayRef.current.style.opacity = "0";
					setTimeout(() => {
						if (overlayRef.current) {
							overlayRef.current.style.display = "none";
						}
					}, 1000);
				}
			}
		};

		triggerOnIdle(initAndSetGradient);
	}, []);

	return (
		<>
			<div
				ref={overlayRef}
				className={`fixed left-0 top-0 w-screen h-screen bg-mainbg transition-opacity duration-1000 -z-10`}
			/>
			<canvas
				id="gradient-canvas"
				ref={canvasRef}
				style={
					{
						"--gradient-color-1": GRADIENT_COLORS_HEX[0],
						"--gradient-color-2": GRADIENT_COLORS_HEX[1],
						"--gradient-color-3": GRADIENT_COLORS_HEX[2],
						"--gradient-color-4": GRADIENT_COLORS_HEX[3],
					} as React.CSSProperties
				}
				className="fixed left-0 top-0 bg-transparent h-screen w-screen -z-20"
			/>
		</>
	);
};

export default GradientReact;
