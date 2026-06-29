import { IoSend } from "react-icons/io5";
import { Box, IconButton, InputBase, Tooltip, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  botName: string;
  disabled: boolean;
}

const MessageInput = ({ onSend, botName, disabled }: MessageInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <Box sx={{
      p: 4,
      borderTop: "1px solid #4b5563",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      background: "#1f2129ff",
      backdropFilter: "blur(8px)",
      direction: "rtl",
      textAlign: "right",
      }}>
      {!disabled ? (
        <>
        <Box sx={{
          background: "#38393bff",
          borderRadius: "20px",
          px: 2,
          py: 1.2,
          width: "70%",
          border: "1px solid rgba(249, 249, 249, 0.2)",
          }}>
            <InputBase
            fullWidth
            placeholder={`أسأل ${botName}`}
            inputRef={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{fontSize: "1rem", color: "#ffffffff"}}
            />
        </Box>

        <Tooltip title="إرسال">
          <IconButton
          onClick={handleSend}
          sx={{py: 2, px: 2, color: "#fff", background: "#46474aff", borderRadius: "9px", "&:hover": {
            background: "#494848ff",
            },
          }}
          >
            <IoSend size={20} style={{ transform: "scaleX(-1)", }} />
          </IconButton>
        </Tooltip>
        </>

      ): 
      <Typography sx={{fontSize: "0.9rem"}}>تم إغلاق هذا التحدي، ولم يعد الوصول إلى هذه المحادثة متاحًا.</Typography>}
    </Box>
  );
};

export default MessageInput