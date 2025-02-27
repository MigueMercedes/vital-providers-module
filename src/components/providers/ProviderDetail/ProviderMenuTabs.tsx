import { Icon } from "@iconify/react";
import { Box, Tab, Tabs, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export type ProviderTab =
  | "Dashboard"
  | "General"
  | "Branches"
  | "Specialties"
  | "Insurances";

interface MenuTab {
  label: string;
  value: ProviderTab;
  icon: string;
}

interface ProviderMenuTabsProps {
  currentTab: ProviderTab;
  handleTabChange: (event: React.SyntheticEvent, newValue: ProviderTab) => void;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 64,
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
  },
  "&.Mui-selected": {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
}));

const AnimatedIcon = styled(Icon)(({ theme }) => ({
  marginRight: 8,
  transition: "all 0.3s ease",
  ".Mui-selected &": {
    transform: "scale(1.2)",
  },
}));

const menuTabs: MenuTab[] = [
  { label: "Dashboard", value: "Dashboard", icon: "lucide:layout-dashboard" },
  { label: "General", value: "General", icon: "lucide:info" },
  { label: "Sucursales", value: "Branches", icon: "lucide:map-pin" },
  { label: "Especialidades", value: "Specialties", icon: "lucide:stethoscope" },
  { label: "Seguros", value: "Insurances", icon: "lucide:shield" },
];

export default function ProviderMenuTabs({
  currentTab,
  handleTabChange,
}: ProviderMenuTabsProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        mb: 1,
        borderRadius: 1,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        allowScrollButtonsMobile
        sx={{ bgcolor: "background.paper" }}
        variant={!isDesktop ? "scrollable" : "fullWidth"}
      >
        {menuTabs.map((tab) => (
          <StyledTab
            key={tab.value}
            label={
              <Box display="flex" alignItems="center">
                <AnimatedIcon
                  icon={tab.icon}
                  color={
                    currentTab === tab.value
                      ? theme.palette.primary.main
                      : "inherit"
                  }
                  width={20}
                  height={20}
                />
                {tab.label}
              </Box>
            }
            value={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
}
