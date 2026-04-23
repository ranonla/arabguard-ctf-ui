import { Box, Typography } from "@mui/material";

export const ProgressBar = () => {
  const progress = 60;

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
            POINTS
          </Typography>
          <Typography sx={{ color: "#facc15", fontWeight: 600 }}>
            1200
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
            COMPLETED LEVELS
          </Typography>
          <Typography sx={{ color: "#6366f1", fontWeight: 600 }}>
            3
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
            RANK
          </Typography>
          <Typography sx={{ color: "#22c55e", fontWeight: 600 }}>
            #3
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
          Progress to next level
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
          {progress}%
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