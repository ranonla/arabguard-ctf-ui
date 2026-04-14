import React from 'react'
import { Box } from "@mui/material";

const MainLogo = () => {
  return (

<Box
  component="svg"
  viewBox="0 10 75 100"
  sx={{
    width: { xs: 30, sm: 45, md: 50 },
    height: "auto",
    marginRight: { xs: 1, sm: 1, md: 1 },
  }}
>
  <defs>
    <linearGradient id="logoGradient">
      <stop offset="0%" stopColor="#22d3ee" />
      <stop offset="100%" stopColor="#a855f7" />
    </linearGradient>
  </defs>

  <path
    d="M50 25 L70 35 V55 C70 70 50 80 50 80 C50 80 30 70 30 55 V35 Z"
    fill="url(#logoGradient)"
  />
</Box>
  )
}

export default MainLogo;
