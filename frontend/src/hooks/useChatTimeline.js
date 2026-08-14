import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getDateLabel, isSameDay } from "@/utils/dateHelpers";

export const useChatTimeline = (messages) => {
  const { t, i18n } = useTranslation("chat");
  const currentLocale = i18n.language || "de-DE";

  const messagesWithDateGroups = useMemo(() => {
    return messages.map((msg, index) => {
      const olderMsg = messages[index + 1];
      const isFirstOfDay = !olderMsg || !isSameDay(msg.createdAt, olderMsg.createdAt);

      const dateLabel = getDateLabel(msg.createdAt, t, currentLocale);

      return {
        ...msg,
        isFirstOfDay,
        dateLabel
      };
    });
  }, [messages, t, currentLocale]);

  return messagesWithDateGroups;
};