import { useQuery } from "@tanstack/react-query";

export const useLeaderboard = () => {
    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const token = localStorage.getItem("access_token");
            const res = await fetch("/api/leaderboard/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
        refetchOnMount: "always",
    });
};