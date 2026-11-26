import { StyleSheet } from "react-native";

import JournalPreview from "@/components/journal/JournalPreview";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import ProfileCustomizables from "@/components/profile/ProfileCustomizables";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTrophies from "@/components/profile/ProfileTrophies";
import { FEATURES } from "@/constants/FeatureFlags";
import { Spacing } from "@/constants/Spacing";
import { useProfileView } from "@/hooks/useProfileView";

export default function ProfileScreen() {
  const { data: profileData, isLoading } = useProfileView();

  return (
    <ScreenWrapper scrollable>
      <ProfileHeader isLoading={isLoading} isExternUser={false} profileData={profileData} />

      {FEATURES.onboardingGuide && <OnboardingGuide tutorialSteps={profileData?.tutorialSteps} isLoading={isLoading} />}

      {FEATURES.profileStats && <ProfileStats stats={profileData?.stats} isLoading={isLoading} />}

      {FEATURES.customizables && (
        <ProfileCustomizables isLoading={isLoading} customizables={profileData?.customizables} />
      )}

      {FEATURES.trophies && <ProfileTrophies isLoading={isLoading} trophies={profileData?.trophies} />}

      <JournalPreview activities={profileData?.activities} isLoading={isLoading} style={styles.section} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  // Gleicher Sektionsabstand wie die übrigen Profil-Sektionen
  section: {
    marginTop: Spacing.xl
  }
});
