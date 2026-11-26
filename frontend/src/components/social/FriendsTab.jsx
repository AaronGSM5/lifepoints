import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import InviteFriendCard from "@/components/profile/InviteFriendCard";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import BaseCard from "@/components/ui/BaseCard";
import EmptyView from "@/components/ui/EmptyView";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { publicProfiles } from "@/mocks/PublicProfile";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";

// MVP: Profile kommen bis zum Backend aus den Mock-Daten (`publicProfiles`)
const FriendRow = memo(({ user, isFollowing, onToggleFollow }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("profile");

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.rowUser}
        onPress={() => router.push(`/user/${user.username}`)}
        accessibilityRole="link"
        accessibilityLabel={user.name}
      >
        <Avatar source={user.avatar ? { uri: user.avatar } : null} name={user.name} />
        <View style={styles.rowText}>
          <AppText bold numberOfLines={1}>
            {user.name}
          </AppText>
          <AppText type="caption" numberOfLines={1} style={{ color: MyTheme.muted }}>
            @{user.username} • LVL {user.level}
          </AppText>
        </View>
      </Pressable>
      <AppButton
        size="sm"
        variant={isFollowing ? "outline" : "primary"}
        title={isFollowing ? t("Following") : t("Follow")}
        onPress={() => onToggleFollow(user)}
        accessibilityLabel={`${isFollowing ? t("Unfollow") : t("Follow")} ${user.name}`}
      />
    </View>
  );
});
FriendRow.displayName = "FriendRow";

export default function FriendsTab() {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("profile");
  const following = useStore((state) => state.profile?.friends || []);
  const myUsername = useStore((state) => state.profile?.username);
  const addFriend = useStore((state) => state.addFriend);
  const removeFriend = useStore((state) => state.removeFriend);
  const [searchQuery, setSearchQuery] = useState("");

  const followedUsers = useMemo(() => publicProfiles.filter((user) => following.includes(user.id)), [following]);
  const suggestions = useMemo(() => publicProfiles.filter((user) => !following.includes(user.id)), [following]);

  // Teilsuche über Anzeigename und Benutzername (ohne führendes @, Groß-/Kleinschreibung egal)
  const normalizedQuery = searchQuery.trim().replace(/^@/, "").toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const searchResults = useMemo(
    () =>
      isSearching
        ? publicProfiles.filter(
            (user) =>
              user.username.toLowerCase().includes(normalizedQuery) || user.name.toLowerCase().includes(normalizedQuery)
          )
        : [],
    [isSearching, normalizedQuery]
  );

  const handleToggleFollow = useCallback(
    (user) => {
      if (following.includes(user.id)) {
        removeFriend(user.id);
      } else {
        addFriend(user.id);
        triggerHaptic("success");
      }
    },
    [following, addFriend, removeFriend]
  );

  return (
    <View style={styles.container}>
      <View>
        <SectionHeader title={t("Find friends")} />
        <AppInput
          icon="search"
          placeholder={t("Search by name or username")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          rightIcon={isSearching ? "close" : undefined}
          onRightIconPress={() => setSearchQuery("")}
          rightIconLabel={t("Clear search")}
          bottomMargin={false}
          accessibilityLabel={t("Search by name or username")}
        />
      </View>

      {isSearching ? (
        <View>
          <SectionHeader title={`${t("Search results")} (${searchResults.length})`} />
          {searchResults.length === 0 ? (
            <EmptyView
              icon="search"
              iconColor={MyTheme.primaryAccent}
              iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
              iconSize={24}
              title={t("No users found")}
              description={t("Check the spelling or invite your friends to LifePoints.")}
            />
          ) : (
            <BaseCard>
              {searchResults.map((user) => (
                <FriendRow
                  key={user.id}
                  user={user}
                  isFollowing={following.includes(user.id)}
                  onToggleFollow={handleToggleFollow}
                />
              ))}
            </BaseCard>
          )}
        </View>
      ) : (
        <>
          <View>
            <SectionHeader title={`${t("Following")} (${followedUsers.length})`} />
            {followedUsers.length === 0 ? (
              <EmptyView
                icon="profile"
                iconColor={MyTheme.primaryAccent}
                iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
                iconSize={24}
                title={t("You are not following anyone yet")}
                description={t("Follow friends to see their good deeds in your feed.")}
              />
            ) : (
              <BaseCard>
                {followedUsers.map((user) => (
                  <FriendRow key={user.id} user={user} isFollowing onToggleFollow={handleToggleFollow} />
                ))}
              </BaseCard>
            )}
          </View>

          {suggestions.length > 0 && (
            <View>
              <SectionHeader title={t("Suggestions")} />
              <BaseCard>
                {suggestions.map((user) => (
                  <FriendRow key={user.id} user={user} isFollowing={false} onToggleFollow={handleToggleFollow} />
                ))}
              </BaseCard>
            </View>
          )}
        </>
      )}

      <InviteFriendCard referralCode={myUsername} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingVertical: Spacing.sm
  },
  rowUser: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md
  },
  rowText: {
    flex: 1
  }
});
