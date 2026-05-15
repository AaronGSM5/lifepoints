import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppInput from "@/components/ui/AppInput";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppBadge from "@/components/ui/AppBadge";
import { useTranslation } from "react-i18next";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchHistory = ["Gaming", "Meditation", "Fitness Beginner", "Rewe"];
  const styles = getStyles();
  const { t } = useTranslation("common");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Suche jetzt nach:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <View style={styles.inputContainer}>
        <AppInput
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("Search...")}
          returnKeyType="search"
          icon={"search"}
          bottomMargin={false}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          <AppBadge variant="glas" label={t("User")} />
          <AppBadge variant="glas" label={t("Community")} />
          <AppBadge variant="glas" label={t("Post")} />
          <AppBadge variant="glas" label={t("Reward")} />
        </ScrollView>
      </View>

      {searchQuery === "" ? (
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: Spacing.md }}>
            <AppText bold>{t("Recently Searched")}</AppText>
          </View>

          <FlatList
            data={searchHistory}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.historyItem} onPress={() => setSearchQuery(item)}>
                <Icon name="history" size={20} color={MyTheme.muted} />
                <AppText>{t(item)}</AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.resultsSection}>
          <AppText style={{ textAlign: "center", marginTop: 40, opacity: 0.5 }}>
            {t("Search for:")} "{searchQuery}"
          </AppText>
        </View>
      )}
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: Spacing.lg,
      paddingTop: Spacing.sm
    },
    filterContainer: {
      marginBottom: Spacing.lg
    },
    filterScroll: {
      marginHorizontal: -Spacing.md
    },
    filterContent: {
      flexDirection: "row",
      gap: Spacing.sm,
      paddingHorizontal: Spacing.md
    },
    historyItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
      paddingVertical: Spacing.md
    },
    resultsSection: {
      flex: 1,
      paddingHorizontal: Spacing.md
    }
  });
