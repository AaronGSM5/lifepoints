import React from "react";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { View } from "react-native";

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
