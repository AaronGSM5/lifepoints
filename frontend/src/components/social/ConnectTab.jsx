import { useMemo } from "react";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

import CreateCommunityCard from "./CreateCommunityCard";
import AppImage from "../ui/AppImage";
import AppText from "../ui/AppText";

const MOCK_COMMUNITIES = [
  { id: "1", name: "React Native Devs", members: 124, image: "https://picsum.photos/200" }
  // { id: "2", name: "Design Thinkers", members: 89, image: "https://picsum.photos/201" }
  // { id: "3", name: "Local Runners", members: 42, image: "https://picsum.photos/202" },
  // { id: "4", name: "Startup Founders", members: 210, image: "https://picsum.photos/203" }
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

  const contentPaddingTop = toolbarHeight + Spacing.xl + 4;

  const data = useMemo(() => {
    return [...MOCK_COMMUNITIES, { id: "create-card-marker", isCreateCard: true }];
  }, []);

  const renderCommunityCard = ({ item }) => {
    if (item.isCreateCard) {
      return <CreateCommunityCard />;
    }

    return (
      <TouchableOpacity style={styles.communityCard} activeOpacity={0.8}>
        <AppImage source={item.image} style={styles.communityImage} />
        <View style={styles.communityOverlay}>
          <AppText bold numberOfLines={1}>
            {item.name}
          </AppText>
          <AppText type="caption">{item.members} Members</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
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
            <TouchableOpacity key={chat.id} style={styles.chatRow} activeOpacity={0.7}>
              <AppImage source={{ uri: chat.avatar }} style={styles.chatAvatar} />

              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <AppText bold>{chat.userName}</AppText>
                  <AppText type="caption" style={{ color: MyTheme.muted }}>
                    {chat.time}
                  </AppText>
                </View>

                <View style={styles.chatFooter}>
                  <AppText
                    type="body"
                    numberOfLines={1}
                    style={[styles.lastMessage, chat.unread > 0 && { color: MyTheme.text, fontWeight: "bold" }]}
                  >
                    {chat.lastMessage}
                  </AppText>

                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <AppText bold style={styles.unreadText}>
                        {chat.unread}
                      </AppText>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.xl
    },
    horizontalListContent: {
      paddingHorizontal: Spacing.lg,
      gap: Spacing.md
    },
    communityCard: {
      width: 150,
      height: 180,
      borderRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      backgroundColor: theme.glas
    },
    communityImage: {
      width: "100%",
      height: "100%",
      position: "absolute"
    },
    communityOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.sm,
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    chatList: {
      paddingHorizontal: Spacing.md
    },
    chatRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
    },
    chatAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: Spacing.md,
      backgroundColor: theme.glas
    },
    chatInfo: {
      flex: 1,
      justifyContent: "center"
    },
    chatHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    },
    chatFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    lastMessage: {
      flex: 1,
      color: theme.muted,
      marginRight: Spacing.md
    },
    unreadBadge: {
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.borderRadius.full,
      minWidth: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 6
    },
    unreadText: {
      color: "black",
      fontSize: 12
    }
  });

export default ConnectTab;
