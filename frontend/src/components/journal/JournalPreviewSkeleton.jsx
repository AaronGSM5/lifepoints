import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";
import SectionHeader from "../ui/SectionHeader";

const JournalPreviewSkeleton = ({ renderData, styles }) => {
  const { t } = useTranslation("profile");
  return (
    <View>
      <SectionHeader title={t("My Impact Journal")} icon={"journal"} rightLabel={t("More")} isLoading={true} />
      <View style={styles.container}>
        {renderData.map((item, i) => (
          <BaseCard key={item.id || `skel-${i}`} style={styles.activityItem} padding={Spacing.sm}>
            <View style={[styles.iconCircle, { backgroundColor: "transparent" }]}>
              <AppSkeleton width={40} height={40} radius="round" />
            </View>

            <View style={styles.textContainer}>
              <View style={{ marginBottom: Spacing.xs }}>
                <AppSkeleton width="60%" height={16} radius={4} />
              </View>
              <AppSkeleton width="35%" height={12} radius={4} />
            </View>

            <AppSkeleton width={40} height={16} radius={4} />
          </BaseCard>
        ))}
      </View>
    </View>
  );
};

export default JournalPreviewSkeleton;
