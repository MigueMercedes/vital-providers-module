import { Insurance, ServiceProvider } from "@/lib/types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface InsurancesSectionProps {
  provider: ServiceProvider;
  insurances: Insurance[];
  onOpenModal: () => void;
}

export default function InsurancesSection({
  provider,
  insurances,
  onOpenModal,
}: InsurancesSectionProps) {
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
            Seguros Afiliados
          </Typography>
          <Button variant="contained" onClick={onOpenModal}>
            Agregar Seguro
          </Button>
        </Box>

        <Stack spacing={2}>
          {insurances
            .filter((insuranceItem) =>
              provider.affiliatedInsurances.includes(insuranceItem.id)
            )
            .map((insuranceItem) => (
              <Paper
                key={insuranceItem.id}
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
                      src={insuranceItem.src}
                      sx={{ width: 32, height: 32 }}
                    >
                      {insuranceItem.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {insuranceItem.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
  );
}
