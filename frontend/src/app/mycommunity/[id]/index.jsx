import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageList from "@/components/chat/ChatMessageList";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCommunityChat } from "@/hooks/useCommunityChat";
import { DUMMY_MESSAGES } from "@/mocks/CommunityChat";
import useStore from "@/store/useStore";

export default function MyCommunityChatScreen() {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("chat");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { chatMessages, inputText, setInputText, sendMessage } = useCommunityChat(DUMMY_MESSAGES);
  const myCommunities = useStore((state) => state.myCommunities);
  const community = useMemo(() => myCommunities.find((c) => c._id === id) || {}, [id, myCommunities]);

  const openDetails = useCallback(() => {
    router.push(`/mycommunity/${id}/details`);
  }, [id, router]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.customHeader, { paddingTop: insets.top }]}>
        <BackButton style={styles.headerIcon} />

        <TouchableOpacity onPress={openDetails} style={styles.headerTitleContainer} activeOpacity={0.7}>
          <View style={styles.titleRow}>
            {community?.icon && (
              <View style={[styles.iconBox, { backgroundColor: community?.color }]}>
                <Icon name={community.icon} size={20} />
              </View>
            )}
            <AppText bold>{community?.title || "Community Chat"}</AppText>
          </View>
          <AppText type="caption">{t("Tap for more info")}</AppText>
        </TouchableOpacity>

        <Icon name="dots" onPress={() => console.log("Options")} style={styles.headerIcon} />
      </View>

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <ChatMessageList chatMessages={chatMessages} showSenderName contentContainerStyle={styles.chatListContent} />
        <ChatInputBar
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          onAttach={() => console.log("Open Attach Menu")}
          placeholder={t("Write a message...")}
        />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    customHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.glas
    },
    headerIcon: {
      padding: Spacing.md,
      minWidth: 50
    },
    headerTitleContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      gap: Spacing.xs - 2
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    chatListContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl
    },
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center"
    }
  });
