import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageList from "@/components/chat/ChatMessageList";
import UserChatHeader from "@/components/chat/UserChatHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { useUserChat } from "@/hooks/useUserChat";
import { DUMMY_MESSAGES, mockChatPartner } from "@/mocks/UserChat";

const UserChatScreen = () => {
  const { t } = useTranslation("chat");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { chatMessages, inputText, setInputText, sendMessage } = useUserChat(DUMMY_MESSAGES);

  const openProfile = useCallback(() => {
    router.push(`/user/${id}`);
  }, [router, id]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <UserChatHeader
        mockChatPartner={mockChatPartner}
        onProfilePress={openProfile}
        onOptionsPress={() => console.log("open Options")}
      />

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <ChatMessageList chatMessages={chatMessages} contentContainerStyle={styles.chatListContent} />
        <ChatInputBar
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          placeholder={t("Write a message...")}
        />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatListContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl
  }
});

export default UserChatScreen;
