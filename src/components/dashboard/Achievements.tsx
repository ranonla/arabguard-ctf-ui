import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { achievementsData } from "@/constants";

const Achievements = () => {
  
  return (
    <Box
      sx={{
        border: "1px solid rgba(6,182,212,0.3)",
        p: 2,
        borderRadius: "10px",
        background: "rgba(25, 32, 61, 0.8)",
      }}
    >

      <Typography
        sx={{
          color: "#06b6d4",
          mb: 2,
          fontWeight: "bold",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 30 }} />
        Achievements
      </Typography>

      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
        alignContent: "center",
        justifyContent: "center",
      }}
      >

        {achievementsData.map((achievement) => {
          const IconComponent = achievement.icon;
          return (
            <Box
            key={achievement.id}
            sx={{
              position: "relative",
              p: 1.5,
              borderRadius: "8px",
              border: achievement.unlocked
                ? "2px solid rgba(201, 205, 203, 0.5)"
                : "2px solid rgba(189, 185, 189, 0.81)",
              background: achievement.unlocked
                ? "rgba(111, 212, 109, 0.36)"
                : "rgba(120, 124, 143, 0.6)",
              opacity: achievement.unlocked ? 1 : 0.5,
              transition: "0.3s",
              width: "100px",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            >
            {!achievement.unlocked && (
              <LockIcon
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  background: "#1e1e2f",
                  borderRadius: "50%",
                  padding: "4px",
                  fontSize: "22px",
                  color: "#fff",
                  border: "2px solid rgba(189, 185, 189, 0.81)",
                }}
              />
            )}
            {<IconComponent sx={{ position: "absolute", fontSize: 30, top: "40%", left: "50%", transform: "translate(-50%, -50%)" }} />}
        
            <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", mt: "auto" }}>
              {achievement.title}
            </Typography>
          </Box>
        )})}
      </Box>
    </Box>
  );
};

export default Achievements;