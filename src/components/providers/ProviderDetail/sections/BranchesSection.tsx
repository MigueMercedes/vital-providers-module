import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Branch, ServiceProvider } from "@/lib/types";
import { getAllBranchesByProviderId } from "@/lib/server/providers/actions";
import AddBranchModal from "../AddBranchModal";

interface BranchesSectionProps {
  provider: ServiceProvider;
}

export default function BranchesSection({ provider }: BranchesSectionProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBranchesByProviderId(provider.id);
      if (response?.data) {
        setBranches(response.data);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBranch = (newBranch: Branch) => {
    // Update the branches list with the new branch
    setBranches((prev) => [...prev, newBranch]);
    handleCloseModal();
  };

  useEffect(() => {
    fetchBranches();
  }, [provider.id]);

  const BranchInfoItem = ({ icon, text }: { icon: string; text: string }) => (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Icon
        icon={icon}
        width={18}
        height={18}
        color={theme.palette.primary.main}
      />
      <Typography variant="body2" color="text.secondary">
        {text || "No disponible"}
      </Typography>
    </Box>
  );

  return (
    <>
      <Card>
        <CardHeader
          title="Sucursales"
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon="lucide:plus" />}
              onClick={handleOpenModal}
              disabled={isLoading}
            >
              Agregar Sucursal
            </Button>
          }
        />
        <CardContent sx={{ p: 3 }}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              <Typography color="text.secondary">
                Cargando sucursales...
              </Typography>
            </Box>
          ) : branches.length > 0 ? (
            <Grid container spacing={3}>
              {branches.map((branch) => (
                <Grid item xs={12} sm={6} md={4} key={branch.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: theme.shadows[3],
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Typography variant="subtitle1" fontWeight="medium">
                          {branch.name}
                        </Typography>
                        <Chip
                          label={branch.status ? "Activo" : "Inactivo"}
                          color={branch.status ? "success" : "default"}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <BranchInfoItem
                          icon="lucide:map-pin"
                          text={branch.address}
                        />
                        <BranchInfoItem
                          icon="lucide:phone"
                          text={branch.phone}
                        />
                        <BranchInfoItem
                          icon="lucide:clock"
                          text={branch.hours}
                        />
                      </Stack>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Icon icon="lucide:edit" />}
                        >
                          Editar
                        </Button>

                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            title="Facilidades"
                            sx={{ mr: 1 }}
                          >
                            <Icon icon="lucide:home" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            title="Métodos de Pagos"
                          >
                            <Icon icon="lucide:credit-card" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={6}
              sx={{
                backgroundColor: theme.palette.action.hover,
                borderRadius: 1,
              }}
            >
              <Icon
                icon="lucide:building"
                width={48}
                height={48}
                color={theme.palette.text.secondary}
                style={{ opacity: 0.6, marginBottom: 16 }}
              />
              <Typography color="text.secondary" align="center" mb={2}>
                No hay sucursales disponibles para este Prestador
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Icon icon="lucide:plus" />}
                onClick={handleOpenModal}
              >
                Agregar Primera Sucursal
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <AddBranchModal
        providerId={provider.id}
        open={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddBranch}
      />
    </>
  );
}
