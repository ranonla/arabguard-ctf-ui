import { Box } from "@mui/material";

const SidebarLogo = () => {
  return (
    <Box
      component="svg"
      viewBox="0 10 75 100"
      sx={{
        width: { xs: 40, md: 250 },
        height: "auto",
        filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
      }}
    >
      <defs>
        <linearGradient id="sidebar-logo">
          <stop offset="0%" stopColor="#848890ff" />
          <stop offset="100%" stopColor="#6e6f6fff" />
        </linearGradient>
      </defs>

      <path
        d="M50 25 L70 35 V55 C70 70 50 80 50 80 C50 80 30 70 30 55 V35 Z"
        fill="url(#sidebar-logo)"
      />

      <text
        x="50"
        y="55"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        style={{ letterSpacing: "1px" }}
      >
        NOT
      </text>

      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="#d5dbecff"
        fontSize="6"
      >
        YET
      </text>
    </Box>
  );
};

export default SidebarLogo;