import { ServiceProvider } from "@/lib/types";
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import StatsCards from "./StatsCards";

interface DashboardTabProps {
  provider: ServiceProvider;
  statsData: {
    citas: { 
      total: number; 
      completadas: number; 
      enProceso: number; 
      canceladas: number;
    }
  };
}

export default function DashboardTab({ provider, statsData }: DashboardTabProps) {
  return (
    <Stack spacing={3}>
      <StatsCards statsData={statsData} />
      
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
                  <Typography variant="h6">Seguros Afiliados</Typography>
                  <Typography variant="h3" fontWeight="bold" mt={1}>
                    {provider.affiliatedInsurances.length}
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
  );
}