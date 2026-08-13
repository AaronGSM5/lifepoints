import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppIconButton from "../ui/AppIconButton";
import AppInput from "../ui/AppInput";
import AppText from "../ui/AppText";

const ChatInputBar = ({ value, onChangeText, onSend, placeholder }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [showMenu, setShowMenu] = useState(false);

  const handleSelectOption = (type) => {
    setShowMenu(false);
    console.log("Ausgewählt:", type);
  };

  return (
    <View style={styles.wrapper}>
      {showMenu && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setShowMenu(false)} />

          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption("photo")}>
              <Icon name="image-outline" size={20} />
              <AppText style={styles.menuText}>Foto anhängen</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption("habit")}>
              <Icon name="leaf-outline" size={20} />
              <AppText style={styles.menuText}>Gewohnheit teilen</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption("poll")}>
              <Icon name="stats-chart-outline" size={20} />
              <AppText style={styles.menuText}>Umfrage starten</AppText>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.inputContainer}>
        <AppIconButton
          icon="add"
          color={MyTheme.muted}
          onPress={() => setShowMenu(!showMenu)}
          style={styles.attachButton}
        />
        <AppInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          containerStyle={{ flex: 8 }}
          bottomMargin={false}
        />
        <AppIconButton
          icon="send"
          iconSize={20}
          color={value.trim() ? MyTheme.primaryAccent : MyTheme.muted}
          onPress={onSend}
          disabled={!value.trim()}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      position: "relative"
    },
    backdrop: {
      position: "absolute",
      top: -1000,
      bottom: 0,
      left: -1000,
      right: -1000
    },
    menuCard: {
      position: "absolute",
      bottom: "100%",
      left: Spacing.md,
      marginBottom: Spacing.sm,
      backgroundColor: theme.darkBg,
      borderRadius: 12,
      padding: Spacing.xs,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
      minWidth: 200,
      zIndex: 100
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm
    },
    menuText: {
      fontSize: 14
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.separator,
      backgroundColor: theme.background
    },
    attachButton: {
      padding: Spacing.xs
    },
    sendButton: {
      flex: 1
    }
  });

export default ChatInputBar;
