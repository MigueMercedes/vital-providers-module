"use client";

import { ServiceProvider } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Props {
  providers: ServiceProvider[];
}

export default function ProviderTableList({ providers = [] }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Sucursales</TableCell>
            <TableCell align="center">Doctores</TableCell>
            <TableCell align="center">Seguros</TableCell>
            <TableCell align="center">Especialidades</TableCell>
            <TableCell align="center">Procedimientos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.length > 0 ? (
            providers.map((provider) => (
              <TableRow
                key={provider.id}
                hover
                sx={{
                  "&:hover": { cursor: "pointer" },
                  "& td": { borderBottom: 1, borderColor: "divider" },
                }}
                component={Link}
                href={`/providers/${provider.id}`}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {provider.src ? (
                      <Box
                        component="img"
                        src={provider.src}
                        alt={provider.name}
                        sx={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: "divider",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "8px",
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        {provider.name.charAt(0).toUpperCase()}
                      </Box>
                    )}
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {provider.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        ID: {provider.id.slice(0, 8)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={provider.status ? "Activo" : "Inactivo"}
                    color={provider.status ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Icon
                      icon="material-symbols:apartment"
                      style={{ fontSize: "20px", color: "#2196f3" }}
                    />
                    {provider.totalBranches.active}/
                    {provider.totalBranches.total}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Icon
                      icon="material-symbols:group"
                      style={{ fontSize: "20px", color: "#2196f3" }}
                    />
                    {provider.totalDoctors.active}/{provider.totalDoctors.total}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Icon
                      icon="material-symbols:health-and-safety"
                      style={{ fontSize: "20px", color: "#2196f3" }}
                    />
                    {provider.affiliatedInsurances.length}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={provider.specialties.length}
                    size="small"
                    color="secondary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={provider.procedures.length}
                    size="small"
                    color="info"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant="h6" align="center" color="text.secondary">
                  No se encontraron prestadores.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
