import MessageItem from "./MessageItem";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const MessageList = ({ messages = [], bot, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Box
        sx={{ 
        flex: 1, 
        pt: 8,
        px: 20,
        pb: 9,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
          background: "red",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#2763b9ff",
          borderRadius: "6px",
        },
        }}>
      {messages?.map((msg) => (
        <MessageItem key={msg.id} message={msg} bot={bot} />
      ))}
      {isTyping && (
        <MessageItem message={{
          id:"typing",
          role: "system",
          content: "",
        }}
        bot={bot}
        />
      )}

      <Box ref={bottomRef} />
      
    </Box>
  );
};

export default MessageList;