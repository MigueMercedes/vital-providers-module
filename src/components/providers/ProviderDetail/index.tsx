"use client";

import { updateProvider } from "@/lib/server/providers/actions";
import { Insurance, Procedure, ServiceProvider, Specialty } from "@/lib/types";
import { Container } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import DashboardTab from "./DashboardTab";
import ProviderHeader from "./ProviderHeader";
import ProviderMenuTabs, { ProviderTab } from "./ProviderMenuTabs";
import BranchesSection from "./sections/BranchesSection";
import GeneralInfo from "./sections/GeneralInfo";

interface ProviderDetailProps {
  provider: ServiceProvider;
  insurances: Insurance[];
  specialties: Specialty[];
  procedures: Procedure[];
}

export default function ProviderDetail({
  provider: initialProvider,
}: ProviderDetailProps) {
  const [provider, setProvider] = useState<ServiceProvider>(initialProvider);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<ProviderTab>("Branches");

  const handleTabChange = (_: React.SyntheticEvent, newValue: ProviderTab) => {
    setCurrentTab(newValue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProvider = async (updatedProvider: ServiceProvider) => {
    try {
      const response = await updateProvider(updatedProvider);

      if (response.resp.codigo === 200) {
        setProvider(updatedProvider);
        toast.success("Proveedor actualizado correctamente");
      } else {
        toast.error(`Error: ${response.resp.mensaje}`);
      }
    } catch (err) {
      console.error("Error updating provider:", err);
      toast.error("Error al actualizar el proveedor");
    }
  };

  // Datos estadísticos para ejemplificar
  const statsData = {
    citas: { total: 1234, completadas: 856, enProceso: 245, canceladas: 133 },
  };

  return (
    <>
      <ProviderHeader provider={provider} />

      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <ProviderMenuTabs
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        />

        {currentTab === "Dashboard" && (
          <DashboardTab provider={provider} statsData={statsData} />
        )}

        {currentTab === "General" && <GeneralInfo provider={provider} />}

        {currentTab === "Branches" && <BranchesSection provider={provider} />}

        {currentTab === "Insurances" && <div>Seguros Information</div>}

        {currentTab === "Specialties" && <div>Specialties Information</div>}
      </Container>
    </>
  );
}
