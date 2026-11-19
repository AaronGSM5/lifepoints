import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import CustomizablesCard from "../customizables/CustomizablesCard";
import AppSkeleton from "../ui/AppSkeleton";
import EmptyView from "../ui/EmptyView";
import SectionHeader from "../ui/SectionHeader";

const CustomizablesPreview = memo(({ isLoading, customizables }) => {
  const { t } = useTranslation("profile");
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const activeFrame = useStore((state) => state.profile?.activeFrame);
  const activeBadge = useStore((state) => state.profile?.activeBadge);

  const activeCustomizables = useMemo(() => {
    return [activeFrame, activeBadge];
  }, [activeFrame, activeBadge]);

  const handleSeeAll = useCallback(() => {
    router.push("/customizables");
  }, []);

  const isEmpty = !isLoading && !customizables?.length;

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t("Customizables")}
        icon={"star"}
        iconColor={MyTheme.primaryAccent}
        rightLabel={t("See all")}
        rightLabelColor={MyTheme.primaryAccent}
        onRightPress={handleSeeAll}
        isLoading={isLoading}
      />

      {isEmpty ? (
        <EmptyView
          icon="star"
          iconSize={24}
          iconColor={MyTheme.primaryAccent}
          title={t("No customizables yet")}
          description={t("Complete tasks and open chests to unlock frames and badges.")}
          actionTitle={t("See all")}
          onAction={handleSeeAll}
          containerStyle={styles.empty}
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <AppSkeleton key={`skel-custom-${i}`} width={80} height={80} radius={Spacing.borderRadius.lg} />
            ))}
          {!isLoading &&
            customizables.map((item, i) => (
              <View key={`custom-${item?.id || i}`} style={styles.itemWrapper}>
                <CustomizablesCard
                  id={item?.id}
                  name={t(item?.name)}
                  icon={item?.icon || "circle"}
                  color={item?.color || MyTheme.text}
                  isActive={activeCustomizables.includes(item?.id)}
                  unlocked={item?.unlocked}
                />
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
});

CustomizablesPreview.displayName = "CustomizablesPreview";

const getStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.lg
    },
    empty: {
      minHeight: 0,
      paddingVertical: Spacing.md
    },
    scrollContent: {
      gap: Spacing.md
    },
    itemWrapper: {
      width: 80
    }
  });

export default CustomizablesPreview;
