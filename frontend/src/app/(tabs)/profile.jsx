import ScreenWrapper from "@/components/layout/ScreenWrapper";
import JournalPreview from "@/components/journal/JournalPreview";
import OnboardingGuide from "@/components/profile/OnboardingGuide";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useProfile } from "@/hooks/useProfile";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTrophies from "@/components/profile/ProfileTrophies";
import InviteFriendCard from "@/components/profile/InviteFriendCard";
import useStore from "@/store/useStore";
import ProfileCustomizables from "@/components/profile/ProfileCustomizables";

export default function ProfileScreen() {
  const { profile, customizables, trophies, isLoading } = useProfile();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <ProfileHeader profile={profile} skeletonProps={skeletonProps} isLoading={isLoading} />

      <OnboardingGuide skeletonProps={skeletonProps} isLoading={isLoading} />

      <ProfileStats isLoading={isLoading} />

      <ProfileCustomizables isLoading={isLoading} customizables={customizables} skeletonProps={skeletonProps} />

      <ProfileTrophies isLoading={isLoading} trophies={trophies} skeletonProps={skeletonProps} />

      <JournalPreview skeletonProps={skeletonProps} isLoading={isLoading} />

      <InviteFriendCard />
    </ScreenWrapper>
  );
}
