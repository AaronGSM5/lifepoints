import React, { useState } from "react";
import { Modal, View, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import AppInput from "../../ui/AppInput";

// Imports der neuen Komponenten (Pfade ggf. anpassen)
import IconPicker from "./IconPicker";
import BadgePicker from "./BadgePicker";
import BannerUploader from "./BannerUploader";
import SizePicker from "./SizePicker";

import { mockCommunityIcons, mockCommunityBadges, mockCommunitySizes } from "@/constants/MockData";
import useStore from "@/store/useStore";

const DEFAULT_BANNER_URI = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

const CreateCommunityForm = ({ visible, onClose, onCreate }) => {
  const styles = getStyles();
  const { isDarkMode } = useStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("groups");
  const [bannerUri, setBannerUri] = useState(null);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedSize, setSelectedSize] = useState(mockCommunitySizes[0]);
  const [resetKey, setResetKey] = useState(0);

  const toggleBadge = (badge) => {
    setSelectedBadges((prev) => (prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedIcon("groups");
    setBannerUri(null);
    setSelectedBadges([]);
    setSelectedSize(mockCommunitySizes[0]);
    setResetKey((prev) => prev + 1);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleCreate = () => {
    if (!formValid) return;
    onCreate({
      name,
      description,
      icon: selectedIcon,
      banner: bannerUri || DEFAULT_BANNER_URI,
      badges: selectedBadges,
      size: selectedSize.slots
    });
    handleClose();
  };

  const formValid = name && selectedIcon && selectedBadges.length >= 1 && selectedSize;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      presentationStyle="overFullScreen"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.dismissArea} onPress={handleClose} />

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.sheetContainer}>
          <View style={styles.content}>
            <View style={styles.dragHandle} />
            <View style={styles.header}>
              <AppText type="h2" bold>
                Neue Community
              </AppText>
              <Pressable onPress={handleClose} hitSlop={10}>
                <Icon name="close" color={MyTheme.muted} size={24} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
              {/* Name */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-NAME (PERMANENT)
                </AppText>
                <AppInput
                  placeholder="Wie soll deine Community heißen?"
                  value={name}
                  onChangeText={setName}
                  bottomMargin={false}
                  isForm
                />
                <AppText style={styles.infoText}>Wähle weise. Der Name kann später nicht mehr geändert werden.</AppText>
              </View>

              {/* Description */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  BESCHREIBUNG
                </AppText>
                <AppInput
                  multiline
                  placeholder="Worum geht es in deiner Community?"
                  value={description}
                  onChangeText={setDescription}
                  bottomMargin={false}
                  isForm
                />
              </View>

              <View style={styles.section}>
                <IconPicker
                  key={`icon-${resetKey}`}
                  icons={mockCommunityIcons}
                  selectedIcon={selectedIcon}
                  onSelectIcon={setSelectedIcon}
                />
              </View>

              <View style={styles.section}>
                <BadgePicker
                  key={`badge-${resetKey}`}
                  badges={mockCommunityBadges}
                  selectedBadges={selectedBadges}
                  onToggleBadge={toggleBadge}
                />
              </View>

              <View style={styles.section}>
                <BannerUploader
                  bannerUri={bannerUri}
                  onBannerSelect={setBannerUri}
                  onBannerClear={() => setBannerUri(null)}
                />
              </View>

              <View style={styles.section}>
                <SizePicker options={mockCommunitySizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <AppButton
                title={selectedSize.price === "Gratis" ? "Kostenlos Erstellen" : `Für ${selectedSize.price} Erstellen`}
                onPress={handleCreate}
                disabled={!formValid}
                bgColor={MyTheme.primaryAccent}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const getStyles = () =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)"
    },
    dismissArea: {
      ...StyleSheet.absoluteFillObject
    },
    sheetContainer: {
      backgroundColor: MyTheme.background,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      maxHeight: "90%",
      flexShrink: 1
    },
    content: {
      paddingTop: Spacing.sm,
      flexShrink: 1
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.lg
    },
    dragHandle: {
      width: 40,
      height: 5,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 3,
      alignSelf: "center",
      marginBottom: Spacing.md
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.lg
    },
    section: {
      marginBottom: Spacing.lg
    },
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1,
      color: MyTheme.text
    },
    infoText: {
      fontSize: 11,
      color: MyTheme.muted,
      marginTop: 6,
      marginLeft: 4
    },
    footer: {
      padding: Spacing.lg,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: MyTheme.glas,
      backgroundColor: MyTheme.background
    }
  });

export default CreateCommunityForm;
