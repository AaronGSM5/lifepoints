import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/store/useStore";
import { MyTheme } from "@/constants/Colors";

export default function AppearanceScreen() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleTheme = useStore((state) => state.toggleDarkMode);

  return (
    <View style={[styles.container, { backgroundColor: MyTheme.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: MyTheme.text }]}>Erscheinungsbild</Text>
        <Text style={[styles.subText, { color: MyTheme.muted }]}>Passe das Design der App an deine Vorlieben an.</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            !isDarkMode && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => {
            if (isDarkMode) toggleTheme();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="sunny" size={36} color={!isDarkMode ? MyTheme.primaryAccent : MyTheme.muted} />
          <Text style={[styles.cardText, { color: !isDarkMode ? MyTheme.text : MyTheme.muted }]}>Hell</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            isDarkMode && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => {
            if (!isDarkMode) toggleTheme();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="moon" size={36} color={isDarkMode ? MyTheme.primaryAccent : MyTheme.muted} />
          <Text style={[styles.cardText, { color: isDarkMode ? MyTheme.text : MyTheme.muted }]}>Dunkel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  headerContainer: {
    marginBottom: 32,
    marginTop: 16
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    marginBottom: 8
  },
  subText: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    lineHeight: 22
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16
  },
  card: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2
  },
  cardText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Inter-SemiBold"
  }
});
