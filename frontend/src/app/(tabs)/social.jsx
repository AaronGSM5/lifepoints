import React, { useMemo, useState } from "react";
import { Animated, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ConnectTab from "@/components/social/ConnectTab";
import ExploreTab from "@/components/social/ExploreTab";
import NavigationRow from "@/components/tasks/NavigationRow";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

const TABS = ["Connect", "Explore"];

const SocialScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const toolbarHeight = useToolbarPadding();

  const renderActiveTab = () => {
    switch (activeTabIndex) {
      case 0:
        return <ConnectTab />;
      case 1:
        return <ExploreTab scrollY={scrollY} />;
      default:
        return <ConnectTab />;
    }
  };

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false}>
      <View
        style={{
          position: "absolute",
          top: toolbarHeight,
          left: 0,
          right: 0,
          zIndex: 10
        }}
        pointerEvents="box-none"
      >
        <NavigationRow tabs={TABS} activeIndex={activeTabIndex} onTabChange={setActiveTabIndex} />
      </View>
      {renderActiveTab()}
    </ScreenWrapper>
  );
};

export default SocialScreen;
