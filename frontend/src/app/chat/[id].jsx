import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ChatDateSeparator from "@/components/chat/ChatDateSeparator";
import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import BackButton from "@/components/ui/BackButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useUserChat } from "@/hooks/useUserChat";
import { DUMMY_MESSAGES, mockChatPartner } from "@/mocks/UserChat";

const viewabilityConfig = { itemVisiblePercentThreshold: 1 };

const UserChatScreen = () => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("chat");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { chatMessages, inputText, setInputText, sendMessage } = useUserChat(DUMMY_MESSAGES);
  const [topVisibleDate, setTopVisibleDate] = useState(() => chatMessages[0]?.dateLabel || null);
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const hideTimeout = useRef(null);
  const currentTopDateRef = useRef(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const sortedItems = [...viewableItems].sort((a, b) => b.index - a.index);
      const topItem = sortedItems[0]?.item;

      if (topItem && topItem.dateLabel) {
        if (currentTopDateRef.current !== topItem.dateLabel) {
          currentTopDateRef.current = topItem.dateLabel;
          setTopVisibleDate(topItem.dateLabel);
        }
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true
    }).start();

    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    hideTimeout.current = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    }, 250);
  }, [fadeAnim]);

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  const openProfile = useCallback(() => {
    router.push(`/user/${id}`);
  }, [router, id]);

  const renderMessage = useCallback(
    ({ item }) => (
      <View>
        {item.isFirstOfDay && <ChatDateSeparator label={item.dateLabel} />}
        <ChatMessageItem item={item} showSenderName={false} />
      </View>
    ),
    []
  );

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
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 10,
            opacity: fadeAnim,
            pointerEvents: "none"
          }}
        >
          <ChatDateSeparator label={topVisibleDate} />
        </Animated.View>
        <FlatList
          inverted
          data={chatMessages}
          keyExtractor={keyExtractor}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
          // performance optimizations
          initialNumToRender={25}
          maxToRenderPerBatch={10}
          windowSize={11}
          // scroll
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
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
