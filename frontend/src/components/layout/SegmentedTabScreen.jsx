import React from "react";
import { StyleSheet, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import NavigationRow from "@/components/ui/NavigationRow";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

// Gemeinsames Gerüst für Tabs mit Segmented Control (Tasks, Social).
// Die Inhalte rendern ihre Listen selbst und starten mit SEGMENT_OFFSET Abstand nach oben.
export default function SegmentedTabScreen({ tabs, activeIndex, onTabChange, scrollY, children }) {
  const toolbarHeight = useToolbarPadding();

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false}>
      <View style={[styles.segmentContainer, { top: toolbarHeight }]} pointerEvents="box-none">
        <NavigationRow tabs={tabs} activeIndex={activeIndex} onTabChange={onTabChange} />
      </View>
      {children}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  segmentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10
  }
});
