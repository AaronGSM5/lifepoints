import { StyleSheet, useWindowDimensions, View } from "react-native";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <AppText type="h1" style={{ fontSize: 80 }}>
          {item.icon}
        </AppText>
      </View>

      <View style={styles.textContainer}>
        <AppText type="h1" style={styles.title}>
          {item.title}
        </AppText>
        <AppText type="body" style={styles.description}>
          {item.description}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center"
  },
  textContainer: {
    flex: 0.4,
    alignItems: "center",
    marginTop: Spacing.md
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.md
  },
  description: {
    textAlign: "center",
    color: "gray",
    lineHeight: 24
  }
});

export default OnboardingItem;
