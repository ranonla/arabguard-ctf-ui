import { Box } from "@mui/material";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../context/ChatContext";
import type { Bot } from "../../types";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

interface ChatInterfaceProps{
  bot: Bot;
  level_passed: boolean;
  setLevel_passed: React.Dispatch<React.SetStateAction<boolean>>; 
}

const ChatIntercface = ({ bot, setLevel_passed }: ChatInterfaceProps) => {
  const queryClient = useQueryClient();
  const {messages, addMessage, clearChat} = useChat();
  const [isTyping, setIsTyping]= useState<boolean>(false);
  const handleSendMessage = async(prompt: string) => {
    const token = localStorage.getItem("access_token");
    let user_id="";
    if(token){
      const decoded = jwtDecode(token) as {
      user_id: string,
      }
      user_id=decoded.user_id;
    }
    addMessage({
      id: crypto.randomUUID(),
      content: prompt,
      role: "user",
    }, bot.id, user_id
  );
    setIsTyping(true);
    try {
  const res = await fetch("/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      character_id: bot.id,
      message: prompt,
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  console.log("chat response:", data);

  addMessage(
    {
      id: crypto.randomUUID(),
      role: "system",
      content: data.reply || "Something went wrong!",
    },
    bot.id,
    user_id
  );

  if (data.is_compromised) {
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    queryClient.invalidateQueries({ queryKey: ["my-stats"] });
    queryClient.invalidateQueries({ queryKey: ["chatbots"] });

    const readingTime = Math.max(
      2000,
      (data.reply?.length || 0) * 5
    );

    setTimeout(() => {
      setLevel_passed(true);
    }, readingTime);
  }
}
catch (err) {
  console.error("Chat error:", err);
}
finally {
  setIsTyping(false);
}
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
      
      <MessageList messages={messages} bot={bot || {avatar:""}} isTyping={isTyping} />
      <MessageInput onSend={handleSendMessage} botName={bot?.persona} disabled={bot.status==="COMPLETED"} />

    </Box>
  );
};

export default ChatIntercface;