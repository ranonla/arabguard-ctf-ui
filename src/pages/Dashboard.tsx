import { Box, Typography, Avatar, keyframes } from "@mui/material";
import { Leaderboard, Achievements, ListedBots, ProgressBar} from "@/components/dashboard";
import { useAuth } from "@/hooks/useAuth.ts";
import { stats } from "@/constants/dashboardStats";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const Dashboard = () => {
  const { user } = useAuth();
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
              Initiate
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: "flex",
        }}>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {stats.map((stat, index) => (
              <Typography key={index} sx={{ color: "#ab9e9eff", mr: 1 }}>
                {stat.label}: {stat.value}
                {index !== stats.length - 1 && " |"}
              </Typography>
            ))}
            <Box sx={{ width: 9, height: 9, bgcolor: "#22c55e", borderRadius: "50%", animation: `${blink} 1s infinite` }} />
          </Box>

        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: 4 }}>

        <Box 
          sx={{
            width: { sm: "100%", md: "60%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <ProgressBar />

          <Box
            sx={{
              position: "relative",
              width: { sm: "100%", md: "500px" },
              height: { sm: "100%", md: "500px" },
              margin: "100px auto",
            }}
          >
            <ListedBots />
          </Box>
          
        </Box>

        <Box sx={{
          width: { sm: "100%", md: "25%" },
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