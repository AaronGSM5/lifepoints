import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";

const ProfileHeaderSkeleton = ({ styles }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ height: Spacing.sm }} />
      <AppSkeleton width={80} height={14} />
      <View style={{ height: Spacing.sm }} />
      <AppSkeleton width={180} height={24} />
      <View style={{ height: Spacing.sm }} />
      <AppSkeleton width={120} height={14} />
      <View style={{ height: Spacing.xl }} />
      <AppSkeleton width={160} height={14} />

      <View style={styles.actionButtons}>
        <AppSkeleton width={130} height={44} radius={Spacing.borderRadius.full} />
        <AppSkeleton width={130} height={44} radius={Spacing.borderRadius.full} />
      </View>
    </View>
  );
};

export default ProfileHeaderSkeleton;
