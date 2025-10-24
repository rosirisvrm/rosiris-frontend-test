import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface TabConfig {
  label: string;
  path: string;
}

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: TabConfig[] = [
    { label: 'Dispositivos', path: '/devices' },
    { label: 'Personajes', path: '/characters' },
  ];

  const currentTab = tabs.findIndex(tab => location.pathname === tab.path);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    console.log('event :', event);
    navigate(tabs[newValue].path);
  };

  // Si estamos en welcome, no mostrar tabs
  if (location.pathname === '/welcome') {
    return null;
  }

  return (
    <Tabs
      value={currentTab >= 0 ? currentTab : 0}
      onChange={handleChange}
      sx={{
        mb: 3,
        '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};
