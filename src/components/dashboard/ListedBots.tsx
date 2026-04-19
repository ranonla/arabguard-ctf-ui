import { Box } from "@mui/material";
import ListedBotsContent from "./ListedBotsContent";

export const ListedBots = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >

        <Box
        sx={{
            position: "relative",
            width: { xs: "320px", sm: "450px", md: "600px" },
            height: { xs: "320px", sm: "450px", md: "600px" },
        }}
        >
            
            <ListedBotsContent />
        
        </Box>
    </Box>
  );
};