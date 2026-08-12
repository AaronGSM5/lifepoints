import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";

import ChatDateSeparator from "@/components/chat/ChatDateSeparator";
import ChatMessageItem from "@/components/chat/ChatMessageItem";

const viewabilityConfig = { itemVisiblePercentThreshold: 1 };

const ChatMessageList = ({ chatMessages, showSenderName = false, contentContainerStyle }) => {
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

  const renderMessage = useCallback(
    ({ item }) => (
      <View>
        {item.isFirstOfDay && <ChatDateSeparator label={item.dateLabel} />}
        <ChatMessageItem item={item} showSenderName={showSenderName} />
      </View>
    ),
    [showSenderName]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.floatingHeader, { opacity: fadeAnim }]}>
        <ChatDateSeparator label={topVisibleDate} />
      </Animated.View>

      <FlatList
        inverted
        data={chatMessages}
        keyExtractor={keyExtractor}
        renderItem={renderMessage}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        initialNumToRender={25}
        maxToRenderPerBatch={10}
        windowSize={11}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  floatingHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    pointerEvents: "none"
  }
});

export default ChatMessageList;
