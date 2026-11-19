import React, { useMemo, useState } from "react";
import { Animated } from "react-native";

import SegmentedTabScreen from "@/components/layout/SegmentedTabScreen";
import ConnectTab from "@/components/social/ConnectTab";
import ExploreTab from "@/components/social/ExploreTab";

const TABS = ["Connect", "Explore"];

const SocialScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  return (
    <SegmentedTabScreen tabs={TABS} activeIndex={activeTabIndex} onTabChange={setActiveTabIndex} scrollY={scrollY}>
      {activeTabIndex === 1 ? (
        <ExploreTab scrollY={scrollY} />
      ) : (
        <ConnectTab scrollY={scrollY} onExplore={() => setActiveTabIndex(1)} />
      )}
    </SegmentedTabScreen>
  );
};

export default SocialScreen;
