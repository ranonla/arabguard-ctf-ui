import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Mystats } from "../types";
import { useAuth } from "../hooks/useAuth";

type StatsContextType = {
  stats: Mystats;
  progress: number;
  nickname: string;
  isLoading: boolean;
};

const StatsContext = createContext<StatsContextType | null>(null);
export const StatsProvider = ({ children, }: { children: React.ReactNode }) => {
    console.log("StatsProvider rendered");
    const { user } = useAuth();
    const { data, isLoading } = useQuery({
        enabled: !!user,
        queryKey: ["my-stats", user?.email],
        queryFn: async () => {
            const token = localStorage.getItem("access_token");
            const res = await fetch("/api/leaderboard/me", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch stats");
            }
            return res.json();
        },
        refetchOnMount: "always",
        });
        console.log("Stats query data:", data);

    const stats: Mystats = {
        rank: data?.rank ?? 0,
        points: data?.points ?? 0,
        completed_levels: data?.last_completed_level ?? 0,
        total_levels: data?.total_characters ?? 0,
    };

    const progress =
        stats.total_levels > 0
            ? Math.min(
                (stats.completed_levels / stats.total_levels) * 100,
                100
            )
            : 0;
    
    const nickname =
        progress > 80
            ? "صيّاد الثغرات"
            : progress > 50
            ? "محلل الأنظمة"
            : "المتدرّب";

    return (
        <StatsContext.Provider
        value={{
            stats,
            progress,
            nickname,
            isLoading,
        }}
        >
        {children}
        </StatsContext.Provider>
    );
    };

    export const useStats = () => {
    const context = useContext(StatsContext);

    if (!context) {
        throw new Error(
        "useStats must be used within StatsProvider"
        );
    }

    return context;
};