"use client";

import { Icon } from "@iconify/react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 450,
  margin: "auto",
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
}));

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
        <Icon
          icon="material-symbols:error-outline"
          style={{ fontSize: "48px", color: "#f44336" }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Oops! Algo salió mal
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          paragraph
        >
          Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido
          notificado y estamos trabajando para solucionarlo.
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" align="center" paragraph>
          Error: {error.message}
        </Typography> */}

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={reset}
            size="large"
          >
            Intentar de nuevo
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}
