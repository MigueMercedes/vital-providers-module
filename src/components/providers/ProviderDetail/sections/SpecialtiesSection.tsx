import { ServiceProvider, Specialty } from "@/lib/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface SpecialtiesSectionProps {
  provider: ServiceProvider;
  specialties: Specialty[];
  onOpenModal: () => void;
}

export default function SpecialtiesSection({
  provider,
  specialties,
  onOpenModal,
}: SpecialtiesSectionProps) {
  return (
    <Card sx={{ flex: 1 }}>
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
          <Button variant="contained" onClick={onOpenModal}>
            Agregar Especialidad
          </Button>
        </Box>

        <Stack spacing={2}>
          {specialties
            .filter((specialty) => provider.specialties.includes(specialty.id))
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
                    <Typography variant="subtitle1" fontWeight="medium">
                      {specialty.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
  );
}
