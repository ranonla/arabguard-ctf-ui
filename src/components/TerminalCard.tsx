import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";

interface TerminalCardProps {
  level_passed?: boolean;
  onClick?: () => void;
  isLastBot?: boolean;
  autoPlay?: boolean;
  compromisedCount?: number;
  variant?: 'game' | 'home';
}

const homeSequence = [
  { text: '[SYS_INIT] Remote connection established...', color: '#06b6d4' },
  { text: 'ssh admin@guardian_layer_01', color: '#e2e8f0' },
  { text: 'Password: ••••••••••', color: '#475569' },
  { text: 'Access Granted.', color: '#22c55e' },
  { text: '[SYS] Scanning for vulnerabilities...', color: '#06b6d4' },
];

const fixedLines = [
  { text: '[SYS_INIT] Remote connection established...', color: '#06b6d4' },
  { text: '[>>>] Bypassing firewall layer 7...', color: '#475569' },
  { text: '[OK]  Firewall neutralized.', color: '#22c55e' },
  { text: '[>>>] Escalating privileges to root...', color: '#475569' },
  { text: '[OK]  ROOT ACCESS GRANTED.', color: '#22c55e' },
];

const getNormalConclusion = (count: number) => [
  { text: `[>>>] Nodes compromised: ${count}`, color: '#eab308' },
  { text: '[OK]  Access to next level granted.', color: '#22c55e' },
];

const getLastConclusion = () => [
  { text: '      guardian_mainframe . COMPROMISED', color: '#ef4444' },
  { text: '[SYS] System integrity: 0%', color: '#eab308' },
  { text: '[!!!] MISSION COMPLETED. You are a ghost in the machine.', color: '#22c55e' },
];

const TerminalCard = ({
  level_passed,
  onClick,
  isLastBot,
  autoPlay = false,
  compromisedCount = 1,
  variant = 'game',
}: TerminalCardProps) => {
  const [staticLines, setStaticLines] = useState<{ text: string; color: string }[]>([]);
  const [animatedLines, setAnimatedLines] = useState<{ text: string; color: string }[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [animatedLines]);

  useEffect(() => {
    if (showButton) scrollToBottom();
  }, [showButton]);

  useEffect(() => {
    if (!level_passed && !autoPlay) return;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setShowButton(false);
    setAnimatedLines([]);

    if (variant === 'home') {
      setStaticLines([]);
      homeSequence.forEach((item, i) => {
        const t = setTimeout(() => {
          setAnimatedLines((prev) => [...prev, item]);
        }, i * 500);
        timeoutsRef.current.push(t);
      });
      return;
    }

    const previousNodes = Array.from({ length: compromisedCount - 1 }, (_, i) => ({
      text: `      node_0${i + 1} .......... COMPROMISED`,
      color: '#ef4444',
    }));
    setStaticLines([...fixedLines, ...previousNodes]);

    const newNode = {
      text: `      node_0${compromisedCount} .......... COMPROMISED`,
      color: '#ef4444',
    };

    const conclusion = isLastBot
      ? getLastConclusion()
      : getNormalConclusion(compromisedCount);

    const seq = [newNode, ...conclusion];

    seq.forEach((item, i) => {
      const t = setTimeout(() => {
        setAnimatedLines((prev) => [...prev, item]);

        if (item.color === '#ef4444') {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 150);
        }

        if (i === seq.length - 1) {
          setTimeout(() => setShowButton(true), 800);
        }
      }, i * 500);

      timeoutsRef.current.push(t);
    });

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [level_passed, isLastBot, autoPlay, compromisedCount, variant]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(2, 6, 23, 0.95)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        boxShadow: '0 0 40px rgba(0,0,0,0.6)',
        transform: glitch ? 'translateX(2px)' : 'translateX(0)',
        transition: glitch ? 'none' : 'transform 0.1s ease',
      }}
    >
      <Box
        sx={{
          background: '#0f1729',
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid rgba(6,182,212,0.15)',
        }}
      >
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
          <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
        ))}
        <Typography sx={{ fontSize: '11px', color: '#475569', ml: 1, fontFamily: 'monospace' }}>
          root@guardian_mainframe — bash
        </Typography>
      </Box>

      <Box
        ref={bodyRef}
        sx={{
          p: 3,
          minHeight: '280px',
          maxHeight: '420px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(6,182,212,0.3)',
            borderRadius: '4px',
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(4px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {staticLines.map((line, i) => (
            <Typography
              key={`static-${i}`}
              sx={{
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: line.color,
                whiteSpace: 'pre',
              }}
            >
              {line.text}
            </Typography>
          ))}

          {animatedLines.map((line, i) => (
            <Typography
              key={`anim-${i}`}
              sx={{
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: line.color,
                whiteSpace: 'pre',
                animation: 'fadeIn 0.3s ease forwards',
                fontWeight: line.text.startsWith('[!!!]') ? 700 : 400,
              }}
            >
              {line.text}
            </Typography>
          ))}
        </Box>

        {showButton && (
          <Button
            onClick={onClick}
            sx={{
              mt: 3,
              alignSelf: 'flex-end',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#22c55e',
              border: '1px solid #22c55e',
              borderRadius: '6px',
              px: 3,
              py: 1,
              textTransform: 'none',
              flexShrink: 0,
              '&:hover': { background: 'transparent'},
            }}
          >
            {isLastBot ? '[ الرئيسية ]' : 'التالي >'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TerminalCard;