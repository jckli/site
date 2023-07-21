import "../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MobileNavbar } from "@/components/Navbar/MobileNavbar";
import { DesktopNavbar } from "@/components/Navbar/DesktopNavbar";
import { Footer } from "@/components/Footer";
import { headers } from "next/headers";
config.autoAddCss = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const headersList = headers();
	const userAgent = headersList.get("user-agent");
	const isMobile = userAgent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

	const navigation = [
		{ name: "/index", href: "/" },
		{ name: "/projects", href: "/projects" },
		{ name: "/faq", href: "/faq" },
		{ name: "/photos", href: "/photos" },
	];

	return (
		<html lang="en">
			<head />
			<body className="overflow-x-hidden flex flex-col min-h-[100vh]">
				{isMobile ? <MobileNavbar navigation={navigation} /> : <DesktopNavbar navigation={navigation} />}
				{children}
				<Footer />
			</body>
		</html>
	);
}
