import { memo, useMemo } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const FeedItemImageContainer = memo(({ image, heartOpacity, heartScale, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.imageContainer}>
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <Image source={image} style={styles.feedImage} resizeMode="cover" />
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
FeedItemImageContainer.displayName = "FeedItemImageContainer";

const getStyles = (theme) =>
  StyleSheet.create({
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      backgroundColor: theme.primary,
      position: "relative",
      overflow: "hidden"
    },
    feedImage: {
      width: "100%",
      height: "100%"
    },
    bigHeartOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default FeedItemImageContainer;
