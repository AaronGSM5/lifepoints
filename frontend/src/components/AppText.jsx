import { Text } from 'react-native';
import { MyTheme } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";

export default function AppText({ children, type = 'body', bold = false, style, ...props }) {
  
  const getFontFamily = () => {

    if (bold) return 'Inter-Bold';

    switch (type) {
      case 'h1':
      case 'h2':
        return 'Inter-Bold';
      case 'title':
        return 'Inter-SemiBold';
      default:
        return 'Inter-Regular';
    }
  };

  const baseStyle = {
    color: type === 'caption' ? MyTheme.muted : MyTheme.text,
    fontFamily: getFontFamily(),
    ...Typography[type],
  };

  return (
    <Text style={[baseStyle, style]} {...props}>
      {children}
    </Text>
  );
}