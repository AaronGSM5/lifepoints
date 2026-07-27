import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const FYTaskItemSkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.card} padding={0}>
      {/* Image */}
      <View style={[styles.cardImage, { padding: 0, overflow: "hidden" }]}>
        <AppSkeleton height={"100%"} radius={0} />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardInfoRow}>
          <View style={{ flex: 1, paddingRight: Spacing.sm }}>
            <View style={{ marginBottom: 4 }}>
              <AppSkeleton width="80%" height={20} />
            </View>
            <AppSkeleton width="80%" height={14} />
          </View>
          <AppSkeleton width={60} height={22} />
        </View>
        {/* Button */}
        <AppSkeleton height={44} radius={Spacing.borderRadius.lg} />
      </View>
    </BaseCard>
  );
};

export default FYTaskItemSkeleton;
