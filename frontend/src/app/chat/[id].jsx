import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const DUMMY_MESSAGES = [
  { id: "3", text: "Klar, machen wir so! 🙌", senderId: "me", time: "14:32" },
  { id: "2", text: "Treffen wir uns später?", senderId: "otherUser", time: "14:30" },
  { id: "1", text: "Hey Aaron!", senderId: "otherUser", time: "14:28" }
];

const chatPartner = { name: "Emilia", avatar: "https://i.pravatar.cc/150?u=du", isOnline: true };

const UserChatScreen = () => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("chat");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState("");

  const sendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText("");
  }, [inputText]);

  const openProfile = useCallback(() => {
    router.push(`/user/${id}`);
  }, [router, id]);

  const renderMessage = useCallback(({ item }) => <ChatMessageItem item={item} showSenderName={false} />, []);

  const keyExtractor = useCallback((item) => item.id, []);

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
          <Avatar source={chatPartner.avatar} name={chatPartner.name} />
          <View>
            <AppText bold>{chatPartner.name}</AppText>
            {chatPartner.isOnline && (
              <AppText bold type="caption" style={styles.onlineStatus}>
                Online
              </AppText>
            )}
          </View>
        </TouchableOpacity>

        <Icon name="dots" color={MyTheme.text} onPress={() => console.log("Options")} style={styles.headerIcon} />
      </View>

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
          // performance optimizations
          initialNumToRender={25}
          maxToRenderPerBatch={10}
          windowSize={11}
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
