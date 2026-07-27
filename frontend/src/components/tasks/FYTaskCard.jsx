import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "../ui/AppBadge";
import AppSkeleton from "../ui/AppSkeleton";

const FYTaskCard = memo(({ title, icon, lp, isLoading, onNavigate, onAction, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  const [isConfirming, setIsConfirming] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetFlip = useCallback(() => {
    setIsConfirming(false);
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [flipAnim]);

  const handleIconPress = useCallback(() => {
    if (isConfirming) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onAction();
      resetFlip();
    } else {
      setIsConfirming(true);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();

      timeoutRef.current = setTimeout(() => {
        resetFlip();
      }, 2500);
    }
  }, [flipAnim, isConfirming, onAction, resetFlip]);

  const { frontRotateY, backRotateY, frontOpacity, backOpacity } = useMemo(
    () => ({
      frontRotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }),
      backRotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] }),
      frontOpacity: flipAnim.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [1, 1, 0, 0] }),
      backOpacity: flipAnim.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [0, 0, 1, 1] })
    }),
    [flipAnim]
  );

  if (isLoading) {
    return <AppSkeleton height={70} radius={Spacing.borderRadius.lg} />;
  }

  return (
    <BaseCard style={style}>
      <TouchableOpacity activeOpacity={0.8} onPress={onNavigate} style={styles.headerRow}>
        {icon && (
          <TouchableOpacity activeOpacity={0.9} onPress={handleIconPress} style={styles.iconWrapper}>
            <Animated.View
              style={[
                styles.iconFace,
                {
                  opacity: frontOpacity,
                  transform: [{ rotateY: frontRotateY }, { perspective: 1000 }],
                  backgroundColor: icon.bg
                }
              ]}
            >
              <Icon name={icon.name} color={icon.color} />
            </Animated.View>

            <Animated.View
              style={[
                styles.iconFace,
                {
                  opacity: backOpacity,
                  transform: [{ rotateY: backRotateY }, { perspective: 1000 }],
                  backgroundColor: MyTheme.primaryAccent
                }
              ]}
            >
              <Icon name="add" color={MyTheme.background} />
            </Animated.View>
          </TouchableOpacity>
        )}
        <AppText bold type="title" numberOfLines={1} style={styles.titleText}>
          {t(title)}
        </AppText>

        <AppBadge label={`${lp} LP`} style={styles.lpDisplay} />
      </TouchableOpacity>
    </BaseCard>
  );
});
FYTaskCard.displayName = "FYTaskCard";

const getStyles = () =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconWrapper: {
      marginRight: Spacing.md,
      width: 44,
      height: 44
    },
    iconFace: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Spacing.borderRadius.full
    },
    titleText: {
      flex: 1,
      marginRight: Spacing.sm
    },
    lpDisplay: {
      borderWidth: 0,
      backgroundColor: "none",
      alignSelf: "center"
    }
  });

export default FYTaskCard;
