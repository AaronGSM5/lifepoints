import { Animated, Text } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Typography } from "@/constants/Typography";

const AppText = ({ children, type = "body", bold = false, animated = false, style, ...props }) => {
  const MyTheme = useAppTheme();
  const getFontFamily = () => {
    if (bold) return "Inter-Bold";

    switch (type) {
      case "h1":
      case "h2":
        return "Inter-Bold";
      case "title":
        return "Inter-SemiBold";
      default:
        return "Inter-Regular";
    }
  };

  const baseStyle = {
    color: type === "caption" ? MyTheme.muted : MyTheme.text,
    fontFamily: getFontFamily(),
    ...Typography[type]
  };

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent style={[baseStyle, style]} {...props}>
      {children}
    </TextComponent>
  );
};

export default AppText;
