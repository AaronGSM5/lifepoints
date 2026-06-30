export const extractId = (item) => {
  if (!item) return null;
  return item._id?.$oid || item._id || item.id;
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatTimeOrDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

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