import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import Sidebar from "../components/Admin/Sidebar";
import PromptTable from "../components/Admin/PromptTable";
import { useAuth } from "../hooks/useAuth";

const AdminPanel = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        overflowX: "hidden",
        background: `
          radial-gradient(
            circle at top left,
            rgba(6,182,212,0.12),
            transparent 35%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(99,102,241,0.15),
            transparent 40%
          ),
          #020617
        `,
        color: "#fff",
      }}
    >
      {showSidebar && (
        <Sidebar setShowSidebar={setShowSidebar} />
      )}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          {!showSidebar && (
            <Tooltip title="Toggle Sidebar">
              <Box
                sx={{
                  cursor: "pointer",
                  mr: 2,
                }}
              >
                <FaList
                  size={30}
                  onClick={() => setShowSidebar(true)}
                />
              </Box>
            </Tooltip>
          )}

          <Typography
            variant="h4"
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Welcome, {user?.name || "Admin"}!
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
          }}
        >
          <PromptTable />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;