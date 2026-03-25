import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Switch
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import AppInput from "../ui/AppInput";

const AVAILABLE_BADGES = [
  "freundlich",
  "creator",
  "nischen-pro",
  "anfänger",
  "expert",
  "fitness",
  "tech",
  "lifestyle",
  "gaming"
];
const SIZE_OPTIONS = [
  { slots: 50, price: "Gratis" },
  { slots: 250, price: "4.99€" },
  { slots: 1000, price: "14.99€" }
];
const ICONS = [
  "groups",
  "fitness-center",
  "code",
  "palette",
  "self-improvement",
  "restaurant",
  "music-note",
  "sports-esports",
  "flight",
  "camera-alt"
];
const DEFAULT_BANNER_URI = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

const CreateCommunityForm = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("groups");

  const [bannerUri, setBannerUri] = useState(null);

  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);

  const [showAllIcons, setShowAllIcons] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);

  const MAX_ICONS_COLLAPSED = 5;
  const MAX_BADGES_COLLAPSED = 4;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Wir brauchen Zugriff auf deine Fotos, um ein Banner hochzuladen.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });

    if (!result.canceled) {
      setBannerUri(result.assets[0].uri);
    }
  };

  const clearImage = () => {
    setBannerUri(null);
  };

  const toggleBadge = (badge) => {
    setSelectedBadges((prev) => (prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]));
  };

  const resetModal = () => {
    setName("");
    setDescription("");
    setSelectedIcon("groups");
    setBannerUri(null);
    setSelectedBadges([]);
    setSelectedSize(SIZE_OPTIONS[0]);
    setShowAllBadges(false);
    setShowAllIcons(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
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
    onClose();
    setTimeout(resetModal, 300);
  };

  const formValid = name && selectedIcon && selectedBadges.length >= 1 && selectedSize;

  const visibleIcons = showAllIcons ? ICONS : ICONS.slice(0, MAX_ICONS_COLLAPSED);
  const visibleBadges = showAllBadges ? AVAILABLE_BADGES : AVAILABLE_BADGES.slice(0, MAX_BADGES_COLLAPSED);

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
                />
              </View>

              {/* Icon Picker */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-ICON
                </AppText>
                <View style={styles.iconGrid}>
                  {visibleIcons.map((icon) => (
                    <Pressable
                      key={icon}
                      onPress={() => setSelectedIcon(icon)}
                      style={[styles.iconItem, selectedIcon === icon && styles.selectedIconItem]}
                    >
                      <MaterialIcons
                        name={icon}
                        size={28}
                        color={selectedIcon === icon ? MyTheme.primaryAccent : "#fff"}
                      />
                    </Pressable>
                  ))}
                </View>
                {!showAllIcons && ICONS.length > MAX_ICONS_COLLAPSED && (
                  <Pressable onPress={() => setShowAllIcons(true)} style={styles.moreButton}>
                    <AppText type="caption">more</AppText>
                    <Icon name="down" size={14} color={MyTheme.muted} />
                  </Pressable>
                )}
              </View>

              {/* Badges */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-BADGES
                </AppText>
                <View style={styles.badgeWrapper}>
                  {visibleBadges.map((badge) => (
                    <Pressable
                      key={badge}
                      onPress={() => toggleBadge(badge)}
                      style={[styles.badgeChip, selectedBadges.includes(badge) && styles.selectedBadgeChip]}
                    >
                      <AppText style={[styles.badgeText, selectedBadges.includes(badge) && { color: "#000" }]}>
                        {badge}
                      </AppText>
                    </Pressable>
                  ))}
                </View>
                {!showAllBadges && AVAILABLE_BADGES.length > MAX_BADGES_COLLAPSED && (
                  <Pressable onPress={() => setShowAllBadges(true)} style={styles.moreButton}>
                    <AppText type="caption">more</AppText>
                    <Icon name="down" size={14} color={MyTheme.muted} />
                  </Pressable>
                )}
              </View>

              {/* Banner Upload */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-BANNER (OPTIONAL)
                </AppText>

                {bannerUri ? (
                  <View style={styles.bannerImageWrapper}>
                    <Image source={{ uri: bannerUri }} style={styles.bannerImage} />
                    <Pressable onPress={clearImage} style={styles.clearImageIcon}>
                      <Icon name="close" color="#fff" size={16} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable onPress={pickImage} style={styles.bannerPlaceholder}>
                    <Icon name="camera" color={MyTheme.muted} />
                    <AppText type="caption" style={{ textAlign: "center", marginTop: 4 }}>
                      Tippen zum Auswählen (16:9 empfohlen)
                    </AppText>
                  </Pressable>
                )}
              </View>

              {/* Size / Price */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-GRÖSSE
                </AppText>
                <View style={styles.sizeGrid}>
                  {SIZE_OPTIONS.map((opt) => (
                    <Pressable
                      key={opt.slots}
                      onPress={() => setSelectedSize(opt)}
                      style={[styles.sizeCard, selectedSize.slots === opt.slots && styles.selectedSizeCard]}
                    >
                      <AppText bold>{opt.slots}</AppText>
                      <AppText type="caption">{opt.price}</AppText>
                    </Pressable>
                  ))}
                </View>
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  dismissArea: {
    flex: 1
  },
  sheetContainer: {
    backgroundColor: MyTheme.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: "90%"
  },
  content: {
    flex: 1,
    paddingTop: Spacing.sm
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
    letterSpacing: 1
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: Spacing.md,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  infoText: {
    fontSize: 11,
    color: MyTheme.muted,
    marginTop: 6,
    marginLeft: 4
  },
  textArea: {
    height: 80,
    textAlignVertical: "top"
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  iconItem: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent"
  },
  selectedIconItem: {
    borderColor: MyTheme.primaryAccent,
    backgroundColor: "rgba(47, 196, 146, 0.1)"
  },
  bannerPlaceholder: {
    height: 100,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  bannerImageWrapper: {
    height: 100,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative"
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  clearImageIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 16
  },
  badgeWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  badgeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  selectedBadgeChip: {
    backgroundColor: MyTheme.primaryAccent,
    borderColor: MyTheme.primaryAccent
  },
  badgeText: {
    fontSize: 13,
    color: "#fff"
  },
  sizeGrid: {
    flexDirection: "row",
    gap: 12
  },
  sizeCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent"
  },
  selectedSizeCard: {
    borderColor: MyTheme.primaryAccent,
    backgroundColor: "rgba(47, 196, 146, 0.1)"
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    backgroundColor: MyTheme.background
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    gap: 4,
    paddingVertical: 4
  }
});

export default CreateCommunityForm;
