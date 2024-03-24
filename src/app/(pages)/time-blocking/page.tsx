import { Heading } from "@/components/ui/Heading"
import TimeBlocking from "./TimeBlocking"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Time blocking'
}

const TimeBlockingPage = () => {
    return (
        <div>
            <Heading title="Time blocking" />
            <TimeBlocking />
        </div>
    )
}

export default TimeBlockingPage