import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface StatsCardsProps {
  statsData: {
    citas: { 
      total: number; 
      completadas: number; 
      enProceso: number; 
      canceladas: number;
    }
  };
}

export default function StatsCards({ statsData }: StatsCardsProps) {
  return (
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
  );
}