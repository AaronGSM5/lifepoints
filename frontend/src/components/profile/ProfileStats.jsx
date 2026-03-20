import { View } from "react-native";
import SectionHeader from "../ui/SectionHeader";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import StatCard from "../ui/StatCard";

const ProfileStats = ({ isLoading }) => {
  return (
    <View style={{ marginTop: Spacing.xl }}>
      <SectionHeader title={"Your Stats"} icon={"statsChart"} iconColor={MyTheme.primaryAccent} isLoading={isLoading} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}>
        <StatCard isLoading={isLoading} label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
        <StatCard isLoading={isLoading} label="TOTAL POINTS" value="12.4k" icon="gem" color="#007ec7" badge="Top 5%" />
        <StatCard isLoading={isLoading} label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
        <StatCard isLoading={isLoading} label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
      </View>
    </View>
  );
};

export default ProfileStats;
