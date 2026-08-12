import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageList from "@/components/chat/ChatMessageList";
import CommunityChatHeader from "@/components/chat/CommunityChatHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { useCommunityChat } from "@/hooks/useCommunityChat";
import { DUMMY_MESSAGES } from "@/mocks/CommunityChat";
import useStore from "@/store/useStore";

export default function MyCommunityChatScreen() {
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

      <CommunityChatHeader
        community={community}
        onDetailsPress={openDetails}
        onOptionsPress={() => console.log("mock options")}
      />

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <ChatMessageList
          chatMessages={chatMessages}
          showSenderName={true}
          contentContainerStyle={styles.chatListContent}
        />
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

const styles = StyleSheet.create({
  chatListContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl
  }
});
