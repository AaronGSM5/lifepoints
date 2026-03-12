import { Spacing } from "@/constants/Spacing";
import AppButton from "./AppButton";
import Skeleton from "./Skeleton";
import { MyTheme } from "@/constants/Colors";
import { ScrollView } from "react-native";

const CategoryButtons = ({ categories, activeCat, setActiveCat, skeletonProps, isLoading }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -Spacing.lg }}
      contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: Spacing.sm }}
    >
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} {...skeletonProps} width={80} height={40} radius={Spacing.borderRadius.full} />
            ))
        : categories.map((cat, index) => {
            const isActive = cat.toLowerCase() === activeCat;
            return (
              <AppButton
                key={index}
                title={cat}
                variant={isActive ? "primary" : "secondary"}
                size="md"
                onPress={() => setActiveCat(cat.toLowerCase())}
                borderStyle={isActive ? { borderWidth: 1, borderColor: MyTheme.secondary } : undefined}
              />
            );
          })}
    </ScrollView>
  );
};

export default CategoryButtons;
