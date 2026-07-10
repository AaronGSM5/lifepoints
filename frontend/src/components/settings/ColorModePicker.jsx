import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import BaseCard from "../ui/BaseCard";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";

const ColorModePicker = memo(() => {
  const MyTheme = useAppTheme()
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme])
  const  { t } = useTranslation("settings")
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

return <View style={styles.container}>
        <BaseCard
          style={[
            styles.card,
            !MyTheme.isDark && { borderColor: MyTheme.primaryAccent }
          ]}
          onPress={() => {
            if (MyTheme.isDark) toggleDarkMode();
          }}
        >
          <Icon name="sun" size={36} color={MyTheme.isDark ? MyTheme.muted : MyTheme.primaryAccent} outline={MyTheme.isDark} />
          <AppText bold={!MyTheme.isDark} disabled={MyTheme.isDark} style={styles.cardText}>{t("Bright")}</AppText>
        </BaseCard>

        <BaseCard
          style={[
            styles.card,
            MyTheme.isDark && { borderColor: MyTheme.primaryAccent }
          ]}
          onPress={() => {
            if (!MyTheme.isDark) toggleDarkMode();
          }}
        >
          <Icon name="moon" size={36} color={MyTheme.isDark ? MyTheme.primaryAccent : MyTheme.muted} outline={!MyTheme.isDark} />
          <AppText bold={MyTheme.isDark} disabled={!MyTheme.isDark} style={styles.cardText}>{t("Dark")}</AppText>
        </BaseCard>
      </View>
})
ColorModePicker.displayName = "ColorModePicker"

const getStyles = () => StyleSheet.create({
  container: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Spacing.md
    },
    card: {
      flex: 1,
      paddingVertical: Spacing.xl,
      paddingHorizontal: Spacing.md,
      borderRadius: Spacing.borderRadius.lg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)"
    },
    cardText: {
      marginTop: Spacing.md
    }
})

export default ColorModePicker