import { CurrentTime } from "@/components/CurrentTime";

export default function Home() {
    return (
        <>
            <div className="flex-grow grid grid-cols-6 gap-6 font-metropolis">
                <div className="col-span-3 sm:col-span-2 h-full">
                    <CurrentTime />
                </div>
                <div className="col-span-3 sm:col-span-4 h-full">
                    <div className="h-full rounded-xl p-4 border-[1px] border-borcol bg-box min-h-[13rem]">
                        <h1 className="text-xl text-text-lighter font-metropolis-bold">Domains</h1>
                        <p className="text-text-color mt-2">My only two domains, excluding their subdomains, are:</p>
                        <ul className="list-disc list-inside text-text-color mt-2">
                            <li>jackli.dev (for all personal things, like home services)</li>
                            <li>hayasaka.moe (for all projects that I code)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
