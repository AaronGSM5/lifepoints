import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

const DUMMY_MESSAGES = [
  { id: "1", text: "Hey Leute, willkommen in der Community! 🎉", senderId: "system", time: "10:00" },
  { id: "2", text: "Moin! Wer ist heute beim Workout dabei?", senderId: "user2", senderName: "Alex", time: "10:05" },
  { id: "3", text: "Ich bin am Start! 💪", senderId: "me", time: "10:06" }
];

export default function MyCommunityChatScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const myCommunities = useStore((state) => state.myCommunities);

  const community = useMemo(() => myCommunities.find((c) => c._id === id) || {}, [id, myCommunities]);

  const [messages, setMessages] = useState([...DUMMY_MESSAGES].reverse());
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const openDetails = useCallback(() => {
    router.push(`/mycommunity/${id}/details`);
  }, [id, router]);

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

  const renderMessage = useCallback(({ item }) => <ChatMessageItem item={item} />, []);

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
            <View style={[styles.iconBox, { backgroundColor: community?.color }]}>
              <MaterialIcons name={community?.icon} size={20} color="#fff" />
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
          inverted
          ref={flatListRef}
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
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  });
