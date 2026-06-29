import { useQuery } from "@tanstack/react-query";

export const useAdminCharacters = () => {
  return useQuery({
    queryKey: ["admin-characters"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      console.log("Fetching admin characters with token: ", token);
      const response = await fetch(
        "/api/admin/characters",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      return response.json();
    },
  });
};