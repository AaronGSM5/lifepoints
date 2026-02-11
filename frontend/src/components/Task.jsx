import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';

export default function TaskCard({ title, difficulty, xp, lp }) {
  
  const getTheme = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return { 
          icon: 'emoticon-happy-outline', 
          color: '#4ADE80',
          shadowColor: '#4ADE80'
        };
      case 'medium':
        return { 
          icon: 'emoticon-neutral-outline',
          color: '#FACC15',
          shadowColor: '#FACC15'
        };
      case 'hard':
        return { 
          icon: 'emoticon-angry-outline', 
          color: '#F87171',
          shadowColor: '#F87171'
        };
      default:
        return { icon: 'emoticon-outline', color: '#ccc' };
    }
  };

  const theme = getTheme(difficulty);

  return (
    <View style={styles.card}>
      {/* --- Header: Titel und Herz --- */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable hitSlop={10}>
          <Ionicons name="heart" size={24} color="#FF005C" />
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
            <Text style={styles.statValue}>{lp}</Text>
            <MaterialCommunityIcons name="flower-tulip" size={20} color="#FFC0CB" style={{marginLeft: 4}} />
          </View>
          {/* XP Badge */}
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{xp}</Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>XP</Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Optional: Schatten für Tiefe
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    color: MyTheme.text,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  glow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.2,
  },
  mainIcon: {
    zIndex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    color: MyTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  xpBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginLeft: 4,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpText: {
    color: MyTheme.text,
    fontSize: 10,
    fontWeight: 'bold',
  }
});