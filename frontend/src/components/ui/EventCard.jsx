import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppImage from "@/components/ui/AppImage";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

// Kompakte Event-Karte als ruhiger Ersatz für ein Hero-Karussell (Today, Explore)
const EventCard = memo(({ event, label, onPress, style }) => {
  const MyTheme = useAppTheme();
  if (!event) return null;

  return (
    <BaseCard padding={0} onPress={onPress} style={style} accessibilityLabel={event.title}>
      <View style={styles.row}>
        <View style={styles.thumb}>
          <AppImage source={event.image} variant="fill" contentFit="cover" />
        </View>
        <View style={styles.text}>
          {label && (
            <AppText type="labelSm" style={{ color: MyTheme.secondaryAccent }}>
              {label}
            </AppText>
          )}
          <AppText type="title" numberOfLines={1}>
            {event.title}
          </AppText>
        </View>
        {onPress && <Icon name="right" color={MyTheme.muted} />}
      </View>
    </BaseCard>
  );
});
EventCard.displayName = "EventCard";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingRight: Spacing.md
  },
  thumb: {
    width: 88,
    height: 64,
    overflow: "hidden"
  },
  text: {
    flex: 1,
    gap: Spacing.xs
  }
});

export default EventCard;
