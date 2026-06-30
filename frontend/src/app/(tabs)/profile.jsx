import ScreenWrapper from "@/components/layout/ScreenWrapper";
import JournalPreview from "@/components/journal/JournalPreview";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useMyProfile } from "@/hooks/useProfile";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTrophies from "@/components/profile/ProfileTrophies";
import InviteFriendCard from "@/components/profile/InviteFriendCard";
import useStore from "@/store/useStore";
import ProfileCustomizables from "@/components/profile/ProfileCustomizables";

export default function ProfileScreen() {
  const { data: profileData, isLoading } = useMyProfile();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  return (
    <ScreenWrapper scrollable>
      <ProfileHeader
        skeletonProps={skeletonProps}
        isLoading={isLoading}
        isExternUser={false}
        profileData={profileData}
      />

      <OnboardingGuide tutorialSteps={profileData?.tutorialSteps} skeletonProps={skeletonProps} isLoading={isLoading} />

      <ProfileStats stats={profileData?.stats} isLoading={isLoading} />

      <ProfileCustomizables
        isLoading={isLoading}
        customizables={profileData?.customizables}
        skeletonProps={skeletonProps}
      />

      <ProfileTrophies isLoading={isLoading} trophies={profileData?.trophies} skeletonProps={skeletonProps} />

      <JournalPreview activities={profileData?.activities} skeletonProps={skeletonProps} isLoading={isLoading} />

      <InviteFriendCard referralCode={profileData?.username} />
    </ScreenWrapper>
  );
}
