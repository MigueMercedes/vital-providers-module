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
import InsurancesSection from "./sections/InsurancesSection";
import SpecialtiesSection from "./sections/SpecialtiesSection";
import AddInsuranceModal from "./AddInsuranceModal";
import AddSpecialtyModal from "./AddSpecialtyModal";

interface ProviderDetailProps {
  provider: ServiceProvider;
  insurances: Insurance[];
  specialties: Specialty[];
  procedures: Procedure[];
}

export default function ProviderDetail({
  provider: initialProvider,
  insurances,
  specialties,
  procedures,
}: ProviderDetailProps) {
  const [provider, setProvider] = useState<ServiceProvider>(initialProvider);
  const [currentTab, setCurrentTab] = useState<ProviderTab>("Branches");

  const handleTabChange = (_: React.SyntheticEvent, newValue: ProviderTab) => {
    setCurrentTab(newValue);
  };

  // Datos estadísticos para ejemplificar
  const statsData = {
    citas: { total: 1234, completadas: 856, enProceso: 245, canceladas: 133 },
  };

  return (
    <>
      <ProviderHeader provider={provider} />

      <Container
        maxWidth="lg"
        sx={{ mb: 5 }}
      >
        <ProviderMenuTabs
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        />

        {currentTab === "Dashboard" && (
          <DashboardTab
            provider={provider}
            statsData={statsData}
          />
        )}

        {currentTab === "General" && <GeneralInfo provider={provider} />}

        {currentTab === "Branches" && <BranchesSection provider={provider} />}

        {currentTab === "Insurances" && (
          <InsurancesSection
            insurances={insurances}
            provider={provider}
          />
        )}

        {currentTab === "Specialties" && (
          <SpecialtiesSection
            specialties={specialties}
            provider={provider}
          />
        )}
      </Container>
    </>
  );
}
