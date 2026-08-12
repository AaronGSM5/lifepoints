import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const isSameDay = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) return false;
  const d1 = new Date(dateString1);
  const d2 = new Date(dateString2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const getDateLabel = (dateString, t, locale = "de-DE") => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const now = new Date();

  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowMidnight.getTime() - dateMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) return t("Today");
  if (diffDays === 1) return t("Yesterday");

  if (diffDays > 1 && diffDays < 7) {
    return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
  }

  const options = { weekday: "short", day: "numeric", month: "short" };
  const formatted = new Intl.DateTimeFormat(locale, options).format(date);

  return formatted.replace(",", "");
};

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