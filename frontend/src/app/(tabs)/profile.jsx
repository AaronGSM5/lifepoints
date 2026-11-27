import { StyleSheet } from "react-native";

import { useMyProfile } from "@/api/profile/useMyProfile";
import JournalPreview from "@/components/journal/JournalPreview";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import InviteFriendCard from "@/components/profile/InviteFriendCard";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import ProfileCustomizables from "@/components/profile/ProfileCustomizables";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTrophies from "@/components/profile/ProfileTrophies";
import { Spacing } from "@/constants/Spacing";

export default function ProfileScreen() {
  const { data: profileData, isLoading } = useMyProfile();

  return (
    <ScreenWrapper variant="tab" style={styles.sections}>
      <ProfileHeader isLoading={isLoading} isExternUser={false} profileData={profileData} />

      <OnboardingGuide tutorialSteps={profileData?.tutorialSteps} isLoading={isLoading} />

      <ProfileStats stats={profileData?.stats} isLoading={isLoading} />

      <ProfileCustomizables isLoading={isLoading} customizables={profileData?.customizables} />

      <ProfileTrophies isLoading={isLoading} trophies={profileData?.trophies} />

      <JournalPreview activities={profileData?.activities} isLoading={isLoading} />

      <InviteFriendCard referralCode={profileData?.username} />
    </ScreenWrapper>
  );
}

// Sektionsabstände werden zentral hier gesteuert, nicht in den einzelnen Sektionen.
const styles = StyleSheet.create({
  sections: {
    gap: Spacing.xl
  }
});
