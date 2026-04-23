import { Box } from "@mui/material";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../context/ChatContext";
import type { Bot } from "../../types";

interface ChatInterfaceProps{
  userId: number;
  bot?: Bot; 
}

const ChatIntercface = ({ userId, bot }: ChatInterfaceProps) => {

  const {messages, addMessage} = useChat();
  const botMessages = messages[bot.id] || [];
  const handleSendMessage = (prompt: string) => {
    addMessage(bot.id, {
        id: undefined,
        prompt,
        senderId: userId,
        sentAt: Date.now(),
        isOwn: false,
      }
    );
  };



  return (
    <Box
      sx={{
        position: "relative",
        width: "75%",
        background: "#1f2129ff",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #374151",
        flexShrink: 0,
        backdropFilter: "blur(8px)",
      }}
    >
      
      <MessageList messages={botMessages} bot={bot || {avatar:""}} />
      <MessageInput onSend={handleSendMessage} botName={bot?.name} />

    </Box>
  );
};

export default ChatIntercface;