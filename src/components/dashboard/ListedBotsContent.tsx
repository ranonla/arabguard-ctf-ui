import { Box, Typography } from '@mui/material'
import { chatbots } from '@/constants/chatbotData';
import { useNavigate } from 'react-router-dom';

const ListedBotsContent = () => {
  const isMobile = window.innerWidth < 600;
  const radius = isMobile ? 130 : 260;
  const center = isMobile ? 160 : 300;
  const navigate = useNavigate();
  return (
    <>
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {chatbots.map((bot, i) => {
          const angle =
            (i / chatbots.length) * 2 * Math.PI - Math.PI / 2;

          const nextIndex = (i + 1) % chatbots.length;
          const nextBot = chatbots[nextIndex];

          const nextAngle =
            (nextIndex / chatbots.length) * 2 * Math.PI -
            Math.PI / 2;

          const x1 = center + radius * Math.cos(angle);
          const y1 = center + radius * Math.sin(angle);

          const x2 = center + radius * Math.cos(nextAngle);
          const y2 = center + radius * Math.sin(nextAngle);

          const isActivePath = !bot.locked && !nextBot.locked;

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
              opacity={isActivePath ? 0.8 : 0.3}
            />
          );
        })}
      </svg>

      {chatbots.map((chatbot, i) => {
        const angle = (i / chatbots.length) * 2 * Math.PI - Math.PI / 2;
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
              "&:hover": {
                zIndex: 999,
              },
            }}
          >
            <Box
              onClick={() => {
                if (!chatbot.locked) {
                  navigate(`/dashboard/${chatbot.id}`);
                }
              }}
              sx={{
                width: { xs: "140px", sm: "160px", md: "150px" },
                height: { xs: "150px", sm: "160px", md: "200px" },
                borderRadius: "16px",
                p: { xs: 1, md: 2 },
                position: "relative",
                overflow: "hidden",
                cursor: chatbot.locked ? "default" : "pointer",
                background: chatbot.locked
                  ? "rgba(30, 41, 59, 0.4)"
                  : "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.7))",
                border: chatbot.locked
                  ? "1px solid rgba(148,163,184,0.3)"
                  : "1px solid rgba(99,102,241,0.4)",
                opacity: chatbot.locked ? 0.5 : 1,
                filter: chatbot.locked ? "grayscale(70%)" : "none",
                boxShadow: chatbot.locked
                  ? "none"
                  : "0 0 15px rgba(99,102,241,0.3)",
                transition: "0.3s",
                "&:hover": chatbot.locked
                  ? {}
                  : {
                      transform: "scale(1.08)",
                      boxShadow: "0 0 30px rgba(99,102,241,0.5)",
                    },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >

              
              <Box
                sx={{
                  p: { xs: 0.2, md: 0.5 },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #6366f1, #06b6d4, #22c55e)",
                }}
              >
                <Box
                  component="img"
                  src={chatbot.avatar}
                  alt={chatbot.name}
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
                {chatbot.name}
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.7rem",
                  textAlign: "center",
                }}
              >
                {chatbot.description}
              </Typography>

              {!chatbot.locked && (
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: "0.65rem",
                    color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.4)",
                    borderRadius: "999px",
                    px: 1,
                    py: "2px",
                  }}
                >
                  ACTIVE
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
      </>
  )
}

export default ListedBotsContent
