import { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

import ChatListItem from "./ChatListItem";
import CreateCommunityCard from "./CreateCommunityCard";
import MyCommunityCard from "./MyCommunityCard";
import CreateCommunityForm from "../forms/community/CreateCommunityForm";

const MOCK_COMMUNITIES = [
  { id: "1", title: "React Native Devs", members: 124, onlineCount: 21, icon: "leaf", hasUnread: false },
  { id: "2", title: "Design Thinkers", members: 89, onlineCount: 4, icon: "music", hasUnread: true }
];

const MOCK_CHATS = [
  {
    id: "1",
    userName: "Emilia",
    lastMessage: "Hey, hast du schon die neuen Designs gesehen?",
    time: "11:20",
    unread: 2,
    avatar: "https://picsum.photos/100"
  },
  {
    id: "2",
    userName: "Max",
    lastMessage: "Lass uns später über das Layout sprechen.",
    time: "Gestern",
    unread: 0,
    avatar: "https://picsum.photos/101"
  },
  {
    id: "3",
    userName: "Sarah (Design)",
    lastMessage: "Super, danke dir! 🙌",
    time: "Gestern",
    unread: 0,
    avatar: "https://picsum.photos/102"
  },
  {
    id: "4",
    userName: "Alex",
    lastMessage: "Geht klar.",
    time: "Montag",
    unread: 0,
    avatar: "https://picsum.photos/103"
  }
];

const ConnectTab = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const toolbarHeight = useToolbarPadding();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const handleCreateCommunity = useCallback(() => setIsCreateModalVisible(true), []);
  const handleNavigation = useCallback((id) => router.push(`/mycommunity/${id}`), []);

  const contentPaddingTop = toolbarHeight + Spacing.xl + 4;

  const data = useMemo(() => {
    return [...MOCK_COMMUNITIES, { id: "create-card-marker", isCreateCard: true }];
  }, []);

  const renderCommunityCard = ({ item }) => {
    if (item.isCreateCard) {
      return <CreateCommunityCard onPress={handleCreateCommunity} />;
    }

    return <MyCommunityCard item={item} onPress={() => handleNavigation(item.id)} />;
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: contentPaddingTop, paddingBottom: Spacing.xl }}
      >
        <View style={styles.section}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderCommunityCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            snapToInterval={150 + Spacing.md}
            decelerationRate="fast"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.chatList}>
            {MOCK_CHATS.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} onPress={() => router.push(`/chat/${chat.id}`)} />
            ))}
          </View>
        </View>
      </ScrollView>
      <CreateCommunityForm visible={isCreateModalVisible} onClose={() => setIsCreateModalVisible(false)} />
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.lg
    },
    horizontalListContent: {
      paddingHorizontal: Spacing.lg,
      gap: Spacing.md
    },
    chatList: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.xl
    }
  });

export default ConnectTab;
