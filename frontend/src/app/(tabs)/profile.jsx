import { useMyProfile } from "@/api/profile/useMyProfile";
import JournalPreview from "@/components/journal/JournalPreview";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import InviteFriendCard from "@/components/profile/InviteFriendCard";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import ProfileCustomizables from "@/components/profile/ProfileCustomizables";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTrophies from "@/components/profile/ProfileTrophies";

export default function ProfileScreen() {
  const { data: profileData, isLoading } = useMyProfile();

  return (
    <ScreenWrapper scrollable>
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
