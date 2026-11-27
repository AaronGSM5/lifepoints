import { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import { MOCK_CHATS } from "@/mocks/UserChat";
import useStore from "@/store/useStore";

import ChatListItem from "./ChatListItem";
import CreateCommunityCard from "./CreateCommunityCard";
import MyCommunityCard from "./MyCommunityCard";
import CreateCommunityForm from "../forms/community/CreateCommunityForm";

const CREATE_CARD_ID = "create-card-marker";
const getCommunityId = (community) => community?._id || community?.id;

const ConnectTab = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const toolbarHeight = useToolbarPadding();
  const myCommunities = useStore((state) => state.myCommunities);
  const createCommunity = useStore((state) => state.createCommunity);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const handleCreateCommunity = useCallback(() => setIsCreateModalVisible(true), []);
  const handleNavigation = useCallback((id) => router.push(`/community/${id}/chat`), []);

  const contentPaddingTop = toolbarHeight + Spacing.xl + 4;

  const data = useMemo(() => {
    return [...myCommunities, { id: CREATE_CARD_ID, isCreateCard: true }];
  }, [myCommunities]);

  const renderCommunityCard = ({ item }) => {
    if (item.isCreateCard) {
      return <CreateCommunityCard onPress={handleCreateCommunity} />;
    }

    return <MyCommunityCard item={item} onPress={() => handleNavigation(getCommunityId(item))} />;
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
            keyExtractor={(item) => String(getCommunityId(item))}
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
      <CreateCommunityForm
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={createCommunity}
      />
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
