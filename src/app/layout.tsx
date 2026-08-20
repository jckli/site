import "../globals.css";
import Image from "next/image";
import { IconButton } from "@/components/IconButton";
import { Navbar } from "@/components/Navbar";
import { Activity } from "@/components/lanyard/Activity";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "./head";
import Gradient from "@/components/gradient/gradient-importer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Head />
			<body>
				<div
					className="fixed inset-0 bg-mainbg transition-opacity duration-1000 -z-30"
				/>
				<Gradient />
				<div className="flex items-center justify-center">
					<div className="py-20 px-8 xl:px-10 lg:flex w-full lg:w-[1280px]">
						<div>
							<div className="bg-box/70 border-[1px] border-borcol rounded-2xl">
								<div className="p-8 font-metropolis lg:w-[22rem]">
									<Image
										src="https://avatars.githubusercontent.com/u/39673993"
										alt="jckli"
										width={100}
										height={100}
										className="rounded-full"
									/>
									<div className="mt-4 flex items-center">
										<h1 className="text-2xl font-metropolis-bold text-text-lighter">
											Jack Li
										</h1>
										<a
											href="https://github.com/jckli"
											target="_blank"
											rel="noreferrer"
											className="font-sf-mono text-text-darkest text-xl ml-2 transition-all ease-in-out duration-200 hover:text-pink-accent"
										>
											(@jckli)
										</a>
									</div>
									<p className="text-base text-text-color">
										SDE @ AWS. I create cool things using
										code.
									</p>
									<div className="mt-4 flex gap-4">
										<IconButton href="mailto:me@jackli.dev">
											<FaEnvelope size={24} />
										</IconButton>
										<IconButton href="https://github.com/jckli">
											<FaGithub size={24} />
										</IconButton>

										<IconButton href="https://www.linkedin.com/in/jckli/">
											<FaLinkedin size={24} />
										</IconButton>
									</div>
								</div>
							</div>
							<div>
								<Activity />
							</div>
						</div>
						<div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
							<Navbar />
							<div className="mt-8 lg:mt-4 flex-grow">{children}</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
