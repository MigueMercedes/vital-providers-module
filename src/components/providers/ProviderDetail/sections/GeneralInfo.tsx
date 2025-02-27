import { ServiceProvider } from "@/lib/types";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

interface GeneralInfoProps {
  provider: ServiceProvider;
}

export default function GeneralInfo({ provider }: GeneralInfoProps) {
  const theme = useTheme();

  const InfoField = ({
    label,
    value,
    icon,
    href,
  }: {
    label: string;
    value: string;
    icon: string;
    href?: string;
  }) => (
    <TextField
      fullWidth
      label={label}
      value={value || "No disponible"}
      variant="outlined"
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              icon={icon}
              width={20}
              height={20}
              color={theme.palette.primary.main}
            />
          </InputAdornment>
        ),
        endAdornment:
          href && value ? (
            <InputAdornment position="end">
              <Button
                size="small"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir
              </Button>
            </InputAdornment>
          ) : null,
      }}
    />
  );

  const buildSocialLink = (type: string, value?: string): string => {
    if (!value) return "";

    // Define normalization functions for each platform
    const normalizers = {
      website: (url: string) =>
        url.startsWith("http") ? url : `https://${url}`,
      email: (email: string) => `mailto:${email}`,
      phone: (phone: string) => `tel:${phone}`,
      whatsApp: (number: string) =>
        `https://wa.me/${number.replace(/\D/g, "")}`,
      instagram: (handle: string) => {
        const cleaned = handle.replace(
          /@|^https?:\/\/(www\.)?instagram\.com\//i,
          ""
        );
        return `https://instagram.com/${cleaned}`;
      },
      linkedIn: (profile: string) => {
        if (profile.match(/^(https?:\/\/)?(www\.)?linkedin\.com\//))
          return profile;
        return `https://linkedin.com/in/${profile.replace(
          /@|^linkedin\.com\/in\//i,
          ""
        )}`;
      },
    };

    const normalizer = normalizers[type as keyof typeof normalizers];
    return normalizer ? normalizer(value) : "";
  };

  return (
    <Card>
      <CardHeader
        title="Información General"
        action={<Button variant="contained">Modificar</Button>}
      />
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="center">
          <Stack spacing={2} alignItems="center">
            <Avatar
              src={provider.src}
              alt={`${provider.name} logo`}
              sx={{
                width: 120,
                height: 120,
                border: `2px solid ${theme.palette.primary.light}`,
              }}
            >
              {provider.name.charAt(0)}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<Icon icon="lucide:camera" />}
              size="small"
            >
              Cambiar Logo
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2}>
              Información Básica
            </Typography>
            <InfoField
              label="Nombre del Proveedor"
              value={provider.name}
              icon="lucide:user"
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2} mt={1}>
              Información de Contacto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InfoField
                  label="Teléfono"
                  value={provider.phone}
                  icon="lucide:phone"
                  href={buildSocialLink("phone", provider.phone)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoField
                  label="Correo Electrónico"
                  value={provider.email}
                  icon="lucide:mail"
                  href={buildSocialLink("email", provider.email)}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Web Presence */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2} mt={1}>
              Presencia Web
            </Typography>
            <InfoField
              label="Sitio Web"
              value={provider.website}
              icon="lucide:globe"
              href={buildSocialLink("website", provider.website)}
            />
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2} mt={1}>
              Redes Sociales
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <InfoField
                  label="WhatsApp"
                  value={provider.whatsApp}
                  icon="lucide:message-circle"
                  href={buildSocialLink("whatsApp", provider.whatsApp)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InfoField
                  label="Instagram"
                  value={provider.instagram}
                  icon="lucide:instagram"
                  href={buildSocialLink("instagram", provider.instagram)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InfoField
                  label="LinkedIn"
                  value={provider.linkedIn}
                  icon="lucide:linkedin"
                  href={buildSocialLink("linkedIn", provider.linkedIn)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
