import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, Pressable, Image, FlatList, Dimensions } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const GRID_SIZE = width / COLUMN_COUNT;

// Mock-Daten für die Beiträge des Nutzers
const USER_POSTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `post-${i}`,
  image: `https://picsum.photos/400/500?random=${i}`
}));

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {/* Top Info: Avatar & Stats */}
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarLarge}>
            <AppText style={styles.avatarLetter}>{username?.charAt(0).toUpperCase()}</AppText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <AppText bold style={styles.statNumber}>
              12
            </AppText>
            <AppText type="caption" style={styles.statLabel}>
              Posts
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText bold style={styles.statNumber}>
              842
            </AppText>
            <AppText type="caption" style={styles.statLabel}>
              Follower
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText bold style={[styles.statNumber, { color: MyTheme.primaryAccent }]}>
              4.2k
            </AppText>
            <AppText type="caption" style={styles.statLabel}>
              LP
            </AppText>
          </View>
        </View>
      </View>

      {/* Name & Bio */}
      <View style={styles.bioSection}>
        <AppText bold style={styles.fullName}>
          {username}
        </AppText>
        <AppText style={styles.bioText}>
          Life Enthusiast | Daily Tasks Master | Explorer of new possibilities 🚀
        </AppText>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <View style={{ flex: 1 }}>
          <AppButton title="Folgen" size="sm" bgColor={MyTheme.primaryAccent} />
        </View>
        <View style={{ flex: 1, marginLeft: Spacing.sm }}>
          <AppButton title="Nachricht" size="sm" variant="outline" />
        </View>
      </View>

      {/* Tab Indicator (Simuliert) */}
      <View style={styles.tabBar}>
        <View style={styles.activeTab}>
          <Icon name="camera" size={20} color={MyTheme.text} />
        </View>
        <View style={styles.inactiveTab}>
          <Icon name="bookmark" size={20} color={MyTheme.muted} />
        </View>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <Pressable style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
    </Pressable>
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingBottom={false}>
      <FlatList
        data={USER_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    height: 54,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: MyTheme.separator
  },
  navTitle: {
    fontSize: 16
  },
  listContent: {
    paddingBottom: Spacing.xl
  },
  profileHeader: {
    paddingTop: Spacing.lg
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md
  },
  avatarContainer: {
    flex: 1
  },
  avatarLarge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: MyTheme.primaryAccent,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarLetter: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold"
  },
  statsContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  statItem: {
    alignItems: "center"
  },
  statNumber: {
    fontSize: 18
  },
  statLabel: {
    color: MyTheme.muted
  },
  bioSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg
  },
  fullName: {
    fontSize: 16,
    marginBottom: 4
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: MyTheme.text
  },
  actionRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: MyTheme.separator
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: MyTheme.text
  },
  inactiveTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12
  },
  gridItem: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    padding: 1 // Simuliert den "Gutter" zwischen den Bildern
  },
  gridImage: {
    width: "100%",
    height: "100%",
    backgroundColor: MyTheme.secondary
  }
});
