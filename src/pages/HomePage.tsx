import Navbar from '../components/home/Navbar';
import GuardianHero from '../components/home/GuardianHero';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { IoWarningOutline } from "react-icons/io5";
import { Typography } from '@mui/material';
import { useEffect } from 'react';

const Home = () => {
  const googleAuth = useGoogleAuth();
  useEffect(() => {
    if (googleAuth.error) {
      const timer = setTimeout(() => {
        googleAuth.setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [googleAuth.error]);
  
  return (
    <>
      {googleAuth.error && (
        <Typography sx={{ background: "#d92c0eff", position: "fixed", left: "50%", px: 5, py:2.5 , fontFamily: "monospace", fontWeight: "600", fontSize: "1.2rem", transform: "translateX(-50%)", borderRadius: 2, display: "flex", alignItems: "center", gap: 2, zIndex: "55"}}>
          <IoWarningOutline size={26}/> Failed To login
        </Typography>
      )}
      <Navbar />
      <GuardianHero googleAuth={googleAuth} />
    </>
  )
}

export default Home;