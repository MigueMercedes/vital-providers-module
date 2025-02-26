"use client";

import { Ars, Procedure, ServiceProvider, Specialty } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
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
  const [currentTab, setCurrentTab] = useState("general");

  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
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

  // Datos estadísticos para ejemplificar (normalmente vendrían del backend)
  const statsData = {
    citas: { total: 1234, completadas: 856, enProceso: 245, canceladas: 133 },
  };

  const calculateProgress = (active: number, total: number) =>
    total > 0 ? (active / total) * 100 : 0;

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

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          mb: 3,
          borderBottom: 1,
          borderColor: "divider",
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="text"
                color="inherit"
                startIcon={<Icon icon="lucide:chevron-left" />}
                href="/providers"
              >
                Volver
              </Button>
              <Box display="flex" alignItems="center">
                <Avatar src={provider.src} sx={{ width: 40, height: 40 }}>
                  {provider.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" fontWeight="bold" ml={1.5}>
                  {provider.name}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Icon icon="lucide:user-cog" />}
              onClick={handleOpenModal}
              disabled={isLoading}
            >
              Administrar
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                minHeight: 48,
                py: 1,
              },
            }}
          >
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <Icon icon="lucide:file-text" style={{ marginRight: 8 }} />
                  General
                </Box>
              }
              value="general"
            />
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <Icon icon="lucide:settings" style={{ marginRight: 8 }} />
                  Configuraciones
                </Box>
              }
              value="settings"
            />
          </Tabs>
        </Box>

        {/* General Tab Content */}
        {currentTab === "general" && (
          <Stack spacing={3}>
            {/* Stats Overview */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <Icon icon="lucide:calendar" fontSize={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Citas Totales
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {statsData.citas.total.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: "success.light",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <Icon icon="lucide:check-circle-2" fontSize={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Completadas
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {statsData.citas.completadas.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: "warning.light",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <Icon icon="lucide:clock-3" fontSize={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          En Proceso
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {statsData.citas.enProceso.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: "error.light",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <Icon icon="lucide:x-circle" fontSize={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Canceladas
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {statsData.citas.canceladas.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Additional Stats */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="h6">Especialidades</Typography>
                        <Typography variant="h3" fontWeight="bold" mt={1}>
                          {provider.specialties.length}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: "purple.light",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Icon icon="lucide:stethoscope" fontSize={24} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="h6">Sucursales</Typography>
                        <Typography variant="h3" fontWeight="bold" mt={1}>
                          {provider.totalBranches.total}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Icon icon="lucide:building-2" fontSize={24} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="h6">ARS Afiliadas</Typography>
                        <Typography variant="h3" fontWeight="bold" mt={1}>
                          {provider.affiliatedArs.length}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: "success.light",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Icon icon="lucide:shield" fontSize={24} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        )}

        {/* Settings Tab Content */}
        {currentTab === "settings" && (
          <Stack spacing={3}>
            {/* Información General */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Información General
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="body2" mb={1}>
                          Logo del Proveedor
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            src={provider.src}
                            sx={{ width: 80, height: 80 }}
                          >
                            {provider.name.charAt(0)}
                          </Avatar>
                          <Button variant="outlined">Cambiar Logo</Button>
                        </Box>
                      </Box>

                      <TextField
                        fullWidth
                        label="Nombre del Proveedor"
                        value={provider.name}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Teléfono"
                        value={provider.phone}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon icon="lucide:phone" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        value={provider.email}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon icon="lucide:mail" />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Sitio Web"
                        value={provider.website}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon icon="lucide:globe" />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box>
                        <Typography variant="body2" mb={1}>
                          Redes Sociales
                        </Typography>
                        <Stack spacing={2}>
                          <TextField
                            fullWidth
                            label="WhatsApp"
                            value={provider.whatsApp}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Icon icon="lucide:apple" />
                                </InputAdornment>
                              ),
                            }}
                          />

                          <TextField
                            fullWidth
                            label="LinkedIn"
                            value={provider.linkedIn}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Icon icon="lucide:linkedin" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Especialidades y ARS */}
            <Grid container spacing={3}>
              {/* Especialidades */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        Especialidades
                      </Typography>
                      <Button variant="contained" onClick={handleOpenModal}>
                        Agregar Especialidad
                      </Button>
                    </Box>

                    <Stack spacing={2}>
                      {specialties
                        .filter((specialty) =>
                          provider.specialties.includes(specialty.id)
                        )
                        .map((specialty) => (
                          <Paper
                            key={specialty.id}
                            variant="outlined"
                            sx={{ p: 2, bgcolor: "grey.50" }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="medium"
                                >
                                  {specialty.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Tiempo de cita: {specialty.time / 60000} min
                                </Typography>
                              </Box>
                              <Button variant="outlined" size="small">
                                Editar
                              </Button>
                            </Box>
                          </Paper>
                        ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* ARS Afiliadas */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        ARS Afiliadas
                      </Typography>
                      <Button variant="contained" onClick={handleOpenModal}>
                        Agregar ARS
                      </Button>
                    </Box>

                    <Stack spacing={2}>
                      {ars
                        .filter((arsItem) =>
                          provider.affiliatedArs.includes(arsItem.id)
                        )
                        .map((arsItem) => (
                          <Paper
                            key={arsItem.id}
                            variant="outlined"
                            sx={{ p: 2, bgcolor: "grey.50" }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                  src={arsItem.src}
                                  sx={{ width: 32, height: 32 }}
                                >
                                  {arsItem.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight="medium"
                                  >
                                    {arsItem.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Cobertura completa
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip
                                label="Activo"
                                color="success"
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Paper>
                        ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Sucursales */}
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Sucursales
                  </Typography>
                  <Button variant="contained" onClick={handleOpenModal}>
                    Agregar Sucursal
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {Array.from({ length: provider.totalBranches.total }).map(
                    (_, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight="medium"
                              >
                                {provider.name} - Sede {index + 1}
                              </Typography>
                              <Chip
                                label={
                                  index < provider.totalBranches.active
                                    ? "Activo"
                                    : "Inactivo"
                                }
                                color={
                                  index < provider.totalBranches.active
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                                variant="outlined"
                              />
                            </Box>

                            <Stack spacing={1.5} sx={{ mb: 3 }}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Icon icon="lucide:map-pin" fontSize={16} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Av. Principal #{index + 100}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Icon icon="lucide:phone" fontSize={16} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {provider.phone}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Icon icon="lucide:clock" fontSize={16} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Lun-Vie: 8:00 AM - 6:00 PM
                                </Typography>
                              </Box>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                              <Button variant="outlined" size="small">
                                Editar
                              </Button>
                              <Button variant="outlined" size="small">
                                Facilidades
                              </Button>
                              <Button variant="outlined" size="small">
                                Métodos de Pago
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Container>

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
