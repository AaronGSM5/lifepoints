import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";

import TrophyCard from "../trophies/TrophyCard";
import SectionHeader from "../ui/SectionHeader";

const ProfileTrophies = ({ isLoading, trophies, skeletonProps }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("trophies");
  return (
    <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
      <SectionHeader
        title={t("Trophies")}
        icon={"trophy"}
        iconColor={MyTheme.gold}
        rightLabel={t("See all")}
        rightLabelColor={MyTheme.gold}
        onRightPress={() => router.push("/trophies")}
        isLoading={isLoading}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md }}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={`skel-trophy-${i}`}
              {...skeletonProps}
              width={80}
              height={80}
              radius={Spacing.borderRadius.lg}
            />
          ))}
        {!isLoading &&
          trophies?.map((item, i) => {
            const trophyCatalogObject = trophiesCatalog.find((entry) => entry.id === item.id);
            return (
              <View key={`trophy-${trophyCatalogObject?.id || i}`} style={{ width: 80 }}>
                <TrophyCard
                  key={trophyCatalogObject?.id}
                  id={trophyCatalogObject?.id}
                  title={trophyCatalogObject?.title}
                  icon={trophyCatalogObject?.icon}
                  unlocked={item.unlocked}
                  justUnlocked={false}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ProfileTrophies;
