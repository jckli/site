import { IconButton } from "@/components/IconButton";
import Image from "next/image";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
    return (
        <>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center text-text-color">
                <div className="max-w-[750px]">
                    <div>
                        <Image
                            src="https://avatars.githubusercontent.com/u/39673993"
                            alt="jckli"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                    <h1 className="mt-4 text-xl">
                        Jack Li{" "}
                        <a
                            href="https://github.com/jckli"
                            target="_blank"
                            rel="noreferrer"
                            className="text-text-darkest transition-all ease-in-out transition-200 hover:text-pink-accent"
                        >
                            (@jckli)
                        </a>
                    </h1>
                    <p>I make cool things with code.</p>
                    <div className="mt-2 flex gap-3">
                        <IconButton icon={faEnvelope} href="mailto:me@jackli.dev" />
                        <IconButton icon={faGithub} href="https://github.com/jckli" />
                        <IconButton icon={faLinkedin} href="https://www.linkedin.com/in/jackhli/" />
                        <IconButton icon={faTwitter} href="https://twitter.com/notjackli" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
