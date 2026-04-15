import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = () => {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Authorization code:", codeResponse.code);

      await fetch("http://localhost:8081/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeResponse.code }),
      });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return login;
};