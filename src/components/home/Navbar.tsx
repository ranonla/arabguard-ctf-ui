import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import MainLogo from "./Logo";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        py: { xs: "0.1rem", sm: "1rem", md: "2rem" },
        borderBottom: "1px solid rgba(152, 147, 147, 0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box
          component={Link}
          to="/"
          sx={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            justifyContent: "center",
          }}
        >
          <MainLogo />

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
              background: "linear-gradient(90deg, #22d3ee, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ArabGuard
          </Typography>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;