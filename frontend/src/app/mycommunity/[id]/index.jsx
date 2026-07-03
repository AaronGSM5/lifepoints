import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCommunities } from "@/hooks/useCommunities";

const DUMMY_MESSAGES = [
  { id: "1", text: "Hey Leute, willkommen in der Community! 🎉", senderId: "system", time: "10:00" },
  { id: "2", text: "Moin! Wer ist heute beim Workout dabei?", senderId: "user2", senderName: "Alex", time: "10:05" },
  { id: "3", text: "Ich bin am Start! 💪", senderId: "me", time: "10:06" }
];

export default function MyCommunityChatScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("community");
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { recommended, myCommunities } = useCommunities();

  const community = recommended.find((c) => c.id === id) || myCommunities.find((c) => c.id === id);

  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const openDetails = () => {
    router.push(`/mycommunity/${id}/details`);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.senderId === "me";
    const isSystem = item.senderId === "system";

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <AppText type="caption" bold style={styles.systemMessageText}>
            {item.text}
          </AppText>
        </View>
      );
    }

    return (
      <View style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowOther]}>
        {!isMe && (
          <View style={styles.avatar}>
            <AppText bold style={styles.avatarText}>
              {item.senderName?.charAt(0)}
            </AppText>
          </View>
        )}
        <View style={[styles.messageBubble, isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
          {!isMe && (
            <AppText bold type="caption" style={styles.senderName}>
              {item.senderName}
            </AppText>
          )}
          <AppText style={{ color: isMe ? "#fff" : MyTheme.text }}>{item.text}</AppText>
          <AppText type="caption" style={[styles.timeText, isMe && { color: "rgba(255,255,255,0.7)" }]}>
            {item.time}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.customHeader, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Icon name="back" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openDetails} style={styles.headerTitleContainer} activeOpacity={0.7}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
            <View style={[styles.iconBox, { backgroundColor: community.color }]}>
              <MaterialIcons name={community.icon} size={20} color="#fff" />
            </View>
            <AppText bold>{community?.title || "Community Chat"}</AppText>
          </View>
          <AppText type="caption" style={styles.headerSubtitleText}>
            {t("Tap for more info")}
          </AppText>
        </TouchableOpacity>

        <View style={styles.headerIcon} />
      </View>

      <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false} withToolbar={false}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log("attach file or something")} style={styles.attachButton}>
            <Icon name="add" color={MyTheme.muted} />
          </TouchableOpacity>
          <AppInput
            placeholder={t("Write a message...")}
            value={inputText}
            onChangeText={setInputText}
            containerStyle={{ flex: 8 }}
            bottomMargin={false}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!inputText.trim()}>
            <Icon name="send" size={20} color={inputText.trim() ? MyTheme.primaryAccent : MyTheme.muted} />
          </TouchableOpacity>
        </View>
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
      width: 60,
      alignItems: "center"
    },
    headerTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      gap: Spacing.md
    },
    headerSubtitleText: {
      fontSize: 13
    },
    chatListContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl
    },
    systemMessageContainer: {
      alignItems: "center",
      marginVertical: Spacing.md
    },
    systemMessageText: {
      backgroundColor: theme.glas,
      paddingHorizontal: Spacing.md,
      paddingVertical: 4,
      borderRadius: Spacing.borderRadius.md
    },
    messageRow: {
      flexDirection: "row",
      marginBottom: Spacing.md,
      alignItems: "flex-end"
    },
    messageRowMe: {
      justifyContent: "flex-end"
    },
    messageRowOther: {
      justifyContent: "flex-start"
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: "rgba(76, 150, 160, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: Spacing.sm
    },
    avatarText: {
      color: "#4C96A0",
      fontSize: 14
    },
    messageBubble: {
      maxWidth: "80%",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.lg
    },
    messageBubbleMe: {
      backgroundColor: theme.primaryAccent,
      borderBottomRightRadius: Spacing.borderRadius.sm - 4
    },
    messageBubbleOther: {
      backgroundColor: theme.primary,
      borderBottomLeftRadius: Spacing.borderRadius.sm - 4
    },
    senderName: {
      color: theme.primaryAccent,
      marginBottom: 2
    },
    timeText: {
      fontSize: 10,
      marginTop: 4,
      alignSelf: "flex-end",
      opacity: 0.6
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.glas,
      backgroundColor: theme.background
    },
    attachButton: {
      flex: 1,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center"
    },
    sendButton: {
      flex: 1,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center"
    },
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  });
