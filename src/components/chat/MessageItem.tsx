import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "../../utils/copyToClipboard";
import toast from "react-hot-toast";

const MessageItem = ({ message, bot }) => {  
  const isOwn = message.role==="user";
  const isTyping = message.id === "typing";
  const dotStyle = (delay: number) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: "#94a3b8",
  animation: "bounce 1.2s infinite",
  animationDelay: `${delay}s`,
});

  return (
    <Box sx={{
        display: "flex",
        alignItems: isOwn ? "flex-end" : "flex-start",
        "&:hover .message-options": {
          opacity: 1,
          transform: "translateY(0)",
        },
        flexDirection: "column",
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "end",
        width: "100%",
        flexDirection: isOwn? "row-reverse" : "row"
      }}>
        {!isOwn && <Avatar src={bot?.avatar || ""} sx={{ width: 34, height: 34}} />}
        <Box
          sx={{
          position: "relative",
          width: "fit-content",
          maxWidth: isOwn? "65%":"100%",
          px: 2,
          py: 1.5,
          borderRadius: "10px",
          color: "#fff",
          bgcolor: isOwn? "#3c4d64ff":"transparent",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          "@keyframes bounce": {
            "0%, 80%, 100%": {
              transform: "translateY(0)",
              opacity: 0.3,
            },
            "40%": {
              transform: "translateY(-6px)",
              opacity: 1,
            },
          },
          }}
        >

          <Typography sx={{ fontSize: "0.9rem", whiteSpace: "normal", display: "inline" }}>
            {isTyping ? (
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <Typography>{bot.persona} يكتب </Typography>
                <Box sx={dotStyle(0)}></Box>
                <Box sx={dotStyle(0.2)}></Box>
                <Box sx={dotStyle(0.4)}></Box>
              </Box>
            ):(
              message.content
            )}
          </Typography>
        </Box>
      </Box>
      {!isTyping && (
        <Tooltip title="نسخ">
          <Box 
          className="message-options"
          sx={{
            mt: 0.5,
            opacity: isOwn? 0 : 1,
            transition: "0.2s",
            display: "flex",
            gap: 1,
            cursor: "pointer",
            color: "#cbd5f5",
            "&:hover":{
              color: "#fff",
            },
            pl: 6,
          }}
          onClick={async() => {
            const success = await copyToClipboard(message.content);
            if (success) {
              toast.success("Copied", {toasterId: "global-toaster"});
            }
          }}
          >
          <ContentCopyIcon  sx={{ fontSize: 18 }}/>
        </Box>
      </Tooltip>
      )}
    </Box>
  );
};

export default MessageItem;
