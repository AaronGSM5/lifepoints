import { View } from "react-native";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const TaskItemSkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.container}>
      <View style={styles.headerRow}>
        <AppSkeleton width={20} height={20} radius="round" />
        <AppSkeleton width={50} height={16} radius={4} />
      </View>
      <View style={styles.contentRow}>
        <AppSkeleton width="60%" height={22} radius={4} />
        <AppSkeleton height={14} radius={4} />
        <AppSkeleton width="80%" height={14} radius={4} />
      </View>
    </BaseCard>
  );
};

export default TaskItemSkeleton;
