import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Insurance } from "@/lib/types";

interface AddInsuranceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (Insurance: Omit<Insurance, "id">) => void;
}

export default function AddInsuranceModal({
  open,
  onClose,
  onAdd,
}: AddInsuranceModalProps) {
  const [name, setName] = useState("");
  const [coverage, setCoverage] = useState("Cobertura completa");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onAdd({
      name,
      src: logoPreview || "https://placehold.co/200x200?text=Seguro", // Using a placeholder image from the internet
    });
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setName("");
    setCoverage("Cobertura completa");
    setLogo(null);
    setLogoPreview("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
            icon="material-symbols:health-and-safety"
            style={{ marginRight: "12px", fontSize: "24px", color: "#10b981" }}
          />
          Agregar un seguro
        </Box>
        <IconButton onClick={onClose} size="small">
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ px: 3, pb: 2 }}>
        Ingrese los detalles de la aseguradora de salud.
      </DialogContentText>
      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                bgcolor: "background.default",
              }}
            >
              {logoPreview ? (
                <Box
                  component="img"
                  src={logoPreview}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Icon
                  icon="material-symbols:upload"
                  style={{ fontSize: "32px", color: "#9ca3af" }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Logo del Seguro
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                gutterBottom
              >
                Sube una imagen de al menos 200x200px
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="label"
                startIcon={<Icon icon="material-symbols:upload" />}
              >
                Subir Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </Button>
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Nombre del Seguro"
            placeholder="Ej: ARS Humano"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="material-symbols:local-hospital"
                    style={{ color: "#10b981" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Tipo de Cobertura"
            placeholder="Ej: Cobertura completa"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="material-symbols:shield-outline"
                    style={{ color: "#10b981" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="outlined"
          onClick={() => {
            handleReset();
            onClose();
          }}
          startIcon={<Icon icon="material-symbols:close" />}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!name}
          startIcon={<Icon icon="material-symbols:save" />}
        >
          Guardar Seguro
        </Button>
      </DialogActions>
    </Dialog>
  );
}
