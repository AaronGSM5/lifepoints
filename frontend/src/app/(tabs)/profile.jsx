import { View, ScrollView } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import TrophyCard from "@/components/trophies/TrophyCard";
import JournalPreview from "@/components/journal/JournalPreview";
import StatCard from "@/components/ui/StatCard";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import SectionHeader from "@/components/ui/SectionHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileScreen() {
  const { profile, activities, trophies, isLoading } = useProfile();

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  return (
    <ScreenWrapper scrollable>
      <ProfileHeader profile={profile} skeletonProps={skeletonProps} isLoading={isLoading} />

      <OnboardingGuide skeletonProps={skeletonProps} isLoading={isLoading} />

      <View style={{ marginTop: Spacing.xl }}>
        <SectionHeader
          title={"Your Stats"}
          icon={"statsChart"}
          iconColor={MyTheme.primaryAccent}
          isLoading={isLoading}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}>
          <StatCard isLoading={isLoading} label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
          <StatCard
            isLoading={isLoading}
            label="TOTAL POINTS"
            value="12.4k"
            icon="gem"
            color="#007ec7"
            badge="Top 5%"
          />
          <StatCard isLoading={isLoading} label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
          <StatCard isLoading={isLoading} label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
        </View>
      </View>

      <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
        <SectionHeader
          title={"Trophies"}
          icon={"trophy"}
          iconColor={MyTheme.gold}
          rightLabel={"See all"}
          rightLabelColor={MyTheme.gold}
          onRightPress={() => router.push("/trophies")}
          isLoading={isLoading}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md }}>
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <Skeleton key={i} {...skeletonProps} width={80} height={80} radius={Spacing.borderRadius.lg} />
              ))
            : trophies.map((t, i) => (
                <View key={i} style={{ width: 80 }}>
                  <TrophyCard key={i} id={t.id} title={t.title} icon={t.icon} unlocked={t.unlocked} />
                </View>
              ))}
        </ScrollView>
      </View>

      <View>
        <SectionHeader
          title={"My Impact Journal"}
          icon={"journal"}
          rightLabel={"More"}
          onRightPress={() => router.push("/journal")}
          isLoading={isLoading}
        />
        <JournalPreview activities={activities} skeletonProps={skeletonProps} isLoading={isLoading} />
      </View>
    </ScreenWrapper>
  );
}
