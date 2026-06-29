import { useMutation } from "@tanstack/react-query";

export const useCreateCharacter = () => {
  return useMutation({
    mutationFn: async (character: any) => {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        "/api/admin/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(character),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create character");
      }

      return response.json();
    },
  });
};