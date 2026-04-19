import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const token = localStorage.getItem("access_token");

  if (token) {
    const decoded = jwtDecode(token) as {
      email: string;
      name: string;
    };
    console.log("Decoded JWT:", decoded);
  }

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const res = await fetch("http://localhost:8001/auth/google/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeResponse.code }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        console.log("Login Successful, Access Token:", data.access_token);
        const decoded = jwtDecode(data.access_token);
        setUser(decoded);
        navigate("/dashboard");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return login;
};