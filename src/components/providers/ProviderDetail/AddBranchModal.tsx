import { Branch } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema, BranchFormValues } from "@/lib/validations/branchSchema";
import { createBranch } from "@/lib/server/providers/actions";

interface AddBranchModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (branch: Branch) => void;
  providerId: string;
}

const paymentMethods = [
  "Efectivo",
  "Tarjeta de Crédito",
  "Tarjeta de Débito",
  "Transferencia",
  "Cheque",
];

const facilities = [
  "Estacionamiento",
  "WiFi",
  "Cafetería",
  "Farmacia",
  "Laboratorio",
  "Rayos X",
  "Acceso para discapacitados",
];

export default function AddBranchModal({
  open,
  onClose,
  onAdd,
  providerId,
}: AddBranchModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
      providerId,
      address: "",
      phone: "",
      openingTime: "08:00",
      closingTime: "18:00",
      paymentMethods: [],
      facilities: [],
      status: true,
    },
  });

  const handleReset = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: BranchFormValues) => {
    try {
      setIsSubmitting(true);
      // Format hours string
      const formattedBranch = {
        ...data,
        hours: `Lun-Vie: ${data.openingTime} - ${data.closingTime}`,
      };

      // Remove openingTime and closingTime from the object
      const { openingTime, closingTime, ...branchData } = formattedBranch;

      // Call server action to create branch
      const response = await createBranch(branchData);

      if (response?.data) {
        onAdd(response.data);
        handleReset();
      }
    } catch (error) {
      console.error("Error creating branch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 10,
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center">
          <Icon
            icon="material-symbols:apartment"
            style={{ marginRight: "12px", fontSize: "24px", color: "#3b82f6" }}
          />
          Agregar Nueva Sucursal
        </Box>
        <IconButton onClick={onClose} size="small">
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ px: 3, pb: 2 }}>
        Complete la información de la nueva sucursal.
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre de la Sucursal"
                    placeholder="Ej: Sede Principal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:business"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Teléfono"
                    placeholder="+1 (809) 555-0123"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:phone"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Dirección"
                    placeholder="Av. Principal #123"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:location-on"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="openingTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Hora de Apertura"
                    type="time"
                    error={!!errors.openingTime}
                    helperText={errors.openingTime?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:schedule"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      step: 300, // 5min
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="closingTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Hora de Cierre"
                    type="time"
                    error={!!errors.closingTime}
                    helperText={errors.closingTime?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:schedule"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      step: 300, // 5min
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="paymentMethods"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.paymentMethods}>
                    <InputLabel id="payment-methods-label">
                      Métodos de Pago
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="payment-methods-label"
                      multiple
                      input={<OutlinedInput label="Métodos de Pago" />}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:payments"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {paymentMethods.map((method) => (
                        <MenuItem key={method} value={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.paymentMethods && (
                      <FormHelperText>
                        {errors.paymentMethods.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="facilities"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.facilities}>
                    <InputLabel id="facilities-label">Facilidades</InputLabel>
                    <Select
                      {...field}
                      labelId="facilities-label"
                      multiple
                      input={<OutlinedInput label="Facilidades" />}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            icon="material-symbols:local-cafe"
                            style={{ color: "#3b82f6" }}
                          />
                        </InputAdornment>
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {facilities.map((facility) => (
                        <MenuItem key={facility} value={facility}>
                          {facility}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.facilities && (
                      <FormHelperText>
                        {errors.facilities.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            startIcon={<Icon icon="material-symbols:close" />}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<Icon icon="material-symbols:save" />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Sucursal"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
