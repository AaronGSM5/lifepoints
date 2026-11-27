import React, { useMemo, useState } from "react";
import { Animated } from "react-native";

import SegmentedTabScreen from "@/components/layout/SegmentedTabScreen";
import ConnectTab from "@/components/social/ConnectTab";
import ExploreTab from "@/components/social/ExploreTab";

const TABS = ["Connect", "Explore"];

const SocialScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);

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
    <SegmentedTabScreen tabs={TABS} activeIndex={activeTabIndex} onTabChange={setActiveTabIndex} scrollY={scrollY}>
      {renderActiveTab()}
    </SegmentedTabScreen>
  );
};

export default SocialScreen;
