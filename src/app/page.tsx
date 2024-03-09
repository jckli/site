import { CurrentTime } from "@/components/CurrentTime";

export default function Home() {
    return (
        <>
            <div className="flex-grow">
                <CurrentTime />
            </div>
        </>
    );
}
