import MessageItem from "./MessageItem";
import { Box } from "@mui/material";
import type { Message } from "@/types";
import { useEffect, useRef } from "react";

const MessageList = ({ messages = [], bot }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isNearBottom = () => {
  const el = containerRef.current;
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const didISendLastMessage = lastMessage?.isOwn;
    if(didISendLastMessage || isNearBottom()){
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <Box ref={containerRef}
        sx={{ 
        flex: 1, 
        pt: 8,
        px: 20,
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

      <Box ref={bottomRef} />
      
    </Box>
  );
};

export default MessageList;