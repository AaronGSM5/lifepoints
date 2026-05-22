// src/components/home/LootGameModal.js
import React, { useEffect, useRef, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from "react-native";
import * as Haptics from "expo-haptics";
import useStore from "@/store/useStore";
import AppText from "../ui/AppText";
import AppButton from "../ui/AppButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");
const MYSTERY_COLOR = "#475569";

const chestEpic = require("@/../public/assets/chests/chestPurple.png");
const chestLegendary = require("@/../public/assets/chests/chestGold.png");
const chestCommon = require("@/../public/assets/chests/chestBrown.png");
const chestRare = require("@/../public/assets/chests/chestBlue.png");
const mysteryChest = require("@/../public/assets/chests/chestBlack.png");

const STATIC_CHESTS = {
  epic: chestEpic,
  legendary: chestLegendary,
  common: chestCommon,
  rare: chestRare
};

const LootGameModal = () => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("home");

  const isLootGameActive = useStore((state) => state.isLootGameActive);
  const currentLootSet = useStore((state) => state.currentLootSet);
  const chosenLootIndex = useStore((state) => state.chosenLootIndex);
  const isLootRevealed = useStore((state) => state.isLootRevealed);
  const chooseLoot = useStore((state) => state.chooseLoot);
  const revealFinalLoot = useStore((state) => state.revealFinalLoot);
  const collectLoot = useStore((state) => state.collectLoot);

  const slideLeft = useRef(new Animated.Value(-width)).current;
  const slideRight = useRef(new Animated.Value(width)).current;
  const fadeCenter = useRef(new Animated.Value(0)).current;
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    if (isLootGameActive && currentLootSet.length > 0) {
      setCanInteract(false);
      slideLeft.setValue(-width);
      slideRight.setValue(width);
      fadeCenter.setValue(0);

      Animated.parallel([
        Animated.spring(slideLeft, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
        Animated.spring(slideRight, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
        Animated.timing(fadeCenter, { toValue: 1, duration: 600, useNativeDriver: true })
      ]).start(() => setCanInteract(true));
    }
  }, [isLootGameActive]);

  const handlePick = (index) => {
    if (!canInteract || chosenLootIndex !== null) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    chooseLoot(index);

    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      revealFinalLoot();
    }, 1200);
  };

  if (!isLootGameActive) return null;

  return (
    <Modal visible={isLootGameActive} transparent animationType="fade">
      <View style={styles.overlay}>
        <AppText type="h1" bold style={styles.mainTitle}>
          {t("Select a card")}
        </AppText>

        <View style={styles.container}>
          {currentLootSet.map((reward, index) => {
            const isChosen = chosenLootIndex === index;
            const isMysteryPhase = chosenLootIndex === null;
            const shouldReveal = isChosen || isLootRevealed;
            const showColor = isChosen || isLootRevealed;
            const borderColor = showColor ? reward.rarity.color : MYSTERY_COLOR;

            let chestSource;
            if (isMysteryPhase) {
              chestSource = mysteryChest; // Die graue Kiste
            } else if (shouldReveal) {
              chestSource = STATIC_CHESTS[reward.rarity.id] || mysteryChest; // Die farbige Kiste oder Fallback
            } else {
              chestSource = mysteryChest; // Nicht gewählte, nicht enthüllte Kiste
            }

            let animatedStyle = {};
            if (index === 0) animatedStyle = { transform: [{ translateX: slideLeft }] };
            if (index === 1) animatedStyle = { opacity: fadeCenter };
            if (index === 2) animatedStyle = { transform: [{ translateX: slideRight }] };

            return (
              <Animated.View key={index} style={[styles.chestWrapper, animatedStyle]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={!canInteract || chosenLootIndex !== null}
                  onPress={() => handlePick(index)}
                  style={[styles.chestCard, { borderColor: borderColor }, isChosen && styles.chosenCard]}
                >
                  <Image source={chestSource} style={styles.chestImage} resizeMode="contain" />

                  {shouldReveal && (
                    <View style={styles.rewardInfo}>
                      <AppText bold style={{ color: reward.rarity.color, fontSize: 12 }}>
                        {t(reward.rarity.label).toUpperCase()}
                      </AppText>
                      <AppText bold style={styles.rewardName}>
                        {reward.name}
                      </AppText>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {isLootRevealed && (
          <Animated.View style={styles.footer}>
            <AppText style={styles.nearMissText}>
              {currentLootSet[chosenLootIndex].rarity.id === "epic" ||
              currentLootSet[chosenLootIndex].rarity.id === "legendary"
                ? t("Crazy!")
                : t("So close!")}
            </AppText>
            <AppButton title={t("Collect Reward")} onPress={collectLoot} variant="primary" />
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(2, 6, 23, 0.95)",
      justifyContent: "center",
      alignItems: "center",
      padding: Spacing.md
    },
    mainTitle: {
      color: theme.primaryAccent,
      fontSize: 28,
      marginBottom: 60,
      letterSpacing: 2,
      textAlign: "center"
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: Spacing.sm
    },
    chestWrapper: {
      width: (width - Spacing.md * 2 - Spacing.sm * 2) / 3
    },
    chestCard: {
      width: "100%",
      aspectRatio: 0.7,
      backgroundColor: "#1e293b",
      borderRadius: 20,
      borderWidth: 3,
      padding: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    chosenCard: {
      transform: [{ scale: 1.1 }],
      backgroundColor: "#334155"
    },
    chestImage: {
      width: "100%", // Passend skalieren
      height: "100%"
    },
    rewardInfo: {
      position: "absolute",
      bottom: 10,
      alignItems: "center",
      width: "100%"
    },
    rewardName: {
      color: "#fff",
      fontSize: 12,
      textAlign: "center",
      marginTop: 1
    },
    footer: {
      marginTop: 80,
      width: "100%",
      alignItems: "center"
    },
    nearMissText: {
      color: "#94a3b8",
      marginBottom: 20,
      textAlign: "center",
      fontSize: 16
    }
  });

export default LootGameModal;
