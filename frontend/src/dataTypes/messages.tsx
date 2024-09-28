import { DateTime } from "luxon";

type Message = {
    id: string,
    text: string,
    sender: string,
    senderName: string,
    timeSent: DateTime
}

export type { Message };