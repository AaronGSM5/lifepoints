import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import Separator from "../ui/Separator";

const FeedItemSkeleton = ({ styles }) => {
  return (
    <>
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonHeader}>
          <AppSkeleton radius="round" width={32} height={32} />
          <AppSkeleton width={120} height={12} />
        </View>
        <AppSkeleton height={350} />
        <View style={styles.skeletonFooter}>
          <View style={{ flexDirection: "row", gap: Spacing.lg }}>
            <AppSkeleton width={24} height={24} radius="round" />
            <AppSkeleton width={24} height={24} radius="round" />
          </View>
          <AppSkeleton width="80%" height={12} />
        </View>
      </View>
      <Separator />
    </>
  );
};

export default FeedItemSkeleton;
