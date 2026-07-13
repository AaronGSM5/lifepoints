import { memo, useCallback } from "react";
import { View } from "react-native";

import CustomizablesCard from "./CustomizablesCard";

const CustomizablesGridItem = memo(
  ({ item, categoryKey, isActive, isUnlocked, isJustUnlocked, exactCardWidth, onSelect, onClearAnimation }) => {
    const handlePress = useCallback(() => {
      if (isUnlocked) {
        onSelect(categoryKey, item.id);
      }
    }, [isUnlocked, onSelect, categoryKey, item.id]);

    const handleAnimationComplete = useCallback(() => {
      onClearAnimation(item.id);
    }, [onClearAnimation, item.id]);

    return (
      <View style={{ width: exactCardWidth }}>
        <CustomizablesCard
          id={item.id}
          name={item.name}
          icon={item.icon}
          color={item.color}
          isActive={isActive}
          unlocked={isUnlocked}
          justUnlocked={isJustUnlocked}
          onAnimationComplete={handleAnimationComplete}
          onPress={handlePress}
        />
      </View>
    );
  }
);
CustomizablesGridItem.displayName = "CustomizablesGridItem";

export default CustomizablesGridItem;
