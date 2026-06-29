import { type Message } from "./Message"

export type ChatContext = {
    messages: Message[];
    addMessage?: (msg: Message, botId ?: string, user_id?: string) => void;
    setMessages?: (msgs: Message[]) => void;
    clearChat: () => void;
    loadChat: (userEmail: string, chatbotId: string) => void;
}