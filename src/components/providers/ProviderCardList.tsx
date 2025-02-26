"use client";

import { ServiceProvider } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Props {
  providers: ServiceProvider[];
}

export default function ProviderCardList({ providers = [] }: Props) {
  return (
    <Grid container spacing={3}>
      {providers.length > 0 ? (
        providers.map((provider) => (
          <Grid item xs={12} sm={6} md={4} key={provider.id}>
            <Link
              href={`/providers/${provider.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 160,
                    ...(provider.src
                      ? {
                          backgroundImage: `url(${provider.src})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "primary.light",
                          color: "white",
                          fontSize: "64px",
                          fontWeight: "bold",
                        }),
                  }}
                >
                  {!provider.src && provider.name.charAt(0).toUpperCase()}
                </CardMedia>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {provider.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {provider.phone}
                      </Typography>
                    </Box>
                    <Chip
                      label={provider.status ? "Activo" : "Inactivo"}
                      color={provider.status ? "success" : "default"}
                      size="small"
                    />
                  </Box>

                  {/* Stats */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                          bgcolor: "grey.50",
                        }}
                      >
                        <Icon
                          icon="material-symbols:apartment"
                          style={{ fontSize: "24px", color: "#2196f3" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Sucursales
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {provider.totalBranches.active}/
                          {provider.totalBranches.total}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                          bgcolor: "grey.50",
                        }}
                      >
                        <Icon
                          icon="material-symbols:group"
                          style={{ fontSize: "24px", color: "#2196f3" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Doctores
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {provider.totalDoctors.active}/
                          {provider.totalDoctors.total}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                          bgcolor: "grey.50",
                        }}
                      >
                        <Icon
                          icon="material-symbols:health-and-safety"
                          style={{ fontSize: "24px", color: "#2196f3" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          ARS
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {provider.affiliatedArs.length}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#fce4ec",
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      <Icon
                        icon="material-symbols:medical-services"
                        style={{ fontSize: "18px", marginRight: "4px" }}
                      />
                      <Typography variant="caption" color="secondary.dark">
                        {provider.specialties.length} Especialidades
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#e3f2fd",
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      <Icon
                        icon="material-symbols:healing"
                        style={{ fontSize: "18px", marginRight: "4px" }}
                      />
                      <Typography variant="caption" color="info.dark">
                        {provider.procedures.length} Procedimientos
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="text.secondary">
            No se encontraron prestadores.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
