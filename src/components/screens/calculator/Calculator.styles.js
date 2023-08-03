import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import themes from '../../../theme/theme';

const stylesByClass = (className, appTheme) => {
  const theme = themes[appTheme];

  switch (className) {
    case 'circle-button':
      return `
        background-color: ${theme.palette.background.contrast}15;
      `;
    case 'double-circle-button':
      return `
        background-color: ${theme.palette.background.contrast}15;
        width: 140px;
      `;
    default:
      return '';
  }
};

export const OutputWrapper = styled(View)`
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: flex-end;
  padding: 30px;
`;

export const OutputTotal = styled(Text)`
  color: #F3AB4E;
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const OutputHistory = styled(Text)`
  color: #F3AB4E;
  font-size: 25px;
  font-weight: 500;
`;

export const ActionsWrapper = styled(View)`
  position: relative;
  z-index: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px 20px;
  justify-content: space-between;
`;

export const ActionButton = styled(TouchableOpacity)`
  position: relative;
  z-index: 2;
  width: 60px;
  height: 60px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  ${({ cls, theme }) => stylesByClass(cls, theme)}
`;

export const ActionValue = styled(Text)`
  font-size: 25px;
  font-weight: 500;
  ${({ cls, theme }) => `color: ${cls === 'orange-color' ? '#F3AB4E' : theme.palette.text.main};`},
`;
