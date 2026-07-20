import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const SlidePaginator = ({ data, currentIndex }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => (
        <View key={index.toString()} style={[styles.dot, currentIndex === index && styles.activeDot]} />
      ))}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    dotContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: Spacing.xl
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.muted,
      marginHorizontal: 4
    },
    activeDot: {
      backgroundColor: theme.primary,
      width: 20
    }
  });

export default SlidePaginator;
