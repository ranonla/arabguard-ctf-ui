import { Dialog,  DialogContent, Typography, Button, Box, Avatar } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { FcCancel } from "react-icons/fc";

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  name: string;
  avatar: string;
};

const DeleteCharacterModal = ({ open, onClose, onDelete, name, avatar }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          background: "#0d1526",
          color: "#fff",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          background: "rgba(145, 18, 18, 0.92)",
          borderBottom: "1px solid rgba(239,68,68,0.12)",
          px: 3.5,
          pt: 3.5,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.75,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Avatar
            src={avatar}
            sx={{
              width: 76,
              height: 76,
              border: "2px solid rgba(239,68,68,0.5)",
              background: "#1a2540",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #0d1526",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.1rem", color: "#f1f5f9" }}
          >
            Delete character
          </Typography>
          <Typography sx={{ fontSize: ".8rem", color: "#d8f4dbff", mt: 0.5 }}>
            This action is permanent and cannot be undone
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ px: 3.5, pt: 2.5, pb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box
            sx={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: "12px",
              px: 2,
              py: 1.75,
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <WarningAmberRoundedIcon
              sx={{ color: "#ef4444", fontSize: 20, mt: 0.1, flexShrink: 0 }}
            />
            <Typography sx={{ fontSize: ".82rem", color: "#5b6167ff", lineHeight: 1.6 }}>
              You're about to permanently delete{" "}
              <Box component="span" sx={{ color: "#df4827ff", fontWeight: 500 }}>
                {name}
              </Box>
              . All data associated with this character will be lost.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.25 }}>
            <Button
              fullWidth
              onClick={onClose}
              startIcon={<FcCancel size={20} />}
              sx={{
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(126, 118, 118, 0.3)",
                color: "#1e1e1fff",
                fontWeight: 500,
                textTransform: "none",
                py: 1.2,
                "&:hover": {
                  background: "rgba(101, 99, 99, 0.37)",
                  border: "1px solid rgba(255,255,255,0.18)",
                },
              }}
            >
            Cancel
            </Button>

            <Button
              fullWidth
              onClick={onDelete}
              startIcon={<DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />}
              sx={{
                borderRadius: "10px",
                background: "#ef4444",
                color: "#fff",
                fontWeight: 500,
                textTransform: "none",
                py: 1.2,
                "&:hover": {
                  background: "#dc2626",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCharacterModal;