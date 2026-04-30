// app/profile/customizables.js
import React from "react";
import { StyleSheet, View, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Icon } from "@/components/icons/Icon";
import useStore from "@/store/useStore";

const MOCK_ITEM_DATABASE = {
  frames: [
    { id: "f0", name: "Standard", icon: "circle", color: "#ccc" },
    { id: "f1", name: "Neon Glow", icon: "star", color: "#00E5FF" },
    { id: "f2", name: "Solar Flare", icon: "sun", color: "#FF8E00" }
  ],
  titles: [
    { id: "t1", name: "Der Anfänger", color: MyTheme.text },
    { id: "t2", name: "Macher", color: MyTheme.primaryAccent }
  ]
};

export default function CustomizablesScreen() {
  const styles = getStyles();
  const router = useRouter();

  const profile = useStore((state) => state.profile);

  const unlockedItems = profile?.unlockedItems || { frames: ["f0"], titles: ["t1"] };
  const activeFrame = profile?.activeFrame || "f0";
  const activeTitle = profile?.activeTitle || "t1";

  const checkIsActive = (category, itemId) => {
    if (category === "frames") return activeFrame === itemId;
    if (category === "titles") return activeTitle === itemId;
    return false;
  };

  const handleEquip = (category, itemId) => {
    console.log(`Rüste ${itemId} aus Kategorie ${category} aus.`);
  };

  return (
    <ScreenWrapper withPaddingTop={true}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name="left" size={24} color={MyTheme.text} />
        </Pressable>
        <AppText type="h1" style={styles.title}>
          Dein Studio
        </AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.categorySection}>
          <AppText type="h2" style={styles.categoryTitle}>
            Profil-Rahmen
          </AppText>
          <View style={styles.gridContainer}>
            {MOCK_ITEM_DATABASE.frames.map((item) => {
              const isUnlocked = unlockedItems.frames.includes(item.id);
              const isActive = checkIsActive("frames", item.id);

              return (
                <Pressable
                  key={item.id}
                  style={[styles.itemCard, !isUnlocked && styles.itemCardLocked, isActive && styles.itemCardActive]}
                  onPress={() => (isUnlocked ? handleEquip("frames", item.id) : null)}
                >
                  <View style={[styles.iconWrapper, { borderColor: isUnlocked ? item.color : "#555" }]}>
                    <Icon name={isUnlocked ? item.icon : "lock"} size={32} color={isUnlocked ? item.color : "#555"} />
                  </View>
                  <AppText type="caption" bold={isActive} style={[styles.itemName, !isUnlocked && { color: "#555" }]}>
                    {item.name}
                  </AppText>
                  {isActive && (
                    <AppText type="caption" style={styles.activeLabel}>
                      Aktiv
                    </AppText>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.categorySection}>
          <AppText type="h2" style={styles.categoryTitle}>
            Profil-Titel
          </AppText>
          <View style={styles.listContainer}>
            {MOCK_ITEM_DATABASE.titles.map((item) => {
              const isUnlocked = unlockedItems.titles.includes(item.id);
              const isActive = checkIsActive("titles", item.id);

              return (
                <Pressable
                  key={item.id}
                  style={[styles.titleRow, isActive && styles.titleRowActive]}
                  onPress={() => (isUnlocked ? handleEquip("titles", item.id) : null)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
                    {!isUnlocked && <Icon name="lock" size={16} color="#555" />}
                    <AppText type="body" bold style={{ color: isUnlocked ? item.color : "#555" }}>
                      {item.name}
                    </AppText>
                  </View>
                  {isActive && <Icon name="checkmark" size={20} color={MyTheme.primaryAccent} />}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.xl,
      paddingHorizontal: Spacing.md
    },
    backButton: {
      padding: Spacing.sm,
      marginRight: Spacing.sm,
      marginLeft: -Spacing.sm
    },
    title: {
      flex: 1
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.xxl
    },
    categorySection: {
      marginBottom: Spacing.xl
    },
    categoryTitle: {
      marginBottom: Spacing.md,
      color: MyTheme.muted
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md
    },
    itemCard: {
      width: "30%",
      aspectRatio: 0.8,
      backgroundColor: MyTheme.surface,
      borderRadius: Spacing.borderRadius.md,
      padding: Spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent"
    },
    itemCardLocked: {
      opacity: 0.6,
      backgroundColor: "rgba(0,0,0,0.05)"
    },
    itemCardActive: {
      borderColor: MyTheme.primaryAccent
    },
    iconWrapper: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 3,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    itemName: {
      textAlign: "center"
    },
    activeLabel: {
      color: MyTheme.primaryAccent,
      fontSize: 10,
      marginTop: 2
    },
    listContainer: {
      gap: Spacing.sm
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: Spacing.md,
      backgroundColor: MyTheme.surface,
      borderRadius: Spacing.borderRadius.md
    },
    titleRowActive: {
      borderWidth: 1,
      borderColor: MyTheme.primaryAccent
    }
  });
