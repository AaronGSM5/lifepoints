import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Keyboard, ScrollView, StyleSheet, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import HistoryItem from "@/components/search/HistoryItem";
import AppBadge from "@/components/ui/AppBadge";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchHistory = ["Gaming", "Meditation", "Fitness Beginner", "Rewe"];
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
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

  const renderHistoryItem = useCallback(
    ({ item }) => (
      <HistoryItem
        title={item}
        onPress={() => {
          setSearchQuery(item);
          Keyboard.dismiss();
        }}
      />
    ),
    []
  );

  return (
    <ScreenWrapper scrollable={false}>
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
          <AppBadge variant="glas" label={t("Routine")} />
          <AppBadge variant="glas" label={t("Reward")} />
          <AppBadge variant="glas" label={t("Post")} />
        </ScrollView>
      </View>

      {searchQuery === "" ? (
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: Spacing.md }}>
            <AppText bold>{t("Recently Searched")}</AppText>
          </View>

          <FlatList data={searchHistory} keyExtractor={(_, index) => index.toString()} renderItem={renderHistoryItem} />
        </View>
      ) : (
        <View style={styles.resultsSection}>
          <AppText style={styles.searchForText}>
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
    resultsSection: {
      flex: 1,
      paddingHorizontal: Spacing.md
    },
    searchForText: {
      textAlign: "center",
      marginTop: 40,
      opacity: 0.5
    }
  });
