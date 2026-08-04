import { memo } from "react";

import AppIconButton from "./AppIconButton";

const CloseButton = memo(({ onPress, iconSize, style, color, withBackground = false, ref, ...rest }) => {
  return (
    <AppIconButton
      ref={ref}
      icon="close"
      iconSize={iconSize}
      onPress={onPress}
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
