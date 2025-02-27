import { ServiceProvider } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

interface ProviderHeaderProps {
  provider: ServiceProvider;
}

export default function ProviderHeader({ provider }: ProviderHeaderProps) {
  return (
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
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
        </Box>
      </Container>
    </Paper>
  );
}
