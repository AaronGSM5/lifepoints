export const sanitizeJSON = (rawString, defaultValue = []) => {
  if (!rawString) return defaultValue;
  try {
    const parsed = JSON.parse(rawString);
    return parsed !== null ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
};
