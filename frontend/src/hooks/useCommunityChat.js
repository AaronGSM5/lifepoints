import { useCallback, useState } from "react";

import { useChatTimeline } from "./useChatTimeline";

export const useCommunityChat = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const chatMessages = useChatTimeline(messages);


  const sendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const now = new Date();
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: "me",
      createdAt: now.toISOString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText("");
  }, [inputText]);

  return {
    chatMessages, inputText, setInputText, sendMessage
  }
}