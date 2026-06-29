import { createContext, useContext, useState } from "react";
import type { Message, ChatContext } from "../types";

const ChatContext = createContext<ChatContext | null>(null);
export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState<Message[]>([]);//more than one message
    const addMessage = (msg: Message, chatbotId?: string, user_id ?: string
    ) => {
        setMessages((prev)=> {
            const updated = [...prev, msg]; // //keep old messages of the bot, then put the new message
            if(chatbotId && user_id)
                localStorage.setItem("active_chat", JSON.stringify({
                user_id,
                chatbotId,
                messages: updated,
                })
            );
            return updated;
        });
    };
    const setChatMessages =(msgs: Message[]) => {
        setMessages(msgs);
        localStorage.setItem("active_chat", JSON.stringify(msgs));
    };
    const loadChat = (chatbotId: string, user_id: string) => {
        const saved = localStorage.getItem("active_chat");
        if(!saved){
            setMessages([]);
            return;
        }
        try{
            const parsed = JSON.parse(saved);
            if (
                parsed.user_id === user_id &&
                parsed.chatbotId === chatbotId
            ) {
                setMessages(parsed.messages || []);
            } else {
                setMessages([]);
            }
        }catch{
            setMessages([]);
        }
    };
    const clearChat = () => {
        setMessages([]);
        localStorage.removeItem("active_chat")
    };
    return(
        //put old ones plus add the new one
        <ChatContext.Provider value={{messages, addMessage, setMessages: setChatMessages, clearChat, loadChat}}>
            {children}
        </ChatContext.Provider>
    );
};
//custom hook so instead of { messages } = useContext(ChatContext) -> useChat()
export const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) throw new Error("Error in using ChatProvider");
    return context;
}