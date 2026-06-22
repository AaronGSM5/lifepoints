import { useSafeAreaInsets } from "react-native-safe-area-context";

export const toolbarBaseHeight = 56;

export const useToolbarPadding = () => {
  const insets = useSafeAreaInsets();
  return toolbarBaseHeight + insets.top;
};
