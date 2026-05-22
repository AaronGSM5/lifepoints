import { View } from "react-native";
import SectionHeader from "../ui/SectionHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import StatCard from "../ui/StatCard";
import { useTranslation } from "react-i18next";

const ProfileStats = ({ isLoading }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("profile");
  return (
    <View style={{ marginTop: Spacing.xl }}>
      <SectionHeader
        title={t("Your Stats")}
        icon={"statsChart"}
        iconColor={MyTheme.primaryAccent}
        isLoading={isLoading}
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}>
        <StatCard
          isLoading={isLoading}
          label={t("DAY STREAK")}
          value="45"
          icon="fire"
          color="#FF5733"
          badge="Best: 52"
        />
        <StatCard
          isLoading={isLoading}
          label={t("TOTAL POINTS")}
          value="12.4k"
          icon="gem"
          color="#007ec7"
          badge="Top 5%"
        />
        <StatCard
          isLoading={isLoading}
          label={t("BAD HABITS AVOIDED")}
          value="120"
          icon="ban"
          color="#900C3F"
          blurred
        />
        <StatCard isLoading={isLoading} label={t("MEMBER SINCE")} value="2023" icon="calendar" color="#581845" />
      </View>
    </View>
  );
};

export default ProfileStats;
