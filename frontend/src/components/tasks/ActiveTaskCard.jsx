import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import ActiveTaskHeader from "./ActiveTaskHeader";
import AppButton from "../ui/AppButton";
import AppSkeleton from "../ui/AppSkeleton";
import LpPoints from "../ui/LpPoints";

const ActiveTaskCard = memo(
  ({
    id,
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

    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepTitle, setNewStepTitle] = useState("");
    const [newStepDescription, setNewStepDescription] = useState("");

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const swipeableRefs = useRef(new Map());

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

    const handleGoToTask = useCallback(() => {
      router.push(`/task/${id}`);
    }, [id]);

    if (isLoading) {
      return <AppSkeleton height={70} radius={Spacing.borderRadius.lg} />;
    }

    const stepPoints = subSteps ? lp / subSteps.length : 0;

    return (
      <BaseCard style={[styles.card, style]}>
        <ActiveTaskHeader
          title={title}
          icon={icon}
          progress={progress}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          onAction={onAction}
        />
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
                      style={styles.simpleDescriptionInput}
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
              <AppButton title={t("Go to Task")} variant={"ghost"} onPress={() => handleGoToTask()} />
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
      justifyContent: "center",
      alignItems: "center"
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
      outlineStyle: "none",
      color: theme.muted
    }
  });

export default ActiveTaskCard;
