import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import NavigationRow from "@/components/tasks/NavigationRow";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

/**
 * Tab-Screen mit Segment-Switch direkt unter der Toolbar.
 * Der Switch liegt im normalen Layout-Fluss: Der Inhalt darunter beginnt automatisch
 * unterhalb des Switches und kann beim Scrollen nicht zwischen Toolbar und Switch durchscheinen.
 * Inhalte nutzen AnimatedScreenList mit withTopPadding={false}.
 */
export default function SegmentedTabScreen({ tabs, activeIndex, onTabChange, scrollY, children }) {
  const insets = useSafeAreaInsets();
  const toolbarHeight = useToolbarPadding() - insets.top;

  return (
    <ScreenWrapper variant="list" scrollY={scrollY} scrollable={false}>
      <View style={{ paddingTop: toolbarHeight }}>
        <NavigationRow tabs={tabs} activeIndex={activeIndex} onTabChange={onTabChange} />
      </View>
      <View style={styles.content}>{children}</View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});
