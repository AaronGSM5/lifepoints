import { memo, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppButton from "./AppButton";

const CategoryButtons = memo(({ categories = [], activeCat, setActiveCat, skeletonProps, isLoading }) => {
  const MyTheme = useAppTheme();
  const containerStyle = useMemo(
    () => ({
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm
    }),
    []
  );

  const renderSkeletons = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} {...skeletonProps} width={80} height={45} radius={Spacing.borderRadius.full} />
      )),
    [skeletonProps]
  );

  const handlePress = useCallback(
    (id) => {
      setActiveCat(id);
    },
    [setActiveCat]
  );
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={containerStyle}
    >
      {isLoading
        ? renderSkeletons
        : categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              isActive={activeCat === cat.id}
              onPress={handlePress}
              primaryAccent={MyTheme.secondary}
            />
          ))}
    </ScrollView>
  );
});

const CategoryItem = memo(({ category, isActive, onPress, primaryAccent }) => (
  <AppButton
    title={category.label}
    variant={isActive ? "primary" : "secondary"}
    size="md"
    onPress={() => onPress(category.id)}
    borderStyle={isActive ? { borderWidth: 1, borderColor: primaryAccent } : undefined}
  />
));

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: Spacing.lg
  }
});

CategoryItem.displayName = "CategoryItem";
CategoryButtons.displayName = "CategoryButtons";

export default CategoryButtons;
