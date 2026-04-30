const { View, ScrollView } = require("react-native");
const { default: SectionHeader } = require("../ui/SectionHeader");
const { Spacing } = require("@/constants/Spacing");
const { MyTheme } = require("@/constants/Colors");
const { router } = require("expo-router");
const { Skeleton } = require("moti/skeleton");
const { default: TrophyCard } = require("../trophies/TrophyCard");

const ProfileTrophies = ({ isLoading, trophies, skeletonProps }) => {
  return (
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
              <TrophyCard key={t.id} id={t.id} title={t.title} icon={t.icon} unlocked={t.unlocked} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default ProfileTrophies;
