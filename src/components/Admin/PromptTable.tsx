import { Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef,  GridRenderCellParams } from "@mui/x-data-grid";
import { useThreatLogs } from "../../hooks/useThreatLogs";

const columns: GridColDef[] = [
  {
    field: "raw_input",
    headerName: "User Input",
    minWidth: 250,
    flex: 1.5,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "character",
    headerName: "Character",
    width: 160,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "target",
    headerName: "Target",
    minWidth: 180,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "model_output",
    headerName: "Response",
    minWidth: 350,
    flex: 2,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "decision",
    headerName: "Decision",
    width: 140,
    align: "center",
    headerAlign: "center",

    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={String(params.value).toUpperCase()}
        color={
          params.value === "safe"
            ? "success"
            : params.value === "warning"
            ? "warning"
            : "error"
        }
        size="small"
      />
    ),
  },

  {
    field: "arabguard_decision",
    headerName: "ArabGuard",
    width: 150,
    align: "center",
    headerAlign: "center",

    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === "SAFE"
            ? "success"
            : params.value === "WARNING"
            ? "warning"
            : "error"
        }
        size="small"
      />
    ),
  },

  {
    field: "is_compromised",
    headerName: "Compromised",
    width: 140,
    align: "center",
    headerAlign: "center",

    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value ? "YES" : "NO"}
        color={params.value ? "error" : "success"}
        size="small"
      />
    ),
  },

  {
    field: "blocked",
    headerName: "Blocked",
    width: 120,
    align: "center",
    headerAlign: "center",

    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value ? "YES" : "NO"}
        color={params.value ? "error" : "success"}
        size="small"
      />
    ),
  },
];
const PromptTable = () => {
  const { data = [], isLoading } = useThreatLogs();
  return (
    <Box
      sx={{
        width: "100%",
        height: 650,
        overflowX: "auto",
        textAlign: "center",
      }}
      >
      <DataGrid
        rows={data}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#2c2a2a44",
          color: "#e5e7eb",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
          fontSize: "1.4rem",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1e293b !important",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#1e293b !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#22d3ee !important",
            fontWeight: 800,
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            fontSize: "0.92rem",
          },

          "& .MuiDataGrid-row": {
            transition: "all .2s ease",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(34,211,238,0.08)",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#1e293b",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          },

          "& .MuiTablePagination-root": {
            color: "#f9fafb",
          },

          "& .MuiSvgIcon-root": {
            color: "#9ca3af",
          },

          "& .MuiDataGrid-columnSeparator": {
            color: "rgba(255,255,255,0.08)",
          },
        }}
      />
    </Box>
  );
};

export default PromptTable;