import React from "react";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";

const ScreenTitle = ({ title }) => {
  return (
    <AppText type="h1" style={{ marginBottom: Spacing.md }}>
      {title}
    </AppText>
  );
};

export default ScreenTitle;
