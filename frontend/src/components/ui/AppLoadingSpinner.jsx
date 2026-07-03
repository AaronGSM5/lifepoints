import { ActivityIndicator } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

const AppLoadingSpinner = ({ size = "large", color, style }) => {
  const MyTheme = useAppTheme();
  return <ActivityIndicator size={size} color={color ? color : MyTheme.primaryAccent} style={style} />;
};

export default AppLoadingSpinner;
