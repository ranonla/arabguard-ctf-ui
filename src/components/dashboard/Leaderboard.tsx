import { Box, Typography } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useLeaderboard } from "../../hooks/useLeaderboard";

const Leaderboard = () => {
  const { data: players = [] } = useLeaderboard();

  const sorted = [...players].sort((a, b) => b.points - a.points);
  return (
    <Box
      sx={{
        background: "rgba(25, 32, 61, 0.8)",
        border: "1px solid rgba(148,163,184,0.2)",
        p: 2,
        borderRadius: "10px",
        
      }}
    >
      <Typography sx={{ color: "#06b6d4", mb: 4, fontWeight: "bold", fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 1, direction: "rtl",
        textAlign: "right", }}>
        <MilitaryTechIcon sx={{ fontSize: 32 }} />
        الصدارة
      </Typography>

      {sorted.map((player, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            p: 2,
            borderRadius: "6px",
            border: "1px solid rgba(99,102,241,0.4)",
            background:
              index === 0
                ? "rgba(34,197,94,0.1)"
                : index === 1
                ? "rgba(99,102,241,0.1)"
                : index === 2
                ? "rgba(234,179,8,0.1)"
                : "transparent",
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "600"}}>
              #{index + 1}
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: "600"}}>
              {player.name}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "0.8rem", color: "#22c55e" }}>
            {player.points}pts
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;