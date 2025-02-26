import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Autocomplete,
  Chip,
  Switch,
  FormControlLabel,
  IconButton,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Divider,
  Avatar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import { ServiceProvider, Ars, Specialty, Procedure } from "../../lib/types";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod schema for provider validation
const totalSchema = z.object({
  active: z.number().min(0, "No puede ser negativo"),
  total: z.number().min(0, "No puede ser negativo"),
});

const providerSchema = z.object({
  id: z.string(),
  src: z.string().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  whatsApp: z.string().optional(),
  email: z.string().email("Formato de correo inválido"),
  website: z
    .string()
    .url("Formato de URL inválido")
    .optional()
    .or(z.literal("")),
  linkedIn: z
    .string()
    .url("Formato de URL inválido")
    .optional()
    .or(z.literal("")),
  status: z.string(),
  totalBranches: totalSchema,
  totalDoctors: totalSchema,
  affiliatedArs: z.array(z.string()),
  specialties: z.array(z.string()),
  procedures: z.array(z.string()),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

interface EditProviderModalProps {
  open: boolean;
  onClose: () => void;
  provider: ServiceProvider;
  onSave: (provider: ServiceProvider) => void;
  ars: Ars[];
  specialties: Specialty[];
  procedures: Procedure[];
}

export default function EditProviderModal({
  open,
  onClose,
  provider,
  onSave,
  ars,
  specialties,
  procedures,
}: EditProviderModalProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Initialize react-hook-form
  const methods = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: provider,
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = methods;

  const handleNext = async () => {
    // Validate the current step
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: ProviderFormValues) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      // If we have a new avatar, we would process it here
      // For now, we'll just use the data directly

      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Error saving provider:", error);
      setServerError("Error al guardar los cambios");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);

      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setValue("src", imageUrl);
    }
  };

  // Helper function to determine which fields to validate for each step
  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0: // Basic Information
        return ["name", "status"];
      case 1: // Contact
        return ["phone", "email", "website", "whatsApp", "linkedIn"];
      case 2: // Specialties
        return ["specialties"];
      case 3: // ARS
        return ["affiliatedArs"];
      case 4: // Procedures
        return ["procedures"];
      case 5: // Branches
        return ["totalBranches.active", "totalBranches.total"];
      default:
        return [];
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const steps = [
    {
      label: "Información Básica",
      icon: "material-symbols:info",
      content: (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", position: "relative" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Controller
                    name="src"
                    control={control}
                    render={({ field }) => (
                      <Avatar
                        src={field.value}
                        sx={{
                          width: 120,
                          height: 120,
                          mx: "auto",
                          mb: 2,
                          border: `4px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {getValues("name")?.charAt(0) || ""}
                      </Avatar>
                    )}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      bgcolor: "background.paper",
                    }}
                    component="label"
                  >
                    <Icon icon="material-symbols:edit" />
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nombre del Proveedor"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value === "Activo"}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked ? "Activo" : "Inactivo"
                              )
                            }
                            color="success"
                          />
                        }
                        label={
                          <Typography
                            color={
                              getValues("status") === "Activo"
                                ? "success.main"
                                : "text.secondary"
                            }
                          >
                            {getValues("status")}
                          </Typography>
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Contacto",
      icon: "material-symbols:contact-phone",
      content: (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {[
              {
                field: "phone",
                label: "Teléfono",
                icon: "material-symbols:phone",
              },
              {
                field: "whatsApp",
                label: "WhatsApp",
                icon: "mdi:whatsapp",
              },
              {
                field: "email",
                label: "Correo Electrónico",
                icon: "material-symbols:mail",
              },
              {
                field: "website",
                label: "Sitio Web",
                icon: "material-symbols:language",
              },
              {
                field: "linkedIn",
                label: "LinkedIn",
                icon: "mdi:linkedin",
              },
            ].map((item) => (
              <Grid item xs={12} md={6} key={item.field}>
                <Controller
                  name={
                    item.field as
                      | "phone"
                      | "whatsApp"
                      | "email"
                      | "website"
                      | "linkedIn"
                  }
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={item.label}
                      variant="outlined"
                      error={!!errors[item.field as keyof typeof errors]}
                      helperText={
                        errors[item.field as keyof typeof errors]
                          ?.message as string
                      }
                      InputProps={{
                        startAdornment: (
                          <Icon
                            icon={item.icon}
                            style={{
                              marginRight: "8px",
                              color: theme.palette.primary.main,
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      label: "Especialidades",
      icon: "material-symbols:medical-services",
      content: (
        <Box sx={{ mt: 2 }}>
          <Controller
            name="specialties"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={specialties}
                getOptionLabel={(option) => option.name}
                value={specialties.filter((s) => field.value.includes(s.id))}
                onChange={(_, newValue) => {
                  field.onChange(newValue.map((v) => v.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Especialidades"
                    placeholder="Seleccionar especialidades"
                    error={!!errors.specialties}
                    helperText={errors.specialties?.message as string}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                      icon={<Icon icon="material-symbols:medical-services" />}
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Icon
                      icon="material-symbols:medical-services"
                      style={{
                        marginRight: "8px",
                        color: theme.palette.primary.main,
                      }}
                    />
                    {option.name}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: "auto" }}
                    >
                      {option.time / 60000} min
                    </Typography>
                  </Box>
                )}
              />
            )}
          />
        </Box>
      ),
    },
    {
      label: "ARS Afiliadas",
      icon: "material-symbols:health-and-safety",
      content: (
        <Box sx={{ mt: 2 }}>
          <Controller
            name="affiliatedArs"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={ars}
                getOptionLabel={(option) => option.name}
                value={ars.filter((a) => field.value.includes(a.id))}
                onChange={(_, newValue) => {
                  field.onChange(newValue.map((v) => v.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="ARS Afiliadas"
                    placeholder="Seleccionar ARS"
                    error={!!errors.affiliatedArs}
                    helperText={errors.affiliatedArs?.message as string}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                      avatar={
                        <Avatar src={option.src}>
                          {option.name.charAt(0)}
                        </Avatar>
                      }
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar
                      src={option.src}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    >
                      {option.name.charAt(0)}
                    </Avatar>
                    {option.name}
                  </Box>
                )}
              />
            )}
          />
        </Box>
      ),
    },
    {
      label: "Procedimientos",
      icon: "material-symbols:local-hospital",
      content: (
        <Box sx={{ mt: 2 }}>
          <Controller
            name="procedures"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={procedures}
                getOptionLabel={(option) => option.name}
                value={procedures.filter((p) => field.value.includes(p.id))}
                onChange={(_, newValue) => {
                  field.onChange(newValue.map((v) => v.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Procedimientos"
                    placeholder="Seleccionar procedimientos"
                    error={!!errors.procedures}
                    helperText={errors.procedures?.message as string}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                      icon={<Icon icon="material-symbols:local-hospital" />}
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Icon
                      icon="material-symbols:local-hospital"
                      style={{
                        marginRight: "8px",
                        color: theme.palette.primary.main,
                      }}
                    />
                    {option.name}
                  </Box>
                )}
              />
            )}
          />
        </Box>
      ),
    },
    {
      label: "Sucursales",
      icon: "material-symbols:apartment",
      content: (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Sucursales Activas
                  </Typography>
                  <Controller
                    name="totalBranches.active"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        error={!!errors.totalBranches?.active}
                        helperText={errors.totalBranches?.active?.message}
                        InputProps={{
                          startAdornment: (
                            <Icon
                              icon="material-symbols:apartment"
                              style={{
                                marginRight: "8px",
                                color: theme.palette.success.main,
                              }}
                            />
                          ),
                        }}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Total de Sucursales
                  </Typography>
                  <Controller
                    name="totalBranches.total"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        error={!!errors.totalBranches?.total}
                        helperText={errors.totalBranches?.total?.message}
                        InputProps={{
                          startAdornment: (
                            <Icon
                              icon="material-symbols:apartment"
                              style={{
                                marginRight: "8px",
                                color: theme.palette.primary.main,
                              }}
                            />
                          ),
                        }}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Icon
              icon="material-symbols:edit"
              style={{
                marginRight: "8px",
                fontSize: "24px",
                color: theme.palette.primary.main,
              }}
            />
            <Typography variant="h6">Editar Proveedor</Typography>
          </Box>
          <Box>
            <IconButton onClick={onClose} size="small">
              <Icon icon="material-symbols:close" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}

            <Box>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor:
                              activeStep === index
                                ? "primary.main"
                                : "grey.300",
                          }}
                        >
                          <Icon icon={step.icon} style={{ fontSize: "16px" }} />
                        </Avatar>
                      )}
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      {step.content}
                      <Box sx={{ mb: 2, mt: 3 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mr: 1 }}
                          disabled={index === steps.length - 1}
                        >
                          {index === steps.length - 1
                            ? "Finalizar"
                            : "Continuar"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Atrás
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => methods.reset(provider)}
              color="warning"
              startIcon={<Icon icon="material-symbols:refresh" />}
              sx={{ mr: "auto" }}
            >
              Restablecer
            </Button>
            <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Icon icon="material-symbols:save" />
                )
              }
              disabled={
                isSubmitting || !isValid || activeStep !== steps.length - 1
              }
            >
              Guardar Cambios
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
