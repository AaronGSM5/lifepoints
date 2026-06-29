export const extractId = (item) => {
  if (!item) return null;
  return item._id?.$oid || item._id || item.id;
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};