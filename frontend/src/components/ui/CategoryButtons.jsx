import { Spacing } from "@/constants/Spacing";
import AppButton from "./AppButton";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

const CategoryButtons = ({ categories, activeCat, setActiveCat, skeletonProps, isLoading, namespace = "tasks" }) => {
  const { t } = useTranslation(namespace);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: Spacing.lg }}
      contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.sm }}
    >
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} {...skeletonProps} width={80} height={45} radius={Spacing.borderRadius.full} />
            ))
        : categories.map((cat, index) => {
            const lowercaseCat = cat.toLowerCase();
            const isActive = lowercaseCat === activeCat.toLowerCase();
            return (
              <AppButton
                key={index}
                title={t(`categories.${lowercaseCat}`)}
                variant={isActive ? "primary" : "secondary"}
                size="md"
                onPress={() => setActiveCat(lowercaseCat)}
                borderStyle={isActive ? { borderWidth: 1, borderColor: MyTheme.secondary } : undefined}
              />
            );
          })}
    </ScrollView>
  );
};

export default CategoryButtons;
