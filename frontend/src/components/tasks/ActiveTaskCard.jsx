import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, LayoutAnimation, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

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
    onAddSubStep,
    onDeleteSubStep,
    style
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("tasks");

    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [isConfirming, setIsConfirming] = useState(false);

    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepTitle, setNewStepTitle] = useState("");
    const [newStepDescription, setNewStepDescription] = useState("");

    const flipAnim = useRef(new Animated.Value(0)).current;
    const timeoutRef = useRef(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const swipeableRefs = useRef(new Map());

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

    const submitNewStep = useCallback(() => {
      if (newStepTitle.trim().length > 0 && onAddSubStep) {
        onAddSubStep({
          title: newStepTitle.trim(),
          description: newStepDescription ? newStepDescription.trim() : ""
        });
      }

      setNewStepTitle("");
      setNewStepDescription("");
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }, [newStepTitle, newStepDescription, onAddSubStep]);

    const renderRightActions = (stepId) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.deleteAction}
          onPress={() => {
            if (onDeleteSubStep) onDeleteSubStep(stepId);
            if (swipeableRefs.current.has(stepId)) {
              swipeableRefs.current.get(stepId).close();
            }
          }}
        >
          <Icon name="trash" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      );
    };

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
                const stepId = step._id || index;
                const stepContent = (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.subStepItem}
                    onPress={() => onToggleSubStep && onToggleSubStep(step._id || index, step)}
                  >
                    <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
                      {isCompleted && <Icon name="checkmark" size={16} color={MyTheme.primaryAccent} />}
                    </View>

                    <View style={styles.subStepTextContainer}>
                      <AppText bold type="body" style={isCompleted && styles.subStepTitleCompleted}>
                        {t(step.title)}
                      </AppText>

                      {Boolean(step.description && step.description.trim().length > 0) && (
                        <AppText type="caption" style={styles.subStepDescription} numberOfLines={2}>
                          {t(step.description)}
                        </AppText>
                      )}
                    </View>

                    <LpPoints points={stepPoints} size="small" />
                  </TouchableOpacity>
                );
                if (step.isCustom) {
                  return (
                    <ReanimatedSwipeable
                      key={stepId}
                      ref={(ref) => {
                        if (ref) swipeableRefs.current.set(stepId, ref);
                        else swipeableRefs.current.delete(stepId);
                      }}
                      renderRightActions={() => renderRightActions(stepId)}
                      onSwipeableWillOpen={(direction) => {
                        if (direction === "left" && onDeleteSubStep) {
                          onDeleteSubStep(stepId);
                        }
                      }}
                    >
                      {stepContent}
                    </ReanimatedSwipeable>
                  );
                }

                return <View key={stepId}>{stepContent}</View>;
              })}

              {isAddingStep ? (
                <View style={styles.subStepItem}>
                  <View style={[styles.checkbox, { borderColor: MyTheme.separator }]} />
                  <View style={styles.subStepTextContainer}>
                    <TextInput
                      ref={titleInputRef}
                      autoFocus
                      value={newStepTitle}
                      onChangeText={setNewStepTitle}
                      onSubmitEditing={() => {
                        if (newStepTitle.trim().length === 0) {
                          setIsAddingStep(false);
                        } else {
                          descriptionInputRef.current?.focus();
                        }
                      }}
                      placeholder={t("Title...")}
                      placeholderTextColor={MyTheme.muted}
                      style={styles.simpleTitleInput}
                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                    />

                    <TextInput
                      ref={descriptionInputRef}
                      value={newStepDescription}
                      onChangeText={setNewStepDescription}
                      onSubmitEditing={submitNewStep}
                      placeholder={t("Description (optional)...")}
                      placeholderTextColor={MyTheme.muted}
                      style={[styles.simpleDescriptionInput, { color: MyTheme.muted }]}
                      returnKeyType="done"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>
              ) : (
                <TouchableOpacity activeOpacity={0.7} style={styles.subStepItem} onPress={() => setIsAddingStep(true)}>
                  <View style={[styles.checkbox, { borderColor: "transparent" }]} />
                  <AppText bold style={{ color: MyTheme.muted }}>
                    {t("Add step...")}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: Spacing.md
              }}
            >
              <AppButton title={t("Go to Task")} variant={"ghost"} />
              <AppButton title={t("Finish")} />
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
    deleteAction: {
      backgroundColor: theme.warning,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: "100%"
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
    subStepTitleCompleted: {
      textDecorationLine: "line-through",
      color: theme.muted
    },
    subStepDescription: {
      color: theme.muted,
      marginTop: 2
    },
    simpleTitleInput: {
      flex: 1,
      fontFamily: "Inter-Bold",
      fontSize: 16,
      lineHeight: 22,
      padding: 0,
      margin: 0,
      outlineStyle: "none",
      color: theme.text
    },
    simpleDescriptionInput: {
      fontFamily: "Inter-Regular",
      fontSize: 13,
      lineHeight: 18,
      padding: 0,
      margin: 0,
      marginTop: 2,
      outlineStyle: "none"
    }
  });

export default ActiveTaskCard;
