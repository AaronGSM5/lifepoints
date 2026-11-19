import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getAuthorProfile } from "@/mocks/PublicRoutines";

// Publisher einer Routine; Tap öffnet das öffentliche Profil.
// plain: nur der Name in normaler Textfarbe (z. B. auf Karten), sonst "by @username" in Akzentfarbe.
const RoutineAuthorLink = memo(({ username, subtitle, showAvatar = true, plain = false, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const author = useMemo(() => getAuthorProfile(username), [username]);

  const handlePress = useCallback(() => router.push(`/user/${username}`), [username]);

  if (!author) return null;

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      accessibilityRole="link"
      style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}
    >
      {showAvatar && <Avatar source={author.avatar} name={author.name} size="small" />}
      <View style={styles.textColumn}>
        <AppText bold numberOfLines={1} style={plain ? undefined : styles.username}>
          {plain ? author.name : t("by @{{username}}", { username: author.username })}
        </AppText>
        {subtitle ? (
          <AppText type="caption" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
});
RoutineAuthorLink.displayName = "RoutineAuthorLink";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      flexShrink: 1
    },
    pressed: {
      opacity: 0.7
    },
    textColumn: {
      flexShrink: 1
    },
    username: {
      color: theme.primaryAccent
    }
  });

export default RoutineAuthorLink;
