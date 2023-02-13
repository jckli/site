import "../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Navbar } from "@/components/Navbar";
config.autoAddCss = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
