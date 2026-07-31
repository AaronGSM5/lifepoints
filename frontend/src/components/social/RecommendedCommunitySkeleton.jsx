import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const SKELETON_AVATARS = [0, 1, 2];

const RecommendedCommunitySkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <AppSkeleton width={40} height={40} radius={Spacing.borderRadius.md} />
      </View>

      <View style={styles.contentArea}>
        <AppSkeleton width="70%" height={20} />
        <View style={styles.spacerSM} />
        <AppSkeleton height={14} />
        <View style={styles.spacerXS} />
        <AppSkeleton width="80%" height={14} />
      </View>

      <View style={styles.footerRow}>
        <View style={styles.socialProof}>
          <View style={styles.facepile}>
            {SKELETON_AVATARS.map((index) => (
              <View
                key={`skeleton-avatar-${index}`}
                style={[
                  styles.avatar,
                  styles.skeletonAvatar,
                  { zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 },
                  index > 0 && { marginLeft: -10 }
                ]}
              >
                <AppSkeleton width={20} height={20} radius={10} />
              </View>
            ))}
          </View>

          <AppSkeleton width={80} height={12} />
        </View>
      </View>
    </BaseCard>
  );
};

export default RecommendedCommunitySkeleton;
