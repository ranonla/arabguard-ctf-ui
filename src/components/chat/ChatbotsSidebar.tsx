import { Box, Typography, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import SidebarLogo from "../SidebarLogo";
import { useChatbots } from "../../hooks/useChatbots";

const ChatbotsSidebar = () => {
  const navigate = useNavigate();
  const {data: chatbots = [] } = useChatbots();

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
      overflowY: "auto",
    }}
    >
      <SidebarLogo/>

      {chatbots.map((bot) => (
      <Tooltip title= {bot.status=="LOCKED"? "مغلق" : bot.status=="ACTIVE"? "نشط" : "مكتمل"} key={bot.id}>
        <Box
          onClick={() => bot.status=="ACTIVE" && navigate(`/chatbot/${bot.id}`)}
          sx={{
            title: "",
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: "10px",
            cursor: bot.status==="ACTIVE" ? "pointer" : "default",
            opacity: bot.status==="LOCKED" ? 0.5 : 1,
            background: !(bot.status==="ACTIVE") ? "none" : "#1e293b",
          }}
        >
          <Avatar src={bot.avatar} sx={{ width: 40, height: 40}} />

          <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
            
            <Box>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 550 }}>
                {bot.persona}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {bot.persona_desc}
                </Typography>
            </Box>
            {bot.status === "LOCKED" && (
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