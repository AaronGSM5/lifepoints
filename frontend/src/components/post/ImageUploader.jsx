import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppImage from "../ui/AppImage";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const ImageUploader = memo(({ isPublic, image, setImage, pickImage }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("post");
  return (
    <BaseCard style={[styles.imageContainer, !image && styles.imagePlaceholder]} onPress={pickImage} padding={0}>
      {image ? (
        <AppImage source={image} variant={"fill"} />
      ) : (
        <View style={styles.placeholderContent}>
          <Icon name="camera" size={32} color={MyTheme.muted} />
          <AppText style={{ color: MyTheme.muted, marginTop: Spacing.sm }}>
            {isPublic ? t("Upload image (Required)") : t("Upload image (Optional)")}
          </AppText>
        </View>
      )}

      {image && (
        <Icon name="trash" size={16} color="#fff" onPress={() => setImage(null)} style={styles.removeImageBtn} />
      )}
    </BaseCard>
  );
});
ImageUploader.displayName = "ImageUploader";

const getStyles = (theme) =>
  StyleSheet.create({
    imageContainer: {
      width: "100%",
      aspectRatio: 4 / 5,
      overflow: "hidden",
      marginBottom: Spacing.lg,
      position: "relative"
    },
    imagePlaceholder: {
      backgroundColor: theme.separator,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.separator,
      borderStyle: "dashed"
    },
    placeholderContent: {
      alignItems: "center"
    },
    removeImageBtn: {
      position: "absolute",
      top: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: Spacing.sm,
      borderRadius: Spacing.borderRadius.full
    }
  });

export default ImageUploader;
