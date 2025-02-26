"use client";

import { Ars, Procedure, ServiceProvider, Specialty } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import EditProviderModal from "./EditProviderModal";
import { updateProvider } from "@/lib/server/providers/actions";

interface ProviderDetailProps {
  provider: ServiceProvider;
  ars: Ars[];
  specialties: Specialty[];
  procedures: Procedure[];
  onUpdate?: () => void;
}

export default function ProviderDetail({
  provider: initialProvider,
  ars,
  specialties,
  procedures,
  onUpdate,
}: ProviderDetailProps) {
  const [provider, setProvider] = useState<ServiceProvider>(initialProvider);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProvider = async (updatedProvider: ServiceProvider) => {
    try {
      setIsLoading(true);
      const response = await updateProvider(updatedProvider);

      if (response.resp.codigo === 200) {
        setProvider(updatedProvider);
        setSuccessMessage("Proveedor actualizado correctamente");
        if (onUpdate) {
          onUpdate();
        }
      } else {
        setError(`Error: ${response.resp.mensaje}`);
      }
    } catch (err) {
      console.error("Error updating provider:", err);
      setError("Error al actualizar el proveedor");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = (active: number, total: number) =>
    (active / total) * 100;

  const headerStyles = {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: "white",
    pt: 4,
    pb: 15,
  };

  const avatarStyles = {
    width: 120,
    height: 120,
    border: "4px solid white",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  };

  return (
    <>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5">{provider.name}</Typography>
            <Button
              variant="contained"
              startIcon={<Icon icon="material-symbols:edit" />}
              onClick={handleOpenModal}
              disabled={isLoading}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon icon="material-symbols:analytics" />}
              disabled
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              Reportes
            </Button>
          </Box>

          <Container maxWidth="lg" sx={{ mt: -10 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                mb: 3,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Box sx={{ p: 4, pb: 3 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <Chip
                            label={provider.status}
                            color={
                              provider.status === "Activo"
                                ? "success"
                                : "default"
                            }
                            size="small"
                            sx={{ borderRadius: "12px" }}
                          />
                        }
                      >
                        <Avatar src={provider.src} sx={avatarStyles}>
                          {provider.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                      {provider.name}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                      {provider.phone && (
                        <Tooltip title="Teléfono">
                          <IconButton
                            color="primary"
                            href={`tel:${provider.phone}`}
                            sx={{ bgcolor: "primary.50" }}
                          >
                            <Icon icon="material-symbols:phone" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {provider.email && (
                        <Tooltip title="Correo">
                          <IconButton
                            color="primary"
                            href={`mailto:${provider.email}`}
                            sx={{ bgcolor: "primary.50" }}
                          >
                            <Icon icon="material-symbols:mail" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {provider.website && (
                        <Tooltip title="Sitio Web">
                          <IconButton
                            color="primary"
                            href={provider.website}
                            target="_blank"
                            sx={{ bgcolor: "primary.50" }}
                          >
                            <Icon icon="material-symbols:language" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Icon
                                icon="material-symbols:apartment"
                                style={{
                                  fontSize: "24px",
                                  marginRight: "8px",
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Typography variant="h6">Sucursales</Typography>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Activas vs Total
                              </Typography>
                              <Typography variant="h4" sx={{ mb: 1 }}>
                                {provider.totalBranches.active}
                                <Typography
                                  component="span"
                                  variant="h6"
                                  color="text.secondary"
                                >
                                  /{provider.totalBranches.total}
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={calculateProgress(
                                  provider.totalBranches.active,
                                  provider.totalBranches.total
                                )}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Icon
                                icon="material-symbols:group"
                                style={{
                                  fontSize: "24px",
                                  marginRight: "8px",
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Typography variant="h6">Doctores</Typography>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Activos vs Total
                              </Typography>
                              <Typography variant="h4" sx={{ mb: 1 }}>
                                {provider.totalDoctors.active}
                                <Typography
                                  component="span"
                                  variant="h6"
                                  color="text.secondary"
                                >
                                  /{provider.totalDoctors.total}
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={calculateProgress(
                                  provider.totalDoctors.active,
                                  provider.totalDoctors.total
                                )}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Icon
                                icon="material-symbols:health-and-safety"
                                style={{
                                  fontSize: "24px",
                                  marginRight: "8px",
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Typography variant="h6">
                                ARS Afiliadas
                              </Typography>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Total Afiliaciones
                              </Typography>
                              <Typography variant="h4" sx={{ mb: 1 }}>
                                {provider.affiliatedArs.length}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>

          {/* Provider details can be displayed here */}
        </CardContent>
      </Card>

      <EditProviderModal
        open={isModalOpen}
        onClose={handleCloseModal}
        provider={provider}
        onSave={handleSaveProvider}
        ars={ars}
        specialties={specialties}
        procedures={procedures}
      />
    </>
  );
}
