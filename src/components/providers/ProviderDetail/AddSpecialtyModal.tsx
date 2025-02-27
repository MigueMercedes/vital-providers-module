// SpecialtyModal.tsx
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
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Specialty } from "@/lib/types";

interface AddSpecialtyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (specialty: Omit<Specialty, "id">) => void;
}

export default function AddSpecialtyModal({
  open,
  onClose,
  onAdd,
}: AddSpecialtyModalProps) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number>(30);

  const handleSubmit = () => {
    onAdd({
      name,
      time: duration * 60000, // Convertir minutos a milisegundos
    });
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setName("");
    setDuration(30);
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
            icon="material-symbols:medical-services"
            style={{ marginRight: "12px", fontSize: "24px", color: "#6366f1" }}
          />
          Agregar Nueva Especialidad
        </Box>
        <IconButton onClick={onClose} size="small">
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ px: 3, pb: 2 }}>
        Complete la información de la nueva especialidad médica.
      </DialogContentText>
      <DialogContent sx={{ pt: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Nombre de la Especialidad"
            placeholder="Ej: Cardiología"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="material-symbols:stethoscope"
                    style={{ color: "#6366f1" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Duración de la Cita"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="material-symbols:timer-outline"
                      style={{ color: "#6366f1" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 1, width: "80px" }}
            >
              minutos
            </Typography>
          </Box>
        </Box>
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
          disabled={!name || duration <= 0}
          startIcon={<Icon icon="material-symbols:save" />}
        >
          Guardar Especialidad
        </Button>
      </DialogActions>
    </Dialog>
  );
}
