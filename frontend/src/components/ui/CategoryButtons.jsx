import { memo, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppButton from "./AppButton";
import AppSkeleton from "./AppSkeleton";

const CategoryButtons = memo(({ categories = [], activeCat, setActiveCat, isLoading }) => {
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
        <AppSkeleton key={i} width={80} height={45} radius={Spacing.borderRadius.full} />
      )),
    []
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
