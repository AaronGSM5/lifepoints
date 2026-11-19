import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import AppButton from "@/components/ui/AppButton";
import EmptyView from "@/components/ui/EmptyView";
import HorizontalRail, { RAIL_TILE_WIDTH } from "@/components/ui/HorizontalRail";
import { SEGMENT_OFFSET } from "@/components/ui/NavigationRow";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { MOCK_CHATS } from "@/mocks/UserChat";
import useStore from "@/store/useStore";

import ChatListItem from "./ChatListItem";
import CreateCommunityCard from "./CreateCommunityCard";
import MyCommunityCard from "./MyCommunityCard";
import CreateCommunityForm from "../forms/community/CreateCommunityForm";

const CREATE_CARD = { id: "create-card-marker", isCreateCard: true };

const getCommunityId = (community) => community?._id || community?.id;

const ConnectTab = ({ scrollY, onExplore }) => {
  const { t } = useTranslation("community");
  const myCommunities = useStore((state) => state.myCommunities);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const handleCreateCommunity = useCallback(() => setIsCreateModalVisible(true), []);
  const handleOpenCommunity = useCallback((community) => router.push(`/mycommunity/${getCommunityId(community)}`), []);
  const handleOpenChat = useCallback((chat) => router.push(`/chat/${chat.id}`), []);

  const listData = useMemo(() => {
    const items = [
      { id: "communities", type: "communities" },
      { id: "chats_header", type: "chats_header" }
    ];

    if (!MOCK_CHATS.length) {
      items.push({ id: "chats_empty", type: "chats_empty" });
    } else {
      MOCK_CHATS.forEach((chat) => items.push({ id: `chat_${chat.id}`, type: "chat", chat }));
    }
    return items;
  }, []);

  const communityRailData = useMemo(() => [...myCommunities, CREATE_CARD], [myCommunities]);

  const renderCommunityCard = useCallback(
    ({ item }) => {
      if (item.isCreateCard) return <CreateCommunityCard onPress={handleCreateCommunity} />;
      return <MyCommunityCard item={item} onPress={() => handleOpenCommunity(item)} />;
    },
    [handleCreateCommunity, handleOpenCommunity]
  );

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "communities":
          if (!myCommunities.length) {
            return (
              <View style={[styles.paddedContent, styles.topOffset]}>
                <SectionHeader title={t("My Communities")} />
                <EmptyView
                  icon="globe"
                  iconSize={24}
                  title={t("No communities yet")}
                  description={t("Join a community to grow together with people who share your goals.")}
                  actionTitle={onExplore ? t("Discover communities") : undefined}
                  onAction={onExplore}
                  containerStyle={styles.compactEmpty}
                >
                  <AppButton
                    variant="secondary"
                    size="sm"
                    title={t("Create community")}
                    onPress={handleCreateCommunity}
                  />
                </EmptyView>
              </View>
            );
          }
          return (
            <HorizontalRail
              title={t("My Communities")}
              style={styles.topOffset}
              data={communityRailData}
              itemWidth={RAIL_TILE_WIDTH}
              keyExtractor={(community) => String(getCommunityId(community))}
              renderItem={renderCommunityCard}
            />
          );

        case "chats_header":
          return <SectionHeader title={t("Chats")} style={styles.paddedContent} />;

        case "chats_empty":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="chat"
                iconSize={24}
                title={t("No chats yet")}
                description={t("Start a conversation from a profile or community.")}
              />
            </View>
          );

        case "chat":
          return (
            <View style={styles.paddedContent}>
              <ChatListItem chat={item.chat} onPress={() => handleOpenChat(item.chat)} />
            </View>
          );

        default:
          return null;
      }
    },
    [myCommunities.length, t, onExplore, handleCreateCommunity, communityRailData, renderCommunityCard, handleOpenChat]
  );

  return (
    <>
      <AnimatedScreenList
        scrollY={scrollY}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        withTopPadding={false}
      />
      <CreateCommunityForm visible={isCreateModalVisible} onClose={() => setIsCreateModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  paddedContent: {
    paddingHorizontal: Spacing.md
  },
  topOffset: {
    marginTop: SEGMENT_OFFSET
  },
  compactEmpty: {
    minHeight: 0
  }
});

export default ConnectTab;
