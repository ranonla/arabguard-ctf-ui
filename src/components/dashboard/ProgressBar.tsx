import { Box, Typography } from "@mui/material";
import { useStats } from "../../context/StatsContext";

export const ProgressBar = () => {
  const { stats, progress } = useStats();

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "12px",
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(99,102,241,0.3)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
            النقاط
          </Typography>
          <Typography sx={{ color: "#facc15", fontWeight: 600 }}>
            {stats.points}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
            المراحل المكتملة
          </Typography>
          <Typography sx={{ color: "#6366f1", fontWeight: 600 }}>
            {stats.completed_levels}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
            الترتيب
          </Typography>
          <Typography sx={{ color: "#22c55e", fontWeight: 600 }}>
            #{stats.rank}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
          نسبة التقدم
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
          {progress.toFixed(0)}%
        </Typography>
      </Box>

      <Box
        sx={{
          height: 8,
          background: "#1e293b",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #6366f1, #06b6d4, #22c55e)",
            transition: "0.5s",
          }}
        />
      </Box>
    </Box>
  );
};