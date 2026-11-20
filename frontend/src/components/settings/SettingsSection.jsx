import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import BaseCard from "@/components/ui/BaseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";

// Einheitlicher Sektions-Block für Settings-Pages: Überschrift + Inhalt (optional in einer Card)
const SettingsSection = memo(({ title, children, card = true, cardProps, style }) => (
  <View style={[styles.section, style]}>
    {title && <SectionHeader title={title} />}
    {card ? <BaseCard {...cardProps}>{children}</BaseCard> : children}
  </View>
));
SettingsSection.displayName = "SettingsSection";

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl
  }
});

export default SettingsSection;
