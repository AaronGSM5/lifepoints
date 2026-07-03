import React from "react";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";

const ScreenTitle = ({ title, subtitle }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <AppText type="h1" style={{ marginBottom: Spacing.md }}>
        {title}
      </AppText>
      {subtitle && (
        <AppText type="caption" style={{ fontSize: 15 }}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
};

export default ScreenTitle;
