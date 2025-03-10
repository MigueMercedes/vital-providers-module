import { createProvider } from "@/lib/server/providers/actions";
import { ServiceProvider } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CreateProviderModalProps {
  open: boolean;
  onClose: () => void;
  onProviderCreated: (provider: ServiceProvider) => void;
}

export default function CreateProviderModal({
  open,
  onClose,
  onProviderCreated,
}: CreateProviderModalProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
  });

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const newProvider: Omit<ServiceProvider, "id"> = {
        ...formData,
        src: "",
        whatsApp: "",
        instagram: "",
        linkedIn: "",
        status: "active",
        totalBranches: { active: 0, total: 0 },
        totalDoctors: { active: 0, total: 0 },
        affiliatedInsurances: [],
        specialties: [],
        procedures: [],
      };

      const response = await createProvider(newProvider);

      if (response.resp.codigo === 200) {
        toast.success("Prestador creado correctamente");
        onProviderCreated(response.data);
        onClose();
      } else {
        toast.error(`Error: ${response.resp.mensaje}`);
      }
    } catch (err) {
      console.error("Error creating provider:", err);
      toast.error("Error al crear el prestador");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon icon="lucide:plus-circle" width={24} />
          <Typography variant="h6">Crear Nuevo Prestador</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Prestador"
              value={formData.name}
              onChange={handleChange("name")}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="lucide:user"
                      width={20}
                      height={20}
                      color={theme.palette.primary.main}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              value={formData.phone}
              onChange={handleChange("phone")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="lucide:phone"
                      width={20}
                      height={20}
                      color={theme.palette.primary.main}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              value={formData.email}
              onChange={handleChange("email")}
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="lucide:mail"
                      width={20}
                      height={20}
                      color={theme.palette.primary.main}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sitio Web"
              value={formData.website}
              onChange={handleChange("website")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="lucide:globe"
                      width={20}
                      height={20}
                      color={theme.palette.primary.main}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.name}
        >
          Crear Prestador
        </Button>
      </DialogActions>
    </Dialog>
  );
} 