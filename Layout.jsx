import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import CalculatorScreen from './src/components/screens/calculator/Calculator';
import themes from './src/theme/theme';

function Layout() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <ThemeProvider
      theme={themes[theme]}
    >
      <CalculatorScreen />
    </ThemeProvider>
  );
}

export default Layout;
