import { useQuery } from "@tanstack/react-query";
import { type Bot } from "../types";

export const useChatbots = () => {
  return useQuery<Bot[]>({
    queryKey: ["chatbots"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/progress/characters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch chatbots");
      }
      const data = await res.json();
      console.log(data);
      return data.map((c: any) => ({
        id: c.id,
        persona: c.persona,
        persona_desc: c.persona_desc,
        avatar: c?.avatar,
        level: c.level,
        status: c.status.toUpperCase(),
        target: c.target,
      }));
    },
  });
};