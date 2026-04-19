import { Box, Typography } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Leaderboard = () => {
  const players = [
    { name: "Neo", points: 980 },
    { name: "Cipher", points: 870 },
    { name: "Rana (You)", points: 350 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },
    { name: "Ghost", points: 220 },

  ];

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
      <Typography sx={{ color: "#06b6d4", mb: 2, fontWeight: "bold", fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 1 }}>
        <MilitaryTechIcon sx={{ fontSize: 32 }} />
        Leaderboard
      </Typography>

      {sorted.map((player, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            p: 1,
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
          <Box>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: "600" }}>
              #{index + 1} {player.name}
            </Typography>

            <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
              initiate
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