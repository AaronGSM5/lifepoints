import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const ActiveTaskHeader = memo(({ title, icon, progress, isExpanded, setIsExpanded, onAction }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const flipAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);
  const [isConfirming, setIsConfirming] = useState(false);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

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

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand}>
      <View style={styles.headerRow}>
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
              <Icon name="checkmark" color={MyTheme.background} />
            </Animated.View>
          </TouchableOpacity>
        )}
        <View style={styles.contentColumn}>
          <AppText bold type="title" numberOfLines={1} style={styles.titleText}>
            {t(title)}
          </AppText>
          <View style={styles.metaRow}>
            <Icon name={"time"} size={13} color={MyTheme.muted} />
            <AppText type={"caption"}>10m • Focus</AppText>
          </View>
        </View>
        <Icon name={isExpanded ? "down" : "right"} color={MyTheme.muted} />
      </View>
      <View
        style={[
          styles.progressTrack,
          { marginBottom: isExpanded ? 0 : -Spacing.md },
          isExpanded && styles.progressShadow
        ]}
      >
        <View style={[styles.progressFill, { width: `${safeProgress}%`, backgroundColor: MyTheme.primaryAccent }]} />
      </View>
    </TouchableOpacity>
  );
}, []);
ActiveTaskHeader.displayName = "ActiveTaskHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.md
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
    contentColumn: {
      flex: 1,
      flexDirection: "column",
      marginRight: Spacing.sm
    },
    titleText: {
      flex: 1,
      marginRight: Spacing.sm
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    progressTrack: {
      height: 8,
      backgroundColor: theme.separator,
      marginHorizontal: -Spacing.md
    },
    progressShadow: {
      boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.15)"
    },
    progressFill: {
      height: "100%",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    }
  });

export default ActiveTaskHeader;
