import { memo, useCallback } from "react";
import { View } from "react-native";

import TrophyCard from "./TrophyCard";

const TrophyGridItem = memo(({ item, userTrophy, isJustUnlocked, onAnimationComplete, cardWidth }) => {
  const isUnlocked = userTrophy?.unlocked || false;

  const handleAnimationComplete = useCallback(() => {
    if (onAnimationComplete) {
      onAnimationComplete(item.id);
    }
  }, [onAnimationComplete, item.id]);

  return (
    <View style={{ width: cardWidth }}>
      <TrophyCard
        id={item.id}
        title={item.title}
        icon={item.icon}
        unlocked={isUnlocked}
        justUnlocked={isJustUnlocked}
        onAnimationComplete={handleAnimationComplete}
        cardWidth={cardWidth}
      />
    </View>
  );
});
TrophyGridItem.displayName = "TrophyGridItem";

export default TrophyGridItem;
