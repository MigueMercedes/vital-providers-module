"use client";

import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ServiceProvider } from "../../lib/types";
import ProviderCardList from "./ProviderCardList";
import ProviderTableList from "./ProviderTableList";
import ProviderToolbar from "./ProviderToolbar";

interface ProvidersListProps {
  providers: ServiceProvider[];
}

export default function ProviderContainer({
  providers = [],
}: ProvidersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [view, setView] = useState<"card" | "table">("card");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const newFilteredProviders = providers.filter((provider) =>
      provider.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProviders(newFilteredProviders);
  };

  const handleAddProvider = () => {};

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProviderToolbar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onAddProvider={handleAddProvider}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
            <Tab label="Vista Tarjetas" value="card" />
            <Tab label="Vista Listado" value="table" />
            </Tabs>
        </Box>

        {view === "table" ? (
          <ProviderTableList providers={filteredProviders} />
        ) : (
          <ProviderCardList providers={filteredProviders} />
        )}
      </Container>
    </Box>
  );
}
