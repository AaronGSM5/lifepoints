import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';
import AppText from './AppText';
import { Spacing } from '@/constants/Spacing';

export default function TaskCard({ title, difficulty, xp, lp }) {
  
  const getTheme = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return { 
          icon: 'emoticon-happy-outline', 
          color: '#4ADE80'
        };
      case 'medium':
        return { 
          icon: 'emoticon-neutral-outline',
          color: '#FACC15'
        };
      case 'hard':
        return { 
          icon: 'emoticon-angry-outline', 
          color: '#F87171'
        };
      default:
        return { icon: 'emoticon-outline', color: MyTheme.muted };
    }
  };

  const theme = getTheme(difficulty);

  return (
    <View style={styles.card}>
      {/* --- Header: Titel und Herz --- */}
      <View style={styles.headerRow}>
        <AppText type='title' style={{ flex: 1, marginRight: Spacing.sm }}>{title}</AppText>
        <Pressable hitSlop={10}>
          <Ionicons name="heart-outline" size={24} color={MyTheme.muted} />
        </Pressable>
      </View>
      {/* --- Body: Großes Icon und Werte --- */}
      <View style={styles.bodyRow}>
        {/* Linke Seite: Großes Schwierigkeits-Icon */}
        <View style={styles.iconContainer}>
            {/* Kleiner Trick für den "Leucht"-Effekt hinter dem Icon */}
            <View style={[styles.glow, { backgroundColor: theme.color }]} />
            <MaterialCommunityIcons 
                name={theme.icon} 
                size={55} 
                color={theme.color} 
                style={styles.mainIcon}
            />
        </View>
        {/* Rechte Seite: Stats (LP und XP) */}
        <View style={styles.statsContainer}>
          {/* LP (Blüten) */}
          <View style={styles.statItem}>
            <AppText type='title' style={{ fontSize: 16 }}>{lp}</AppText>
            <MaterialCommunityIcons name="flower-tulip" size={18} color="#FFC0CB" style={{marginLeft: 4}} />
          </View>
          {/* XP Badge */}
          <View style={styles.statItem}>
            <AppText type='title' style={{ fontSize: 16 }}>{xp}</AppText>
            <View style={styles.xpBadge}>
              <AppText bold type='caption' style={{ color: MyTheme.text }}>XP</AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary
    // Optional: Schatten für Tiefe
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
  },
  glow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpBadge: {
    borderRadius: Spacing.borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#22C55E',
    marginLeft: 4,
    justifyContent: 'center',
  }
});