import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import AppInput from "../../ui/AppInput";
import BaseBottomSheet from "@/components/ui/BaseBottomSheet";
import IconPicker from "./IconPicker";
import BadgePicker from "./BadgePicker";
import BannerUploader from "./BannerUploader";
import SizePicker from "./SizePicker";
import { communityIcons, communityBadges } from "@/constants/CommunityOptions";
import { communityTiers } from "@/constants/CommunityPricing";
import { useTranslation } from "react-i18next";

const DEFAULT_BANNER_URI = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop";

const CreateCommunityForm = ({ visible, onClose, onCreate }) => {
  const styles = getStyles();
  const { t } = useTranslation("community");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("groups");
  const [bannerUri, setBannerUri] = useState(null);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedSize, setSelectedSize] = useState(communityTiers[0]);
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
    setSelectedSize(communityTiers[0]);
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
    <BaseBottomSheet isVisible={visible} onClose={handleClose} title={t("New Community")}>
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
        {/* Name */}
        <View style={styles.section}>
          <AppText type="caption" style={styles.label}>
            COMMUNITY-NAME (PERMANENT)
          </AppText>
          <AppInput
            placeholder={t("What should you name your community?")}
            value={name}
            onChangeText={setName}
            bottomMargin={false}
            isForm
          />
          <AppText style={styles.infoText}>
            {t("Choose carefully. You won't be able to change the name later.")}
          </AppText>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <AppText type="caption" style={styles.label}>
            {t("DESCRIPTION")}
          </AppText>
          <AppInput
            multiline
            placeholder={t("What is your community about?")}
            value={description}
            onChangeText={setDescription}
            bottomMargin={false}
            isForm
          />
        </View>

        <View style={styles.section}>
          <IconPicker
            key={`icon-${resetKey}`}
            icons={communityIcons}
            selectedIcon={selectedIcon}
            onSelectIcon={setSelectedIcon}
          />
        </View>

        <View style={styles.section}>
          <BadgePicker
            key={`badge-${resetKey}`}
            badges={communityBadges}
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
          <SizePicker options={communityTiers} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title={
            selectedSize.price === "Gratis" ? t("Create now") : `${t("Für")} ${selectedSize.price} ${t("Erstellen")}`
          }
          onPress={handleCreate}
          disabled={!formValid}
          bgColor={MyTheme.primaryAccent}
        />
      </View>
    </BaseBottomSheet>
  );
};

const getStyles = () =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.lg
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
