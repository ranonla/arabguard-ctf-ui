import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<boolean>(false);
  const token = localStorage.getItem("access_token");

  if (token) {
    try {
      const decoded = jwtDecode(token) as {
        user_id: string;
        name: string;
        role: string,
        photo: string,
      };
      console.log(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("access_token");
    }
  }

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try{
        const res = await fetch("/api/auth/google/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });

        if (res.ok) {
          const data = await res.json();
          queryClient.clear();
          localStorage.setItem("access_token", data.access_token);
          console.log("Login Successful, Access Token:", data.access_token);
          const decoded = jwtDecode(data.access_token) as {
            user_id: string,
            name: string,
            role: string,
            photo: string,
          };
          setUser(decoded);
          if (decoded.role=="user"){
            queryClient.invalidateQueries({ queryKey: ["my-stats"] });
            navigate("/dashboard");
          }
          else if(decoded.role=="admin") navigate("/adminPanel");
        }
      }catch(err){
        console.error(err);
        setError(true);
      }
    },
    onError: () => {
      console.error("Login Failed");
      setError(true);
    },
  });
  return { login, error, setError };
};