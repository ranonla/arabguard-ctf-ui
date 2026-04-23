import { Box, Typography, Avatar, Tooltip } from "@mui/material";
import { chatbots } from "@/constants";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import SidebarLogo from "../SidebarLogo";

const ChatbotsSidebar = () => {
  const navigate = useNavigate();

  return (
    <Box 
    sx={{
      p: 2,
      width: "25%",
      borderRight: "1px solid #374151",
      background: "#020617",
      backgroundImage: `
        linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px", 
    }}
    >
      <SidebarLogo/>

      <Typography sx={{ mb: 2, fontWeight: 600 }}>
        Main Charachters
      </Typography>

      {chatbots.map((bot) => (
      <Tooltip title= {bot.locked? "Locked" : "Unlocked"} >
        <Box
          key={bot.id}
          onClick={() => !bot.locked && navigate(`/chatbot/${bot.id}`)}
          sx={{
            title: "",
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: "10px",
            cursor: bot.locked ? "default" : "pointer",
            opacity: bot.locked ? 0.5 : 1,
            "&:hover": {
              background: bot.locked ? "none" : "#1e293b",
            },
          }}
        >
          <Avatar src={bot.avatar} sx={{ width: 40, height: 40}} />

          <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
            
            <Box>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 550 }}>
                {bot.name}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {bot.description}
                </Typography>
            </Box>
            {bot.locked && (
              <LockIcon sx={{ color: "gray" }} />
            )}
          </Box>

        </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ChatbotsSidebar;