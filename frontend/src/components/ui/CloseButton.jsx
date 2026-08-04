import { memo } from "react";

import AppIconButton from "./AppIconButton";

const CloseButton = memo(({ onPress, style, color, withBackground = false, ref, ...rest }) => {
  const handlePress = (e) => {
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <AppIconButton
      ref={ref}
      icon="close"
      onPress={handlePress}
      withBackground={withBackground}
      style={style}
      color={color}
      accessibilityLabel={"Close"}
      {...rest}
    />
  );
});
CloseButton.displayName = "CloseButton";

export default CloseButton;
