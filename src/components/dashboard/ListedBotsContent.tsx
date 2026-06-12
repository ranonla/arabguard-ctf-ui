import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChatbots } from "../../hooks/useChatbots";

const ListedBotsContent = () => {
  const { data: chatbots = [], isLoading } = useChatbots();
  const isMobile = window.innerWidth < 600;
  const radius = isMobile ? 130 : 260;
  const center = isMobile ? 160 : 300;
  const navigate = useNavigate();
  const activeBot = chatbots.find((b) => b.status === "ACTIVE");
  const completedBots = chatbots.filter(
    (b) => b.status === "COMPLETED"
  );
  const lockedBots = chatbots.filter((b) => b.status === "LOCKED");

  const sortedBots = [
    ...(activeBot ? [activeBot] : []),
    ...lockedBots,
    ...completedBots,
  ];

  if(isLoading)
    return <div>loading</div>
  return (
    <>
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#797f80ff" />
          </linearGradient>
        </defs>

        {sortedBots.map((bot, i) => {
          const angle =
            (i / sortedBots.length) * 2 * Math.PI - Math.PI / 2;

          const nextIndex = (i + 1) % sortedBots.length;
          const nextBot = sortedBots[nextIndex];

          const nextAngle =
            (nextIndex / sortedBots.length) * 2 * Math.PI -
            Math.PI / 2;

          const x1 = center + radius * Math.cos(angle);
          const y1 = center + radius * Math.sin(angle);

          const x2 = center + radius * Math.cos(nextAngle);
          const y2 = center + radius * Math.sin(nextAngle);

          const isActivePath = bot.status === "COMPLETED" && (nextBot.status === "COMPLETED" || nextBot.status === "ACTIVE"); // last → active (0)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isActivePath ? "url(#lineGradient)" : "#475569"}
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity={isActivePath ? 0.9 : 0.3}
            />
          );
        })}
      </svg>

      {sortedBots.map((chatbot, i) => {
        const angle =
          (i / sortedBots.length) * 2 * Math.PI - Math.PI / 2;

        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              "&:hover": { zIndex: 999 },
            }}
          >
            <Box
              onClick={() => {
                if (chatbot.status === "ACTIVE") {
                  navigate(`/chatbot/${chatbot.id}`,{
                });
              }
              }}
              sx={{
                width: { xs: "140px", sm: "160px", md: "150px" },
                height: { xs: "150px", sm: "160px", md: "200px" },
                borderRadius: "16px",
                p: { xs: 1, md: 2 },
                position: "relative",
                overflow: "hidden",
                cursor:
                  chatbot.status === "ACTIVE"
                    ? "pointer"
                    : "default",

                background:
                  chatbot.status === "LOCKED"
                    ? "rgba(30, 41, 59, 0.4)"
                    : chatbot.status === "COMPLETED"
                    ? "linear-gradient(145deg, rgba(14, 26, 62, 0.7), rgba(2, 27, 67, 0.7))"
                    : "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.7))",

                border:
                  chatbot.status === "LOCKED"
                    ? "1px solid rgba(148,163,184,0.3)"
                    : chatbot.status === "COMPLETED"
                    ? "1px solid rgba(59,130,246,0.5)"
                    : "1px solid rgba(34,197,94,0.5)",

                opacity:
                  chatbot.status === "LOCKED"
                    ? 0.5
                    : chatbot.status === "COMPLETED"
                    ? 0.8
                    : 1,

                filter:
                  chatbot.status === "LOCKED"
                    ? "grayscale(70%)"
                    : "none",

                boxShadow:
                  chatbot.status === "ACTIVE"
                    ? "0 0 20px rgba(34,197,94,0.5)"
                    : chatbot.status === "COMPLETED"
                    ? "0 0 15px rgba(3, 14, 32, 0.4)"
                    : "none",

                transition: "0.3s",

                "&:hover":
                  chatbot.status === "ACTIVE"
                    ? {
                        transform: "scale(1.05)",
                        boxShadow:
                          "0 0 30px rgba(34,197,94,0.7)",
                      }
                    : {},

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >

              <Box
                sx={{
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #6366f1, #06b6d4, #22c55e)",
                }}
              >
                <Box
                  component="img"
                  src={chatbot.avatar}
                  alt={chatbot.persona}
                  sx={{
                    width: { xs: "55px", sm: "65px", md: "90px" },
                    height: { xs: "55px", sm: "65px", md: "90px" },
                    borderRadius: "50%",
                    background: "#111",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  color: "#e0e7ff",
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", md: "1rem" },
                }}
              >
                {chatbot.persona}
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.7rem",
                  textAlign: "center",
                }}
              >
                {chatbot.persona_desc}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: "0.65rem",
                  color:
                    chatbot.status === "ACTIVE"
                      ? "#22c55e"
                      : chatbot.status === "COMPLETED"
                      ? "#3b82f6"
                      : "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "999px",
                  px: 1,
                  py: "2px",
                }}
              >
                {chatbot.status}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ListedBotsContent;