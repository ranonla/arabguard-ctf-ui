import { Box, Typography, Avatar, keyframes } from "@mui/material";
import { Leaderboard, Achievements, ListedBots, ProgressBar} from "@/components/dashboard";
import { useAuth } from "@/hooks/useAuth.ts";
import { useStats } from "../context/StatsContext";


const Dashboard = () => {
  const { user } = useAuth();
  const { nickname } = useStats();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 20%, rgba(27, 29, 109, 0.08), transparent 40%),
          linear-gradient(135deg, #111827 0%, #0a1a31ff 50%, #030712 100%)
        `,
        color: "#fff",
        px: 3,
        py: 4,
        fontFamily: "monospace",
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={user?.photo} sx={{ border: "1px solid #747875ff" }} />
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              {user?.name || "Anonymous"}
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
              {nickname}
            </Typography>
          </Box>
        </Box>

      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: 4 }}>

        <Box 
          sx={{
            width: { xs: "100%", sm: "100%", md: "60%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <ProgressBar />
          <ListedBots />
          
        </Box>

        <Box sx={{
          width: { xs: "100%", sm: "100%", md: "25%" },
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          <Leaderboard />
          <Achievements />
        </Box>

      </Box>

    </Box>
  );
};

export default Dashboard;