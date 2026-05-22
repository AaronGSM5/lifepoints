// src/components/LevelUpModal.js
import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import AppText from "./ui/AppText";
import AppButton from "./ui/AppButton";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "./icons/Icon";

const LevelUpModal = ({ visible, level, onTransitionEnd }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LottieView
          source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_u4yrau.json" }}
          autoPlay
          loop={false}
          style={styles.lottie}
        />

        <View style={styles.card}>
          <AppText type="h1" bold style={styles.title}>
            LEVEL UP!
          </AppText>
          <View style={styles.badge}>
            <AppText bold style={{ fontSize: 48 }}>
              {level}
            </AppText>
          </View>
          <AppText type="title">You unlocked:</AppText>

          <View style={{ height: 40 }} />

          <View style={{ flexDirection: "row", gap: 25 }}>
            {[
              { id: 1, icon: "sun", color: MyTheme.glas },
              { id: 2, icon: "sun", color: MyTheme.gold },
              { id: 3, icon: "sun", color: MyTheme.primaryAccent }
            ].map((item) => (
              <View
                key={item.id}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: item.color,
                  borderRadius: Spacing.borderRadius.md,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name={item.icon} />
              </View>
            ))}
          </View>
          <View style={{ height: 80 }} />
          <AppButton title={"Collect"} variant="outline" onPress={onTransitionEnd} />
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      justifyContent: "center",
      alignItems: "center"
    },
    lottie: {
      position: "absolute",
      width: "100%",
      height: "100%"
    },
    card: {
      width: "80%",
      maxWidth: 400,
      backgroundColor: "#1e293b",
      borderRadius: 30,
      padding: 30,
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.secondary
    },
    title: {
      fontSize: 40,
      color: theme.primaryAccent,
      marginBottom: 20
    },
    badge: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20
    }
  });

export default LevelUpModal;
