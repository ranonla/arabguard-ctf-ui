import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Button, Tooltip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddIcon from "@mui/icons-material/Add";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";

interface SidebarProps {
  setShowSidebar: (show: boolean) => void;
};
const Sidebar = ({ setShowSidebar }: SidebarProps) => {
  const Navigate = useNavigate();
    return (
      <Box
      sx={{
        width: 260,
        flexShrink: 0,
        background: "#0f172a",
        borderRight: "1px solid rgba(6,182,212,0.2)",
        backdropFilter: "blur(10px)",
        p: 2,
      }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, mt: 4}}>
            <Typography
            variant="h5"
            sx={{
              color: "#06b6d4",
              fontWeight: "bold",
            }}
            >
                Management
            </Typography>
            <IoMdClose onClick={() => setShowSidebar(false)} size={22} style={{ cursor: "pointer" }} title="Close list" />
        </Box>

        <List>
          <Tooltip title="Manage characters">
            <ListItemButton
            sx={{
              borderRadius: 2,
              "&:hover": {
                background: "rgba(6,182,212,0.12)",
                transform: "translateX(4px)",
              },
              transition: "all .2s ease",
              }}
              onClick={() => Navigate("/admin/characters")}
            >
              <ListItemIcon>
                <SmartToyIcon sx={{ color: "#06b6d4" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Characters" />
            </ListItemButton>
          </Tooltip>  
        </List>

        <Box sx={{ mt: 4 }}>
        <Button
        startIcon={<AddIcon />}
        variant="contained"
        fullWidth
        sx={{
            background: "linear-gradient(135deg,#06b6d4,#3b82f6)",
            color: "#000",
            fontWeight: "bold",
        }}
        onClick={() => Navigate("/admin/character/new")}
        >
          Add Character
        </Button>
        </Box>
    </Box>
  )
}

export default Sidebar