import { View } from "react-native";
import SectionHeader from "../ui/SectionHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import StatCard from "../ui/StatCard";
import { useTranslation } from "react-i18next";

const ProfileStats = ({ stats = [], isLoading }) => {
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
        {stats?.map((entry, index) => (
          <StatCard
            key={`stat-${index}`}
            isLoading={isLoading}
            label={t(entry.label)}
            value={entry.value}
            icon={entry.icon}
            color={entry.color}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileStats;
