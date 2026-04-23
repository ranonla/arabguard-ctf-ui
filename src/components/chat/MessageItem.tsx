import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "../../utils/copyToClipboard";
import toast from "react-hot-toast";

const MessageItem = ({ message, bot }) => {  
  const isOwn = message.isOwn;

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
        flexDirection: isOwn? "row-reverse" : "row"
      }}>
      {!isOwn && <Avatar src={bot?.avatar || ""} sx={{ width: 34, height: 34}} />}
      <Box
        sx={{
        position: "relative",
        maxWidth: isOwn? "65%":"100%",
        px: 2,
        py: 1.5,
        borderRadius: "10px",
        color: "#fff",
        bgcolor: isOwn? "#3c4d64ff":"transparent",
        wordBreak: "break-word",
        
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            mb: 0.5,
            opacity: 0.8,
          }}
        >
          {message.senderName}
        </Typography>

        <Typography sx={{ fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
          {message.prompt}
        </Typography>

        {/* <Typography sx={{position: "absolute", bottom: 4, right: 8, fontSize: "0.65rem", opacity: 0.7}}>
          {formatTime(message.sentAt)}
        </Typography> */}

      </Box>
</Box>
      <Tooltip title="Copy message">
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
          const success = await copyToClipboard(message.prompt);
          if (success) {
            toast.success("Copied", {toasterId: "global-toaster"});
          }
        }}
        >
          <ContentCopyIcon  sx={{ fontSize: 18 }}/>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default MessageItem;
