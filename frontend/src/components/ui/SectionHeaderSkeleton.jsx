import { View } from "react-native";

import AppSkeleton from "./AppSkeleton";

const SectionHeaderSkeleton = ({ style, icon, rightLabel, styles }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftGroup}>
        {icon && <AppSkeleton width={24} height={24} radius="round" />}
        <AppSkeleton width={140} height={24} radius={4} />
      </View>
      {rightLabel && <AppSkeleton width={60} height={24} radius={4} />}
    </View>
  );
};

export default SectionHeaderSkeleton;
