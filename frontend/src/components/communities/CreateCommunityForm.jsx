import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated
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
  "chillig",
  "hilfsbereit",
  "respektvoll",
  "safe space",
  "diskussionsfreudig",
  "humorvoll",
  "anfänger",
  "fortgeschritten",
  "expert",
  "pro",
  "mentor",
  "creator",
  "nischen-pro",
  "tech",
  "gaming",
  "fitness",
  "lifestyle",
  "kunst",
  "musik",
  "kochen",
  "outdoor",
  "finanzen",
  "memes",
  "coding",
  "design",
  "fotografie",
  "mindfulness",
  "startup",
  "networking",
  "feedback",
  "support",
  "lokal",
  "global",
  "study-group",
  "hobby",
  "täglich aktiv",
  "wochenend-vibes",
  "voice-chat",
  "text-only",
  "real-life meetups",
  "events"
];

const SIZE_OPTIONS = [
  { slots: 50, price: "Gratis" },
  { slots: 250, price: "4.99€" },
  { slots: 1000, price: "14.99€" }
];

const ICONS = [
  "groups",
  "forum",
  "public",
  "diversity-3",
  "emoji-emotions",
  "favorite",
  "fitness-center",
  "directions-run",
  "pool",
  "self-improvement",
  "spa",
  "directions-bike",
  "sports-esports",
  "computer",
  "code",
  "smart-toy",
  "headphones",
  "videocam",
  "palette",
  "camera-alt",
  "music-note",
  "color-lens",
  "theater-comedy",
  "brush",
  "restaurant",
  "local-cafe",
  "local-pizza",
  "local-bar",
  "bakery-dining",
  "flight",
  "landscape",
  "local-florist",
  "pets",
  "explore",
  "park",
  "school",
  "menu-book",
  "lightbulb",
  "work",
  "trending-up",
  "attach-money",
  "local-fire-department",
  "celebration",
  "science",
  "star"
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

  const [iconFullHeight, setIconFullHeight] = useState(0); // is dynamic
  const [badgeFullHeight, setBadgeFullHeight] = useState(0); // is dynamic

  const iconHeightAnim = useRef(new Animated.Value(62)).current;
  const badgeHeightAnim = useRef(new Animated.Value(40)).current;

  const expandIcons = () => {
    setShowAllIcons(true);
    Animated.timing(iconHeightAnim, {
      toValue: iconFullHeight > 62 ? iconFullHeight : 200,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const expandBadges = () => {
    setShowAllBadges(true);
    Animated.timing(badgeHeightAnim, {
      toValue: badgeFullHeight > 40 ? badgeFullHeight : 150,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

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
    iconHeightAnim.setValue(62);
    badgeHeightAnim.setValue(40);
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

                <View
                  style={[styles.iconGrid, styles.measureView]}
                  onLayout={(event) => setIconFullHeight(event.nativeEvent.layout.height)}
                >
                  {ICONS.map((icon, index) => (
                    <View key={`measure-${icon}-${index}`} style={styles.iconItem} />
                  ))}
                </View>

                <Animated.View style={[styles.animatedWrapper, { height: iconHeightAnim }]}>
                  <View style={styles.iconGrid}>
                    {ICONS.map((icon, index) => (
                      <Pressable
                        key={`${icon}-${index}`}
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
                </Animated.View>

                {!showAllIcons && iconFullHeight > 62 && (
                  <View style={styles.expandContainer}>
                    <Pressable onPress={expandIcons} style={styles.moreButton}>
                      <AppText type="caption" style={{ color: MyTheme.primaryAccent }} bold>
                        see more
                      </AppText>
                    </Pressable>
                  </View>
                )}
              </View>

              {/* Badges */}
              <View style={styles.section}>
                <AppText type="caption" style={styles.label}>
                  COMMUNITY-BADGES
                </AppText>

                <View
                  style={[styles.badgeWrapper, styles.measureView]}
                  onLayout={(event) => setBadgeFullHeight(event.nativeEvent.layout.height)}
                >
                  {AVAILABLE_BADGES.map((badge, index) => (
                    <View key={`measure-badge-${index}`} style={styles.badgeChip}>
                      <AppText style={{ fontSize: 14 }}>{badge}</AppText>
                    </View>
                  ))}
                </View>

                <Animated.View style={[styles.animatedWrapper, { height: badgeHeightAnim }]}>
                  <View style={styles.badgeWrapper}>
                    {AVAILABLE_BADGES.map((badge, index) => (
                      <Pressable
                        key={`${badge}-${index}`}
                        onPress={() => toggleBadge(badge)}
                        style={[styles.badgeChip, selectedBadges.includes(badge) && styles.selectedBadgeChip]}
                      >
                        <AppText style={[{ fontSize: 14 }, selectedBadges.includes(badge) && { color: "#000" }]}>
                          {badge}
                        </AppText>
                      </Pressable>
                    ))}
                  </View>
                </Animated.View>

                {!showAllBadges && badgeFullHeight > 40 && (
                  <View style={styles.expandContainer}>
                    <Pressable onPress={expandBadges} style={styles.moreButton}>
                      <AppText type="caption" style={{ color: MyTheme.primaryAccent }} bold>
                        see more
                      </AppText>
                    </Pressable>
                  </View>
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
  infoText: {
    fontSize: 11,
    color: MyTheme.muted,
    marginTop: 6,
    marginLeft: 4
  },
  iconGrid: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12
  },
  iconItem: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: MyTheme.glas,
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
    backgroundColor: MyTheme.glas,
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
    justifyContent: "center",
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
  sizeGrid: {
    flexDirection: "row",
    gap: 12
  },
  sizeCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: MyTheme.glas,
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
    borderTopColor: MyTheme.glas,
    backgroundColor: MyTheme.background
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    gap: 4,
    paddingVertical: 4
  },
  animatedWrapper: {
    overflow: "hidden",
    width: "100%"
  },
  expandContainer: {
    alignItems: "center",
    marginTop: Spacing.sm
  },
  measureView: {
    position: "absolute",
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1
  }
});

export default CreateCommunityForm;
