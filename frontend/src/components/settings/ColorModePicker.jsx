import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import SelectableOptionCard from "../ui/SelectableOptionCard";

const ColorModePicker = memo(() => {
  const MyTheme = useAppTheme()
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme])
  const  { t } = useTranslation("settings")
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  const changeToBright = useCallback(() => {
            if (MyTheme.isDark) toggleDarkMode();
          }, [MyTheme])
  const changeToDark = useCallback(() => {
            if (!MyTheme.isDark) toggleDarkMode();
          }, [MyTheme])
  
  return (
      <View style={styles.container}>

        <SelectableOptionCard label={t("Bright")} isSelected={!MyTheme.isDark} onPress={changeToBright}>
          <Icon name="sun" size={36} color={MyTheme.isDark ? MyTheme.muted : MyTheme.primaryAccent} outline={MyTheme.isDark} />
        </SelectableOptionCard>

        <SelectableOptionCard label={t("Dark")} isSelected={MyTheme.isDark} onPress={changeToDark}>
          <Icon name="moon" size={36} color={MyTheme.isDark ? MyTheme.primaryAccent : MyTheme.muted} outline={!MyTheme.isDark} />
        </SelectableOptionCard>
      
      </View>
      )
})
ColorModePicker.displayName = "ColorModePicker"

const getStyles = () => StyleSheet.create({
  container: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Spacing.md
    }
})

export default ColorModePicker