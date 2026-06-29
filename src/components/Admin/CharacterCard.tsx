import { Card, CardContent, Typography, Box, Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Bot } from "@/types";

type Props = {
  bot: Bot;
  onDelete: () => void;
  onEdit?: () => void;
};

const CharacterCard = ({ bot, onDelete, onEdit }: Props) => {
  return (
    <Card
      sx={{
        background: `
        linear-gradient(
          180deg,
          rgba(255,255,255,.03),
          rgba(255,255,255,.01)
        ),
        #182235
        `,
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "24px",
        overflow: "hidden",
        color: "#fff",
        transition: ".3s",
        minWidth: 280,

        "&:hover": {
          transform: "translateY(-8px)",
              },
      }}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tooltip title={`${bot.persona} avatar`}>
          <Avatar
            src={bot.avatar}
            sx={{
              width: 95,
              height: 95,
              mb: 2,
              border: "2px solid #6366f1",
              boxShadow: "0 0 20px rgba(99,102,241,.5)",
            }}
          />
        </Tooltip>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          {bot.persona}
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 2,
            width: "100%",
            minHeight: 20,
            borderRadius: "14px",
            background: "#37426a",
            border: "1px solid rgba(99,102,241,.2)",
          }}
        >
          <Typography
            sx={{
              fontSize: ".85rem",
              color: "#d1d5db",
              textAlign: "center",
            }}
          >
            {bot.persona_desc}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              position: "relative",
              background: "#2174c8",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: "8px",
              transform: "rotate(-3deg)",
              minWidth: 80,
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: ".7rem" }}>
              LEVEL
            </Typography>

            <Typography sx={{ fontWeight:"bold" }}>
              {bot.level}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                top: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 16,
                height: 10,
                background: "#94a3b8",
                borderRadius: "2px",
              }}
            />
          </Box>

          
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 1.5,
            width: "100%",
            borderRadius: "12px",
            background: "#111827",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <Typography
            sx={{
              fontSize: ".7rem",
              color: "#9ca3af",
              textAlign: "center",
              mb: .5,
            }}
          >
            TARGET
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {bot.target}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Edit Character">
            <IconButton
              sx={{
                bgcolor: "rgba(51, 230, 141, 0.15)",
                "&:hover": {
                  bgcolor: "rgba(51, 230, 141, 0.50)",
                },
              }}
            >
              <EditIcon sx={{ color: "#36ca67ff" }} onClick={onEdit} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Character">
            <IconButton
              sx={{
                bgcolor: "rgba(239,68,68,.15)",

                "&:hover": {
                  bgcolor: "rgba(239,68,68,.3)",
                },
              }}
            >
              <DeleteIcon sx={{ color: "#ef4444" }} onClick={onDelete} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;