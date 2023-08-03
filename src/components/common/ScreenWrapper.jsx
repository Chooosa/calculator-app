import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
import ThemesSwitcher from './themes-switcher/ThemesSwitcher';

function ScreenWrapper({ children }) {
  const theme = useTheme();

  // useEffect(() => {
  //   const lightBar = theme.palette.text.statusBar === 'light-content';
  //   // SystemNavigationBar.setNavigationColor(theme.palette.background.main, lightBar);
  // }, [theme]);

  return (
    <SafeAreaViewStyles>
      <StatusBar
        backgroundColor={theme.palette.background.main}
        barStyle={theme.palette.text.statusBar}
      />
      <ThemesSwitcher />
      {children}
    </SafeAreaViewStyles>
  );
}

const SafeAreaViewStyles = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.main};
`;

export default ScreenWrapper;
