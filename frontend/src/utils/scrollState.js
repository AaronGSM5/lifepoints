import { Animated } from 'react-native';

const screenStates = {};

export const getScrollState = (pathname, toolbarHeight = 56) => {
  if (!screenStates[pathname]) {
    const scrollY = new Animated.Value(0);

    const safeScrollY = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: "clamp"
    });

    const clampedScrollY = Animated.diffClamp(safeScrollY, 0, toolbarHeight);

    let currentClampedValue = 0;
    clampedScrollY.addListener(({ value }) => {
      currentClampedValue = value;
    });

    const translateY = clampedScrollY.interpolate({
      inputRange: [0, toolbarHeight],
      outputRange: [0, -toolbarHeight],
      extrapolate: "clamp"
    });

    screenStates[pathname] = {
      scrollY,
      translateY,
      getClampedValue: () => currentClampedValue
    };
  }
  return screenStates[pathname];
};