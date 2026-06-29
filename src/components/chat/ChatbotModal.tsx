import { Dialog, Box, Typography, Avatar, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const ChatbotModal = ({ open, bot, onClose }) => {
  if (!bot) return null;
  const [displayedText, setDisplayedText] = useState<string | null>(null);
  const fullText = bot.persona_desc || "بنجهز التحدي... مستعد؟";

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, [fullText, open]);

  return (
    <>
      <style>
        {`
        @keyframes blink {
          0%,100% { opacity: 1 }
          50% { opacity: 0 }
        }
        `}
      </style>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            background: "transparent",
            boxShadow: "none",
            borderRadius: "20px",
            overflow: "hidden",
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            background: "#20232f",
            border: "1px solid rgba(99,102,241,0.2)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Tooltip title={`${bot.persona} chatbot photo`}>
            <Avatar
              src={bot.avatar}
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 2,
                border: "2px solid #6366f1",
                boxShadow: "0 0 20px rgba(99,102,241,0.5)",
              }}
            />
          </Tooltip>

          <Typography align="center" sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
            {bot.persona}
          </Typography>

          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: "16px",
              background: "#37426aff",
              border: "1px solid rgba(99,102,241,0.2)",
              textAlign: "left",
              height: "40px",
              width: "80%",
              display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: "0.9rem", direction: "rtl", textAlign: "right" }}>
              {displayedText}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "2px",
                  height: "20px",
                  background: "white",
                  ml: 0.5,
                  animation: "blink 1s infinite",
                }}
              />
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                position: "relative",
                background: "#2174c8ff",
                color: "#000",
                px: 2,
                py: 1,
                borderRadius: "6px",
                transform: "rotate(-3deg)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "0.7rem" }}>المستوى</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {bot.level || 1}
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

            <Box
              sx={{
                position: "relative",
                background: "#1fb04dff",
                color: "#000",
                px: 2,
                py: 1,
                borderRadius: "6px",
                transform: "rotate(2deg)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                maxWidth: 160,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "0.7rem" }}>
                المهمة
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {bot.target || "Complete mission"}
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
          <Tooltip title= "ابدأ المهمة">
            <Button
              fullWidth
              sx={{
                mt: 4,
                py: 2,
                width: "50%",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #2f642eff, #3a9bacff)",
                color: "#fff",
              }}
              onClick={onClose}
            >
              ابدأ المهمة
            </Button>
          </Tooltip>
        </Box>
      </Dialog>
    </>
  );
};

export default ChatbotModal;