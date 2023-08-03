import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
  width: 30px;
  height: 60px;
  border-radius: 20px;
  margin: 5px 0 0 30px;
`;

export const AnimatedContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 3px;
  position: relative;
`;

export const AnimatedCircle = styled(Animated.View)`
  width: 24px;
  height: 24px;
  border-radius: 14px;
  z-index: 2;
`;
