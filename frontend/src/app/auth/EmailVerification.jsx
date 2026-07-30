import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Animated, Easing, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const EmailVerification = ({ onResendEmail, onLogout }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progressAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (timeLeft <= 0) {
      progressAnim.setValue(1);
      return;
    }
    const nextProgress = (30 - (timeLeft - 1)) / 30;

    Animated.timing(progressAnim, {
      toValue: nextProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [timeLeft, progressAnim]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResend = async () => {
    try {
      setIsSending(true);
      if (onResendEmail) await onResendEmail();

      progressAnim.setValue(0);
      setTimeLeft(30);

      Alert.alert(
        t("verification.successTitle", "Erfolgreich"),
        t("verification.successMessage", "Wir haben dir eine neue Bestätigungs-E-Mail gesendet.")
      );
    } catch {
      Alert.alert(
        t("verification.errorTitle", "Fehler"),
        t("verification.errorMessage", "E-Mail konnte nicht gesendet werden. Bitte versuche es später noch einmal.")
      );
    } finally {
      setIsSending(false);
    }
  };

  const size = 90;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  const isResendDisabled = isSending || timeLeft > 0;

  return (
    <ScreenWrapper withPaddingBottom={false}>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={[styles.iconContainer, { backgroundColor: addOpacity(theme.primaryAccent, 0.1) }]}>
              <Icon name="mail" size={48} color={theme.primaryAccent} />
            </View>

            <View style={styles.textContainer}>
              <AppText bold type="heading" style={styles.title}>
                {t("verification.title", "E-Mail bestätigen")}
              </AppText>
              <AppText type="body" style={styles.subtitle}>
                {t(
                  "verification.subtitle",
                  "Wir haben dir einen Bestätigungslink geschickt. Bitte schaue in deinem Postfach nach und klicke auf den Link, um deinen Account vollständig zu aktivieren."
                )}
              </AppText>
            </View>
          </View>
          <View style={styles.timerWrapper}>
            <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
              <Circle
                stroke={addOpacity(theme.muted, 0.2)}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <AnimatedCircle
                stroke={theme.primaryAccent}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>

            <View style={styles.timerTextContainer}>
              <AppText bold style={[styles.timerText, { color: timeLeft > 0 ? theme.text : theme.primaryAccent }]}>
                {timeLeft > 0 ? timeLeft : "0"}
              </AppText>
              <AppText style={styles.timerLabel}>sek</AppText>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title={"E-Mail erneut senden"}
            disabled={isResendDisabled}
            loading={isSending}
            onPress={handleResend}
          />

          {onLogout && (
            <TouchableOpacity activeOpacity={0.7} style={styles.secondaryButton} onPress={onLogout}>
              <AppText style={[styles.secondaryButtonText, { color: theme.muted }]}>
                {t("verification.logout", "Abmelden")}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

EmailVerification.displayName = "EmailVerification";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between"
    },
    iconContainer: {
      width: 96,
      height: 96,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: Spacing.lg
    },
    textContainer: {
      alignItems: "center",
      marginBottom: Spacing.xl
    },
    title: {
      fontSize: 22,
      textAlign: "center",
      marginBottom: Spacing.sm,
      color: theme.text
    },
    subtitle: {
      textAlign: "center",
      color: theme.muted,
      lineHeight: 20,
      paddingHorizontal: Spacing.md
    },
    timerWrapper: {
      width: 120,
      height: 120,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.xl,
      alignSelf: "center"
    },
    timerTextContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center"
    },
    timerText: {
      fontSize: 32,
      lineHeight: 36
    },
    timerLabel: {
      fontSize: 14,
      color: theme.muted,
      marginTop: -4
    },
    buttonContainer: {
      width: "100%",
      gap: Spacing.md,
      marginBottom: Spacing.md
    },
    primaryButton: {
      height: 50,
      borderRadius: Spacing.borderRadius.md,
      justifyContent: "center",
      alignItems: "center"
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16
    },
    secondaryButton: {
      height: 44,
      justifyContent: "center",
      alignItems: "center"
    },
    secondaryButtonText: {
      fontSize: 15
    }
  });

export default EmailVerification;
