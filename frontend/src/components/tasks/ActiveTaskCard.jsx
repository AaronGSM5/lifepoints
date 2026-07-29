import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import AppButton from "../ui/AppButton";
import AppSkeleton from "../ui/AppSkeleton";
import LpPoints from "../ui/LpPoints";

const ActiveTaskCard = memo(
  ({
    title,
    icon,
    lp,
    progress = 0,
    isLoading,
    onAction,
    initialExpanded = false,
    subSteps = [],
    onToggleSubStep,
    style
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("tasks");

    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [isConfirming, setIsConfirming] = useState(false);

    const flipAnim = useRef(new Animated.Value(0)).current;
    const timeoutRef = useRef(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const toggleExpand = useCallback(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(!isExpanded);
    }, [isExpanded]);

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

    const safeProgress = Math.min(Math.max(progress, 0), 100);
    const stepPoints = subSteps ? lp / subSteps.length : 0;

    return (
      <BaseCard style={[styles.card, style]}>
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
              <AppText type={"caption"}>Social Communities</AppText>
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
            <View
              style={[styles.progressFill, { width: `${safeProgress}%`, backgroundColor: MyTheme.primaryAccent }]}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && subSteps.length > 0 && (
          <>
            <View style={styles.contentContainer}>
              {subSteps.map((step, index) => {
                const isCompleted = step.completed;

                return (
                  <TouchableOpacity
                    key={step._id || index}
                    activeOpacity={0.7}
                    style={styles.subStepItem}
                    onPress={() => onToggleSubStep && onToggleSubStep(step._id || index, step)}
                  >
                    <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
                      {isCompleted && <Icon name="checkmark" size={16} color={MyTheme.primaryAccent} />}
                    </View>

                    <View style={styles.subStepTextContainer}>
                      <AppText
                        bold
                        type="body"
                        style={[styles.subStepTitle, isCompleted && styles.subStepTitleCompleted]}
                      >
                        {step.title}
                      </AppText>

                      {step.description && (
                        <AppText type="caption" style={styles.subStepDescription} numberOfLines={2}>
                          {step.description}
                        </AppText>
                      )}
                    </View>

                    <LpPoints points={stepPoints} size="small" />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: Spacing.md
              }}
            >
              <AppButton title={"go to Task"} variant={"ghost"} />
              <AppButton title={"Submit"} />
            </View>
          </>
        )}
      </BaseCard>
    );
  }
);
ActiveTaskCard.displayName = "ActiveTaskCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      overflow: "hidden"
    },
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
    },
    lpDisplay: {
      borderWidth: 0,
      backgroundColor: "none",
      alignSelf: "center"
    },
    contentContainer: {
      paddingTop: Spacing.md,
      paddingLeft: Spacing.lg
    },
    subStepItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.sm
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.muted,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md,
      marginTop: 2
    },
    checkboxChecked: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    },
    subStepTextContainer: {
      flex: 1
    },
    subStepTitle: {
      color: theme.text
    },
    subStepTitleCompleted: {
      textDecorationLine: "line-through",
      color: theme.muted
    },
    subStepDescription: {
      color: theme.muted,
      marginTop: 2
    }
  });

export default ActiveTaskCard;
