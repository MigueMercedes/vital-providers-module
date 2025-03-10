"use client";

import { Icon } from "@iconify/react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CreateProviderModal from "./ProviderDetail/CreateProviderModal";

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  onAddProvider: () => void;
}

export default function ProviderToolbar({
  searchTerm,
  onSearch,
  onAddProvider,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <TextField
        fullWidth
        placeholder="Buscar Prestador..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="material-symbols:search" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="outlined"
        startIcon={<Icon icon="material-symbols:filter-list" />}
        sx={{ minWidth: 120 }}
        // onClick={}
        // TODO: Define what this button does
      >
        Filtros
      </Button>
      <Button
        variant="contained"
        startIcon={<Icon icon="material-symbols:add" />}
        sx={{ minWidth: 160 }}
        onClick={handleOpenModal}
      >
        Nuevo Prestador
      </Button>

      <CreateProviderModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onProviderCreated={() => {
          handleCloseModal();
          onAddProvider();
        }}
      />
    </Stack>
  );
}
