export const formatTimeOrDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const isToday = isSameDay(isoString, new Date())

  if (isToday) {
    // Heute -> z.B. "14:30"
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  // Älter -> z.B. "22.05.2026"
  return date.toLocaleDateString();
};

export const groupDataByDate = (data, dateField, t) => {
  if (!data || data.length === 0) return [];

  const groups = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  data.forEach((item) => {
    const itemDate = new Date(item[dateField]);
    const itemDay = new Date(itemDate);
    itemDay.setHours(0, 0, 0, 0);

    let sectionTitle = itemDate.toLocaleDateString();

    if (itemDay.getTime() === today.getTime()) {
      sectionTitle = t("Today");
    } else if (itemDay.getTime() === yesterday.getTime()) {
      sectionTitle = t("Yesterday");
    }

    if (!groups[sectionTitle]) {
      groups[sectionTitle] = [];
    }
    groups[sectionTitle].push(item);
  });

  return Object.keys(groups).map((title) => ({
    title,
    data: groups[title]
  }));
};

export const isSameDay = (dateString1, dateString2) => {
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

export const getDateLabel = (dateString, t, locale = "de-DE") => {
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
// To Test
export const formatHistoryDate = (isoString, locale) => {
  if (!isoString || typeof isoString !== "string") return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return ""

  const dateString = date.toLocaleDateString(locale);
  const timeString = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${dateString} • ${timeString}`;
};