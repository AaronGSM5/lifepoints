import { useTranslation } from "react-i18next";
import { View, ScrollView } from "react-native";
import SectionHeader from "../ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import TrophyCard from "../trophies/TrophyCard";
import useStore from "@/store/useStore";

const ProfileTrophies = ({ isLoading, trophies, skeletonProps }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("trophies");
  const unlockedTrophies = useStore((state) => state.profile.unlockedTrophies);
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
          trophies?.map((t, i) => (
            <View key={`trophy-${t?.id || i}`} style={{ width: 80 }}>
              <TrophyCard
                key={t.id}
                id={t.id}
                title={t.title}
                icon={t.icon}
                unlocked={unlockedTrophies.includes(t.id)}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default ProfileTrophies;
