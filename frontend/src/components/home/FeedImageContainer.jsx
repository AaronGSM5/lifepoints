import { memo, useMemo } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppImage from "../ui/AppImage";

const FeedImageContainer = memo(({ image, heartOpacity, heartScale, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.imageContainer}>
      <Pressable style={styles.pressableFlex} onPress={onPress}>
        <AppImage source={image} variant="fill" />
        <Animated.View
          style={[
            styles.bigHeartOverlay,
            {
              opacity: heartOpacity,
              transform: [{ scale: heartScale }],
              pointerEvents: "none"
            }
          ]}
        >
          <Icon name="heart" size={100} color="#FFFFFF" outline={false} />
        </Animated.View>
      </Pressable>
    </View>
  );
});
FeedImageContainer.displayName = "FeedImageContainer";

const getStyles = (theme) =>
  StyleSheet.create({
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      backgroundColor: theme.primary,
      position: "relative",
      overflow: "hidden"
    },
    pressableFlex: {
      flex: 1
    },
    bigHeartOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default FeedImageContainer;
