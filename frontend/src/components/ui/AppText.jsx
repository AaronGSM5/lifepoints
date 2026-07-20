import { memo, useMemo } from "react";
import { Animated, Text } from "react-native";

import { Typography } from "@/constants/Typography";
import { useAppTheme } from "@/hooks/useAppTheme";

const AppText = memo(({ children, type = "body", bold = false, animated = false, style, ...props }) => {
  const MyTheme = useAppTheme();
  const fontStyle = useMemo(() => {
    let fontFamily = "Inter-Regular";

    if (bold) {
      fontFamily = "Inter-Bold";
    } else {
      switch (type) {
        case "h1":
        case "h2":
          fontFamily = "Inter-Bold";
          break;
        case "title":
          fontFamily = "Inter-SemiBold";
          break;
        default:
          fontFamily = "Inter-Regular";
      }
    }

    return {
      fontFamily,
      color: type === "caption" ? MyTheme.muted : MyTheme.text,
      ...Typography[type]
    };
  }, [MyTheme, type, bold]);

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent style={[fontStyle, style]} {...props}>
      {children}
    </TextComponent>
  );
});
AppText.displayName = "AppText";

export default AppText;
