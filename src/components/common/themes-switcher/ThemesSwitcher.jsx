import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from 'react-native';
import { changeTheme } from '../../../redux/actions/settings';
import MoonIcon from '../../../assets/svg/moon.svg';
import SunIcon from '../../../assets/svg/sun.svg';
import {
  Wrapper,
  AnimatedContainer,
  AnimatedCircle,
} from './ThemesSwitcher.styles';

const animateState = {
  start: 0,
  end: 100,
};

const inputRange = Object.values(animateState);

const animatedValues = {
  wrapper: ['#131920', '#F3AB4E'],
  circle: ['#F4AB41', '#555A60'],
  translate: [0, 30],
};

function ThemesSwitcher() {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.settings.theme);
  const animatedValue = useRef(new Animated.Value(animateState.start)).current;

  const bckgColorWrapper = animatedValue.interpolate({ inputRange, outputRange: animatedValues.wrapper });
  const bckgColorCircle = animatedValue.interpolate({ inputRange, outputRange: animatedValues.circle });
  const translateY = animatedValue.interpolate({ inputRange, outputRange: animatedValues.translate });

  const startAnimate = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: animateState[appTheme === 'light' ? 'start' : 'end'],
      useNativeDriver: false,
      duration: 500,
    }).start();
  }, [animatedValue, appTheme]);

  const toggleTheme = useCallback(() => {
    startAnimate();
    dispatch(changeTheme());
  }, [startAnimate]);

  return (
    <Wrapper onPress={toggleTheme}>
      <AnimatedContainer style={[{
        backgroundColor: bckgColorWrapper,
      }]}
      >
        <AnimatedCircle style={[{
          backgroundColor: bckgColorCircle,
          transform: [{ translateY }],
        }]}
        />
        <SunIcon
          width={20}
          style={{ position: 'absolute', top: -6, left: 5, zIndex: 1 }}
        />
        <MoonIcon
          width={15}
          height={20}
          style={{ position: 'absolute', bottom: 3, left: 8, zIndex: 1 }}
        />
      </AnimatedContainer>
    </Wrapper>
  );
}

export default ThemesSwitcher;
