import { Box, Typography, Button, keyframes } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { IoTerminalOutline, IoPulseOutline } from "react-icons/io5";
import am_othman from "../../assets/am_othman.jpg";
import { useGoogleAuth } from "./../../hooks/oauth";

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const scrollUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
`;
const typingDots = keyframes`
  0%, 80%, 100% { opacity: 0.2; transform: scale(1); }
  40% { opacity: 1; transform: scale(1.3); }
`;

const GuardianHero = () => {
  const [showText, setShowText] = useState(false);
  const oauth = useGoogleAuth();

useEffect(() => {
  const timer = setTimeout(() => {
    setShowText(true);
  }, 3000);

  return () => clearTimeout(timer);
}, []);
  return (
    <Box
      sx={{
        height: "auto",
        background: "#020617",
        backgroundImage: `
          linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: { xs: 2, sm: 5, md: 8 },
        py: { xs: 2, sm: 5, md: 6 },
        overflow: "hidden",
        position: "relative",
        color: "#fff",
      }}
    >
      {[...Array(10)].map((_, i) => (
        <Typography
          key={i}
          sx={{
            position: "absolute",
            bottom: -20,
            left: `${Math.random() * 100}%`,
            color: "#06b6d4",
            fontSize: "0.8rem",
            opacity: 0,
            fontFamily: "monospace",
            pointerEvents: "none",
            animation: `${float} ${5 + Math.random() * 10}s infinite linear`,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 1,
          }}
        >
          {Math.random() > 0.5 ? "0101" : "11001"}
        </Typography>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, zIndex: 5, alignItems: "center", px: { xs: 2, sm: 5, md: 10 }, flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 4 }, mb: { xs: 4, md: 12 } }}>
        
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "200px", md: "280px" },
            background: "rgba(2, 6, 23, 0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            borderRadius: "8px",
            p: 3,
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
          </Box>

          <Typography sx={{ color: "#06b6d4", fontSize: "0.85rem", mb: 1, opacity: 0.8 }}>
            [SYS_INIT] Remote connection established...
          </Typography>
          
          <TypeAnimation
            sequence={[
              "ssh admin@guardian_node_01\n", 100,
              "ssh admin@guardian_node_01\nPassword: ••••••••••\n", 100,
              "ssh admin@guardian_node_01\nPassword: ••••••••••\nAccess Granted.\n", 100,
              "ssh admin@guardian_node_01\nPassword: ••••••••••\nAccess Granted.\nScanning for vulnerabilities...",
            ]}
            speed={70}
            style={{ whiteSpace: "pre-line", display: "block", color: "#94a3b8", fontSize: "0.95rem" }}
            repeat={0} cursor={false}
          />
        
        </Box>

        <Box sx={{ width: { xs: "100%", md: "30%" }, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: { xs: 1, md: 2 } }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

            <Typography sx={{ color: "#6366f1", fontWeight: "bold", letterSpacing: 1, fontSize: "1rem" }}>
              AM_OTHMAN
            </Typography>

            <Box sx={{ position: 'relative' }}>
               <Box
                component="img"
                src={am_othman}
                alt="AM_OTHMAN"
                sx={{
                  width: { xs: 40, md: 60 },
                  height: { xs: 40, md: 60 },
                  borderRadius: "50%",
                }}
              />
               <Box sx={{ position: 'absolute', top: 0, right: 3, width: { xs: 5, md: 8 }, height: { xs: 5, md: 8 }, bgcolor: '#22c55e', borderRadius: '50%', border: '2px solid #020617' }} />
            </Box>

          </Box>

          <Box
            sx={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(2, 6, 23, 0.95))",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: "12px 0px 12px 12px",
              p: 2,
              maxWidth: "280px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            {!showText ? (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#e2e8f0",
                      animation: `${typingDots} 1.2s infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </Box>
            ) : (
              <TypeAnimation
                sequence={["You won't find that easy..."]}
                speed={50}
                cursor={true}
                repeat={0}
                style={{
                  color: "#e2e8f0",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                }}
              />
            )}
          </Box>

        </Box>
      </Box>

      <Box sx={{ textAlign: "center", zIndex: 10, mb: { xs: 4, md: 8 } }}>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 6,
            mb: 2,
            background: "linear-gradient(90deg, #fff 0%, #06b6d4 50%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 15px rgba(99, 102, 241, 0.3))",
          }}
        >
          Can you break our guardians?
        </Typography>

        <Typography sx={{ color: "#94a3b8", mb: 4, fontSize: "1.1rem", maxWidth: "600px", mx: "auto" }}>
          Decrypt the noise, bypass the firewalls, and secure the flag.
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: { xs: 3, sm: 5, md: 8 },
            py: 2,
            background: "linear-gradient(45deg, #6366f1, #06b6d4)",
            fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.5rem" },
            fontWeight: "bold",
            borderRadius: "0px",
            clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
          }}
          onClick={() => oauth()}
        >
          START CHALLENGE
        </Button>

      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 5, mb: {xs: 2, md: 0} }}>
        
        <Box sx={{ width: "280px", opacity: 0.8 }}>

          <Typography sx={{ fontSize: "0.7rem", color: "#06b6d4", mb: 1, display: "flex", alignItems: "center", gap: 1, letterSpacing: 1 }}>
            <IoTerminalOutline /> LIVE_SECURITY_LOGS
          </Typography>

          <Box sx={{ 
            height: "50px", 
            overflow: "hidden", 
            fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" }, 
            fontFamily: "monospace", 
            color: "#64748b",
            borderLeft: "2px solid #06b6d4",
            pl: 1
          }}>
            <Box sx={{ animation: `${scrollUp} 15s infinite linear` }}>
              [NOTICE] Port 8080 sniffed...<br />
              [WARN] Brute force detected from 192.x.x.x<br />
              [FAIL] SQLi attempt blocked...<br />
              [OK] Heartbeat pulse stable...<br />
              [NOTICE] New session: 0x882...<br />
              [WARN] Payload detected in headers...<br />
              [NOTICE] Port 8080 sniffed...<br />
              [WARN] Brute force detected from 192.x.x.x<br />
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end", color: "#22c55e" }}>
            <Box sx={{ width: 8, height: 8, bgcolor: "#22c55e", borderRadius: "50%", animation: `${blink} 1s infinite` }} />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", letterSpacing: 1, whiteSpace: "nowrap" }}>SYSTEM ONLINE</Typography>
            <IoPulseOutline />
          </Box>
          <Typography sx={{ color: "#475569", fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" }, mt: 0.5 }}>
            NODES: 14 | ACTIVE_HACKERS: 1,024
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "40px",
          background: "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.05), transparent)",
          zIndex: 20,
          pointerEvents: "none",
          animation: `${scanline} 6s linear infinite`,
        }}
      />
    </Box>
  );
};

export default GuardianHero;