import { InlineLink } from "@/components/InlineLink";

export default function ProjectsPage() {
	return (
		<>
			<div className="h-full rounded-xl p-4 border-[1px] border-borcol bg-box/70 min-h-[13rem] font-metropolis">
				<p className="text-text-darkest text-center font-sf-mono my-4">
					my setup environment, for the people who care.
				</p>
				<p className="text-text-color mt-2 mb-6">
					Here&apos;s a list of hardware and software that I use on a daily basis. There's
					probably some objective reasoning behind my picks, so let me know if you wanna
					chat or ask questions about it.
				</p>
				<h2 className="text-lg text-text-lighter font-metropolis-bold mb-1">Preface</h2>
				<p className="text-text-color">
					I use two operating systems on the daily, with my laptop being MacOS and my main
					computer using Windows 11. I have a coding VM on my homelab that runs Debian,
					and I SSH into that to do any of the coding I do. So majority of the software I
					use is mainly for MacOS (Unix) and Linux.
				</p>
				<h2 className="text-lg text-text-lighter font-metropolis-bold mt-4 mb-1">
					Development environment
				</h2>
				<ul className="list-disc list-inside text-text-color">
					<li>
						Currently, I use <InlineLink href="https://neovim.io/" text="neovim" />{" "}
						for my editor (though I&apos;m still learning all the keybinds)
					</li>
					<li>
						<InlineLink
							href="https://github.com/catppuccin/catppuccin"
							text="Catppuccin Mocha Mauve"
						/>{" "}
						is my go-to theme for everything, including neovim.
					</li>
					<li>
						For my terminal, I use zsh with{" "}
						<InlineLink href="https://ohmyz.sh/" text="Oh My Zsh" /> and my forked
						version of{" "}
						<InlineLink
							href="https://github.com/jckli/bliss-zsh"
							text="bliss-zsh"
						/>{" "}
						as the base theme.
					</li>
					<li>
						I really like using Apple's SF Mono font (Nerd font patched) for coding.
						I have a patched version somewhere on my GitHub.
					</li>
					<li>
						For terminal application, I use{" "}
						<InlineLink href="https://github.com/kovidgoyal/kitty" text="kitty" />{" "}
						on MacOS and <InlineLink href="https://wezterm.org/" text="WezTerm" />{" "}
						on Windows.
					</li>
				</ul>
				<h2 className="text-lg text-text-lighter font-metropolis-bold mt-4 mb-1">
					Desktop Apps
				</h2>
				<ul className="list-disc list-inside text-text-color">
					<li>
						<InlineLink
							href="https://www.firefox.com/en-US/channel/desktop/"
							text="Firefox Nightly"
						/>{" "}
						is my browser of choice. Firefox still has good privacy and uBlock
						origin (my goat). Nightly because the icon colors are better.
					</li>
					<li>
						For music, I use{" "}
						<InlineLink href="https://www.spotify.com" text="Spotify" />. They just
						introduced lossless!
					</li>
					<li>
						My email client is{" "}
						<InlineLink href="https://www.thunderbird.net/" text="Thunderbird" />.
					</li>
				</ul>
				<h2 className="text-lg text-text-lighter font-metropolis-bold mt-4 mb-1">Tech Stack</h2>
				<ul className="list-disc list-inside text-text-color">
					<li>
						For web development, I usually stick with{" "}
						<InlineLink
							href="https://github.com/jckli/next-template"
							text="Next.js"
						/>{" "}
						with my own template. Though, I&apos;ve been looking into other
						frameworks because of the business practices behind Next.js.
					</li>
					<li>
						I use <InlineLink href="https://bun.sh/" text="Bun" /> as my runtime for
						JavaScript/TypeScript and{" "}
						<InlineLink href="https://docs.astral.sh/uv/" text="Uv" /> for Python.
					</li>
					<li>
						My backend go-to language is{" "}
						<InlineLink href="https://go.dev/" text="Go" /> (GOPHERS!). I&apos;ve
						also been using{" "}
						<InlineLink href="https://www.rust-lang.org/" text="Rust" /> for some
						APIs too and my old APIs are still stuck with{" "}
						<InlineLink href="https://www.python.org/" text="Python" />.
					</li>
					<li>
						For databases, I usually use{" "}
						<InlineLink href="https://www.mongodb.com/" text="MongoDB" /> but more
						recently <InlineLink href="https://redis.io/" text="Redis" /> for my
						apps.
					</li>
				</ul>
				<h2 className="text-lg text-text-lighter font-metropolis-bold mt-4 mb-1">Desk Setup</h2>
				<ul className="list-disc list-inside text-text-color">
					<li>
						My monitors are an MSI G274QPF E2 (1440p, 27in, 180hz) and a BenQ GW2480
						(1080p, 24in, overclocked to 75hz).
					</li>
					<li>
						I use a{" "}
						<InlineLink
							href="https://www.logitechg.com/en-us/shop/p/pro-wireless-mouse"
							text="Logitech G Pro Wireless"
						/>{" "}
						mouse for everything. If I need a "mouse" for MacOS, I use a{" "}
						<InlineLink
							href="https://www.apple.com/shop/product/mxk93am/a/magic-trackpad-usb%E2%80%91c-white-multi-touch-surface"
							text="Magic Trackpad"
						/>{" "}
						(seriously why are the macbook trackpads so good).
					</li>
					<li>
						My keyboard is a{" "}
						<InlineLink href="https://www.qwertykeys.com/" text="QK65" /> in lilac
						and white colorscheme. I use the LoobedSwitches Cotton Candy switches
						(RIP LoobedSwitches) with{" "}
						<InlineLink
							href="https://osume.com/products/strawberry-milk-keycaps"
							text="osume Strawberry Milk keycaps"
						/>
						.
					</li>
					<li>
						My second keyboard is a{" "}
						<InlineLink
							href="https://cannonkeys.com/products/bakeneko-60"
							text="Bakeneko60"
						/>{" "}
						with JWK Bluey switches and QTUO Blue Bunny keycaps.
					</li>
				</ul>
				<h3 className="text-md text-text-lighter font-metropolis-bold mt-3 mb-1">Computers</h3>
				<ul className="list-disc list-inside text-text-color">
					<li>
						I have a{" "}
						<InlineLink
							href="https://www.apple.com/macbook-air/"
							text="MacBook Air 13-inch M2 (16GB ram, 256GB storage)"
						/>
						.
					</li>
					<li>
						My main PC is a small form factor (SFF) build with a{" "}
						<InlineLink
							href="https://www.intel.com/content/www/us/en/products/sku/236799/intel-core-i5-processor-14600k-24m-cache-up-to-5-30-ghz/specifications.html"
							text="Intel Core i5-14600k"
						/>{" "}
						+ 64GB ram +{" "}
						<InlineLink
							href="https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/"
							text="NVIDIA RTX 5070"
						/>
						. The case is a S300 case from KXRORS (this has a lot of names so just
						search up "S300 case" on Amazon).
					</li>
					<li>
						My homelab server is just a simple{" "}
						<InlineLink
							href="https://www.dell.com/en-au/shop/dell-poweredge-servers/poweredge-t40-tower-server/spd/poweredge-t40/aspet40_vi_vp"
							text="Dell PowerEdge T40"
						/>
						. This server runs Proxmox with multiple LXC containers for services and
						apps (including my coding container!).
					</li>
					<li>
						I also run a Kubernetes cluster on a bunch of random cloud VMs using{" "}
						<InlineLink href="https://k3s.io/" text="k3s" /> and{" "}
						<InlineLink href="https://tailscale.com/" text="tailscale" />. Most of
						my APIs are pushed up here.
					</li>
				</ul>
				<h3 className="text-md text-text-lighter font-metropolis-bold mt-3 mb-1">Audio</h3>
				<ul className="list-disc list-inside text-text-color">
					<li>
						I like to listen to speakers as much as possible, in my opinion:
						speakers &gt; headphones &gt; earbuds/IEMs.
					</li>
					<li>
						My main speakers are{" "}
						<InlineLink href="https://elac.com/db62" text="ELAC Debut 2.0 B6.1" />{" "}
						with a{" "}
						<InlineLink
							href="https://www.monoprice.com/product?p_id=9723"
							text="Monoprice 12in subwoofer"
						/>
						, powered by a{" "}
						<InlineLink
							href="https://pioneerhomeusa.com/xc-hm86"
							text="Pioneer XC-HM86"
						/>{" "}
						amp/reciever.
					</li>
					<li>
						For IEMs, I use the really nice{" "}
						<InlineLink
							href="https://shenzhenaudio.com/collections/headphones/products/moondrop-aria-snow-edition-high-performance-diamond-like-lcp-diaphragm-dynamic-driver-iems-in-ear-earphone"
							text="Moondrop Aria Snow Edition"
						/>
						.
					</li>
					<li>
						My microphone is the super tested (and survived being run over){" "}
						<InlineLink
							href="https://www.shure.com/en-US/products/microphones/sm58"
							text="Shure SM58"
						/>{" "}
						with a{" "}
						<InlineLink
							href="https://us.focusrite.com/products/scarlett-solo"
							text="Focusrite Scarlett Solo"
						/>{" "}
						audio interface. My speakers and IEM's are both plugged into this as the
						DAC.
					</li>
					<li>
						On the go, I whip out my{" "}
						<InlineLink
							href="https://www.apple.com/airpods-pro/"
							text="AirPods Pro 2"
						/>
						.
					</li>
				</ul>
			</div>
		</>
	);
}
