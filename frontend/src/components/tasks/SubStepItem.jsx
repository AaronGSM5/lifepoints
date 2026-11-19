import { memo, useCallback, useMemo, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppCheckbox from "../ui/AppCheckbox";
import AppText from "../ui/AppText";
import LpPoints from "../ui/LpPoints";

const SubStepItem = memo(({ step, stepPoints, onToggle, onDelete }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const swipeableRef = useRef(null);

  const isCompleted = step.completed;
  const stepId = step._id;

  const handleDelete = useCallback(() => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
    if (onDelete) onDelete(stepId);
  }, [onDelete, stepId]);

  const handleToggle = useCallback(() => {
    if (onToggle) onToggle(stepId, step);
  }, [onToggle, step, stepId]);

  const renderRightActions = useCallback(
    () => (
      <TouchableOpacity activeOpacity={0.8} style={styles.deleteAction} onPress={handleDelete}>
        <Icon name="trash" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    ),
    [handleDelete, styles.deleteAction]
  );

  const content = (
    <TouchableOpacity activeOpacity={0.7} style={styles.subStepItem} onPress={handleToggle}>
      <AppCheckbox checked={isCompleted} style={styles.checkbox} />

      <View style={styles.subStepTextContainer}>
        <AppText bold type="body" style={isCompleted && styles.subStepTitleCompleted}>
          {step.title}
        </AppText>

        {Boolean(step.description && step.description.trim().length > 0) && (
          <AppText type="caption" style={styles.subStepDescription} numberOfLines={2}>
            {step.description}
          </AppText>
        )}
      </View>

      <LpPoints points={stepPoints} size="small" />
    </TouchableOpacity>
  );

  if (!isCompleted) {
    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={(direction) => {
          if (direction === "left" && onDelete) {
            onDelete(stepId);
          }
        }}
      >
        {content}
      </ReanimatedSwipeable>
    );
  }

  return content;
});
SubStepItem.displayName = "SubStepItem";

const getStyles = (theme) =>
  StyleSheet.create({
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
      marginRight: Spacing.md,
      marginTop: 2
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
    }
  });

export default SubStepItem;
