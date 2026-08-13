import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppCheckbox from "../ui/AppCheckbox";
import AppText from "../ui/AppText";

const AddSubStepForm = memo(({ onAddSubStep }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState("");
  const [newStepDescription, setNewStepDescription] = useState("");

  const titleRef = useRef(newStepTitle);
  const descRef = useRef(newStepDescription);

  useEffect(() => {
    titleRef.current = newStepTitle;
    descRef.current = newStepDescription;
  }, [newStepTitle, newStepDescription]);

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTitleSubmit = useCallback(() => {
    if (titleRef.current.trim().length === 0) {
      setIsAddingStep(false);
    } else {
      descriptionInputRef.current?.focus();
    }
  }, []);

  const submitNewStep = useCallback(() => {
    const trimmedTitle = titleRef.current.trim();
    const trimmedDesc = descRef.current.trim();
    if (trimmedTitle.length > 0 && onAddSubStep) {
      onAddSubStep({
        title: trimmedTitle,
        description: trimmedDesc
      });
    }

    setNewStepTitle("");
    setNewStepDescription("");

    timeoutRef.current = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 50);
  }, [onAddSubStep]);

  if (!isAddingStep) {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.subStepItem} onPress={() => setIsAddingStep(true)}>
        <AppCheckbox checked={false} borderColor={"transparent"} style={styles.checkbox} />
        <AppText bold style={{ color: MyTheme.muted }}>
          {t("Add step...")}
        </AppText>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.subStepItem}>
      <AppCheckbox checked={false} borderColor={MyTheme.separator} style={styles.checkbox} />
      <View style={styles.subStepTextContainer}>
        <TextInput
          ref={titleInputRef}
          autoFocus
          value={newStepTitle}
          onChangeText={setNewStepTitle}
          onSubmitEditing={handleTitleSubmit}
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
  );
});
AddSubStepForm.displayName = "AddSubStepForm";

const getStyles = (theme) =>
  StyleSheet.create({
    subStepItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.sm
    },
    checkbox: {
      marginRight: Spacing.md,
      marginTop: 2
    },
    subStepTextContainer: {
      flex: 1
    },
    simpleTitleInput: {
      flex: 1,
      fontFamily: "Inter-Bold",
      fontSize: 16,
      lineHeight: 22,
      padding: 0,
      margin: 0,
      color: theme.text,
      ...Platform.select({
        web: { outlineStyle: "none" }
      })
    },
    simpleDescriptionInput: {
      fontFamily: "Inter-Regular",
      fontSize: 13,
      lineHeight: 18,
      padding: 0,
      margin: 0,
      marginTop: 2,
      color: theme.muted,
      ...Platform.select({
        web: { outlineStyle: "none" }
      })
    }
  });

export default AddSubStepForm;
