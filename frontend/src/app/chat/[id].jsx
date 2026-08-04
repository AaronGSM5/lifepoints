import React, { useCallback, useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

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

const UserChatScreen = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const chatPartner = { name: "Emilia", avatar: "https://i.pravatar.cc/150?u=du", isOnline: true };

  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText("");
  };

  const openProfile = useCallback(() => {
    router.push(`/user/${id}`);
  }, [router, id]);

  const renderMessage = useCallback(({ item }) => <ChatMessageItem item={item} showSenderName={false} />, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <View style={styles.customHeader}>
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

        <FlatList
          inverted
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />
        <ChatInputBar
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          onAttach={() => console.log("Open Attach Menu")}
          placeholder="Nachricht schreiben..."
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
      padding: Spacing.md
    },
    headerTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
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
