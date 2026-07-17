import { View } from "react-native";

import AppSkeleton from "@/components/ui/AppSkeleton";
import { Spacing } from "@/constants/Spacing";

const EditProfileSkeleton = ({ styles }) => {
  return (
    <>
      <View style={styles.inputSkeleton}>
        <AppSkeleton height={56} radius={Spacing.borderRadius.md} />
      </View>
      <View style={styles.inputSkeleton}>
        <AppSkeleton height={56} radius={Spacing.borderRadius.md} />
      </View>
      <View style={styles.inputSkeleton}>
        <AppSkeleton height={100} radius={Spacing.borderRadius.md} />
      </View>
    </>
  );
};

export default EditProfileSkeleton;
