import { forwardRef, memo } from "react";
import { useTranslation } from "react-i18next";

import AppIconButton from "./AppIconButton";

const CloseButton = memo(
  forwardRef(({ onPress, iconSize, style, color, withBackground = false, ...rest }, ref) => {
    const { t } = useTranslation("common");

    return (
      <AppIconButton
        ref={ref}
        icon="close"
        iconSize={iconSize}
        onPress={onPress}
        withBackground={withBackground}
        style={style}
        color={color}
        accessibilityLabel={t("close")}
        {...rest}
      />
    );
  })
);
CloseButton.displayName = "CloseButton";

export default CloseButton;
