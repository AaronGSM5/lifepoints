import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const MyCommunityCardSkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.communityCard}>
      <AppSkeleton width={44} height={44} radius={Spacing.borderRadius.md} />
      <View style={styles.skeletonBottomContainer}>
        <AppSkeleton width={100} height={16} />
        <View style={styles.skeletonSpacer} />
        <AppSkeleton width={60} height={12} />
      </View>
    </BaseCard>
  );
};

export default MyCommunityCardSkeleton;
