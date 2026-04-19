import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<{ user: { email: string; name: string; photo: string } | null ; setUser: (user: any) => void; }>({ user: null, setUser: () => {} });
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<{ email: string; name: string; photo: string } | null >(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};