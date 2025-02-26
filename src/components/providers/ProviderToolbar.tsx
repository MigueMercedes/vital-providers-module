"use client";

import { Icon } from "@iconify/react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";

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
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        placeholder="Buscar proveedor..."
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
        onClick={onAddProvider}
      >
        Nuevo Proveedor
      </Button>
    </Stack>
  );
}
