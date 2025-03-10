import { updateProvider } from "@/lib/server/providers/actions";
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
import { useState } from "react";
import { toast } from "react-hot-toast";

interface GeneralInfoProps {
  provider: ServiceProvider;
}

export default function GeneralInfo({ provider: initialProvider }: GeneralInfoProps) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState<ServiceProvider>(initialProvider);

  const InfoField = ({
    label,
    value,
    icon,
    href,
    field,
    onChange,
  }: {
    label: string;
    value: string;
    icon: string;
    href?: string;
    field?: keyof ServiceProvider;
    onChange?: (value: string) => void;
  }) => (
    <TextField
      fullWidth
      label={label}
      value={value || ""}
      variant="outlined"
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        readOnly: !isEditing,
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
          href && value && !isEditing ? (
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

  const handleSave = async () => {
    try {
      const response = await updateProvider(provider);

      if (response.resp.codigo === 200) {
        setIsEditing(false);
        toast.success("Prestador actualizado correctamente");
      } else {
        toast.error(`Error: ${response.resp.mensaje}`);
      }
    } catch (err) {
      console.error("Error updating provider:", err);
      toast.error("Error al actualizar el Prestador");
    }
  };

  const handleCancel = () => {
    setProvider(initialProvider);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader
        title="Información General"
        action={
          isEditing ? (
            <Box>
              <Button variant="outlined" onClick={handleCancel} sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Guardar
              </Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Modificar
            </Button>
          )
        }
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
            {isEditing && (
              <Button
                variant="outlined"
                startIcon={<Icon icon="lucide:camera" />}
                size="small"
              >
                Cambiar Logo
              </Button>
            )}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2}>
              Información Básica
            </Typography>
            <InfoField
              label="Nombre del Prestador"
              value={provider.name}
              icon="lucide:user"
              field="name"
              onChange={(value) => setProvider({ ...provider, name: value })}
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
                  field="phone"
                  onChange={(value) => setProvider({ ...provider, phone: value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoField
                  label="Correo Electrónico"
                  value={provider.email}
                  icon="lucide:mail"
                  href={buildSocialLink("email", provider.email)}
                  field="email"
                  onChange={(value) => setProvider({ ...provider, email: value })}
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
              field="website"
              onChange={(value) => setProvider({ ...provider, website: value })}
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
                  field="whatsApp"
                  onChange={(value) => setProvider({ ...provider, whatsApp: value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InfoField
                  label="Instagram"
                  value={provider.instagram}
                  icon="lucide:instagram"
                  href={buildSocialLink("instagram", provider.instagram)}
                  field="instagram"
                  onChange={(value) => setProvider({ ...provider, instagram: value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InfoField
                  label="LinkedIn"
                  value={provider.linkedIn}
                  icon="lucide:linkedin"
                  href={buildSocialLink("linkedIn", provider.linkedIn)}
                  field="linkedIn"
                  onChange={(value) => setProvider({ ...provider, linkedIn: value })}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
