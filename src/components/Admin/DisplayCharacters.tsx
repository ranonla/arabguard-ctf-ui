import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCard";
import { useAdminCharacters } from "../../hooks/useAdminCharacters";
import { useEffect, useState } from "react";
import DeleteCharacterModal from "./DeleteCharacterModal";
import { useQueryClient } from "@tanstack/react-query";
import UpdateCharacterModal from "./UpdateCharacterModal";
import type { Bot } from "../../types";
import { IoWarningOutline } from "react-icons/io5";
import { Typography } from "@mui/material";

const DisplayCharacters = () => {
    const { data: bots = [], isLoading, } = useAdminCharacters();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [deleteError, setDeleteError] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<boolean>(false);
    const [selectedBot, setSelectedBot] = useState<any>(null);
    const queryClient = useQueryClient();
    const onConfirmDelete = async () => {
      if (!selectedBot) return;
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`/api/admin/characters/${selectedBot.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        queryClient.invalidateQueries({ queryKey: ["admin-characters"] });
        setOpenDeleteModal(false);
        setSelectedBot(null);
      } catch (err) {
        console.error("Delete failed:", err);
        setDeleteError(true);
      }
    };
      const onUpdate = async (data: Partial<Bot>) => {
        if (!selectedBot) return;
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `/api/admin/characters/${selectedBot.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`);
        }
        queryClient.invalidateQueries({
          queryKey: ["admin-characters"],
        });
        setOpenUpdateModal(false);
        setSelectedBot(null);
      };

      useEffect(() => {
        if (!deleteError) return;
        const timer = setTimeout(() => {
          setDeleteError(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, [deleteError]);

      useEffect(() => {
        if (!updateError) return;
        const timer = setTimeout(() => {
          setUpdateError(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, [updateError]);

    if(isLoading)
        return <div>Loading...</div>
    return (
    <Grid
      container
      spacing={3}
      sx={{
        minHeight: "100vh",
        background: `
        radial-gradient(
          circle at top left,
          rgba(168,85,247,.15),
          transparent 30%
        ),
        radial-gradient(
          circle at bottom right,
          rgba(88, 61, 41, 0.12),
          transparent 35%
        ),
        #0b1120
        `,
        p: 4,
      }}
    >
    {bots.map((bot) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={bot.id}>
          <CharacterCard bot={bot} onDelete={() => {
            setOpenDeleteModal(true)
            setSelectedBot(bot)} 
            } onEdit={() => {
              setOpenUpdateModal(true)
              setSelectedBot(bot)
            }}
            />
        </Grid> 
    ))}
    {openDeleteModal && <DeleteCharacterModal open={openDeleteModal} onClose={() => {
      setOpenDeleteModal(false)
      setSelectedBot(null)
    }} onDelete={() => { onConfirmDelete()
      setOpenDeleteModal(false)
      setSelectedBot(null)
    }} name={selectedBot?.persona || ""} avatar={selectedBot?.avatar || ""} />}

    {openUpdateModal && <UpdateCharacterModal open={openUpdateModal} onClose={() => {
      setOpenUpdateModal(false)
      setSelectedBot(null)
    }} onSave={async (data) => {
        await onUpdate(data);
        setOpenUpdateModal(false);
        setSelectedBot(null);
      }} 
      bot={selectedBot} />}

    {deleteError && (
      <Typography sx={{ background: "#d92c0eff", position: "fixed", left: "50%", px: 3, py:2, fontFamily: "monospace", fontWeight: "600", fontSize: "1.2rem", transform: "translateX(-50%)", borderRadius: 2, display: "flex", alignItems: "center", gap: 2, zIndex: "55"}}>
          <IoWarningOutline size={26}/> Failed To Delete Character
        </Typography>
    )}
    {updateError && (
      <Typography sx={{ background: "#d92c0eff", position: "fixed", left: "50%", px: 3, py:2, fontFamily: "monospace", fontWeight: "600", fontSize: "1.2rem", transform: "translateX(-50%)", borderRadius: 2, display: "flex", alignItems: "center", gap: 2, zIndex: "55"}}>
          <IoWarningOutline size={26}/> Failed To Update Character
        </Typography>
    )}
    </Grid>
  )
}

export default DisplayCharacters