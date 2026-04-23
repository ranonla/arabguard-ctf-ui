import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);
export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState({});//more than one bot { {1,2,...}}
    const addMessage = (botId, msg) => {
        setMessages((prev)=> ({
            ...prev, //keep messages of the rested bots
            [botId]: [...(prev[botId] || []), msg] //copy old ones, then put the new message
        }));
    };
    return(
        //put old ones plus add the new one
        <ChatContext.Provider value={{messages, addMessage}}>
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