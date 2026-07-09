import { memo, useMemo } from "react";
import { Animated, Pressable, Text } from "react-native";

import { Typography } from "@/constants/Typography";
import { useAppTheme } from "@/hooks/useAppTheme";

const AppText = memo(
  ({ children, type = "body", bold = false, animated = false, style, onPress, disabled = false, ...props }) => {
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

    const content = (
      <TextComponent style={[fontStyle, style]} {...props}>
        {children}
      </TextComponent>
    );

    if (onPress) {
      return (
        <Pressable onPress={onPress} disabled={disabled} hitSlop={15}>
          {content}
        </Pressable>
      );
    }

    return content;
  }
);
AppText.displayName = "AppText";

export default AppText;
