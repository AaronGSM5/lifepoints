import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useCommunities } from "@/hooks/useCommunities";
import { MyTheme } from "@/constants/Colors";

export default function MyCommunityChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { recommended, myCommunities } = useCommunities();

  const openDetails = () => {
    router.push(`/mycommunity/${id}/details`);
  };

  return (
    <>
      <ScreenWrapper scrollable={false}>
        <View style={styles.chatContainer}>
          <AppText style={styles.placeholderText}>
            Hier kommt später der{" "}
            <Pressable onPress={openDetails}>
              <AppText style={{ color: MyTheme.primaryAccent, textDecoration: "underline" }}>Gruppenchat</AppText>
            </Pressable>{" "}
            hin...
          </AppText>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center"
  },
  placeholderText: {
    textAlign: "center"
  }
});
