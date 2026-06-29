import { Dialog, DialogContent, Typography, Button, Box, Avatar, TextField, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useEffect, useState } from "react";
import type { Bot } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Bot>) => Promise<void>;
  bot: Bot;
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255,255,255,.03)",
    color: "#f8fafc",

    "& fieldset": {
      borderColor: "rgba(255,255,255,.08)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(16,185,129,.35)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#10b981",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    fontSize: ".9rem",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#10b981",
  },
};

const shrinkSlot = {
  inputLabel: { shrink: true },
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: ".72rem",
      fontWeight: 700,
      letterSpacing: ".12em",
      color: "#10b981",
      textTransform: "uppercase",
      mb: 2,
    }}
  >
    {children}
  </Typography>
);

const UpdateCharacterModal = ({ open, onClose, onSave, bot }: Props) => {
  const [form, setForm] = useState({ ...bot });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({ ...bot });
  }, [bot]);

  const handle =
    (field: keyof Bot) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "28px",
            background: "#182235",
            border: "1px solid rgba(16,185,129,.15)",
            color: "#f8fafc",
            overflow: "hidden",
          },
        }
      }}
    >
      <Box
        sx={{
          background: "rgba(16,185,129,.08)",
          borderBottom: "1px solid rgba(16,185,129,.12)",
          px: 3.5,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <Avatar
            src={bot.avatar}
            sx={{
              width: 72,
              height: 72,
              border: "2px solid #10b981",
              background: "#111827",
              boxShadow: "0 0 20px rgba(16,185,129,.25)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#10b981",
              border: "2px solid #182235",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EditRoundedIcon
              sx={{
                fontSize: 12,
                color: "#04110a",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontSize: "1.05rem", fontWeight: 600, color: "#e8fff9" }}>
            Edit character
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#00ffc8", mt: 0.4 }}>
            {bot.persona} · Level {bot.level}
          </Typography>
        </Box>
      </Box>

      <DialogContent
        sx={{
          p: 0,
          maxHeight: "70vh",
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: 8,
          },

          "&::-webkit-scrollbar-thumb": {
            background: "rgba(16,185,129,.3)",
            borderRadius: 20,
          },
        }}
      >
        <Box
          sx={{
            px: 3.5,
            py: 3,
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <SectionLabel>Basic info</SectionLabel>
          <Grid container spacing={2.5} sx={{ mt: 4 }}>
            {[
              { label: "Title", field: "title" },
              { label: "Persona", field: "persona" },
              { label: "Level", field: "level", type: "number" },
              { label: "Target", field: "target" },
            ].map(({ label, field, type }) => (
              <Grid item xs={6} key={field}>
                <TextField
                  fullWidth
                  label={label}
                  type={type || "text"}
                  value={(form as any)[field] ?? ""}
                  onChange={handle(field as keyof Bot)}
                  slotProps={shrinkSlot}
                  sx={fieldSx}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ px: 3.5, pt: 3, pb: 3, borderBottom: "1px solid rgba(0,255,200,0.07)" }}>
          <SectionLabel>Descriptions</SectionLabel>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "32px", mt: 4 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Persona description"
              value={form.persona_desc ?? ""}
              onChange={handle("persona_desc")}
              slotProps={shrinkSlot}
              sx={fieldSx}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Prompt template"
              value={form.prompt_template ?? ""}
              onChange={handle("prompt_template")}
              slotProps={shrinkSlot}
              sx={fieldSx}
            />
            <TextField
              fullWidth
              label="Success message"
              value={form.success_msg ?? ""}
              onChange={handle("success_msg")}
              slotProps={shrinkSlot}
              sx={fieldSx}
            />
          </Box>
        </Box>

        <Box sx={{ px: 3.5, pt: 3, pb: 3 }}>
          <SectionLabel>Game settings</SectionLabel>
          <Grid container spacing={2.5} sx={{ mt: 4 }}>
            {[
              { label: "Secret category", field: "secret_category" },
              { label: "Points required", field: "points_required", type: "number" },
              { label: "Points reward", field: "points_reward", type: "number" },
            ].map(({ label, field, type }) => (
              <Grid item xs={6} key={field}>
                <TextField
                  fullWidth
                  label={label}
                  type={type || "text"}
                  value={(form as any)[field] ?? ""}
                  onChange={handle(field as keyof Bot)}
                  slotProps={shrinkSlot}
                  sx={fieldSx}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

      </DialogContent>

      <Box
        sx={{
          px: 3.5,
          py: 2.25,
          background: "rgba(0,0,0,.15)",
          borderTop: "1px solid rgba(255,255,255,.05)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
        onClick={onClose}
          sx={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,.08)",
            background: "transparent",
            color: "#cbd5e1",

            "&:hover": {
              background: "rgba(255,255,255,.03)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            borderRadius: "12px",
            background: "#10b981",
            color: "#04110a",
            fontWeight: 700,

            "&:hover": {
              background: "#34d399",
            },
          }}
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default UpdateCharacterModal;