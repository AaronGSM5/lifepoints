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
import Avatar from "@/components/ui/Avatar";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useUserChat } from "@/hooks/useUserChat";
import { DUMMY_MESSAGES, mockChatPartner } from "@/mocks/UserChat";

const UserChatScreen = () => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
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

      <View style={[styles.customHeader, { paddingTop: insets.top }]}>
        <BackButton style={styles.headerIcon} />

        <TouchableOpacity onPress={openProfile} style={styles.headerTitleContainer} activeOpacity={0.7}>
          <Avatar source={mockChatPartner.avatar} name={mockChatPartner.name} />
          <View>
            <AppText bold>{mockChatPartner.name}</AppText>
            {mockChatPartner.isOnline && (
              <AppText bold type="caption" style={styles.onlineStatus}>
                Online
              </AppText>
            )}
          </View>
        </TouchableOpacity>

        <Icon name="dots" onPress={() => console.log("Options")} style={styles.headerIcon} />
      </View>

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <ChatMessageList chatMessages={chatMessages} contentContainerStyle={styles.chatListContent} />
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
};

const getStyles = (theme) =>
  StyleSheet.create({
    customHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
    },
    headerIcon: {
      padding: Spacing.md,
      minWidth: 50
    },
    headerTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1,
      gap: Spacing.sm
    },
    onlineStatus: {
      color: theme.primaryAccent
    },
    chatListContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl
    }
  });

export default UserChatScreen;
