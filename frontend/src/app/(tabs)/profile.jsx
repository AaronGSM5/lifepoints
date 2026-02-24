import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Image, Pressable, ScrollView, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import ScreenWrapper from '@/components/ScreenWrapper';
import { router, useFocusEffect } from 'expo-router';
import TrophyCard from '@/components/TrophyCard';

export default function ProfileScreen() {
  const mockProfile = {
    backgroundImg: '',
    profileName: 'Tomhtzx',
    profileClass: 'Habit Hunter Class',
    profileRank: 'Elite',
    profileLevel: 42,
    profileXp: 9020
  }

  // // 1. Der Startwert der Animation (0%)
  const animatedWidth = useRef(new Animated.Value(0)).current;
  // // 2. Berechnung des Zielwerts (Prozentsatz)
  const targetPercentage = (mockProfile.profileXp / (500 + mockProfile.profileLevel * 300)) * 100;

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // Animation: jedes Mal, wenn der Tab aktiv wird
  useFocusEffect(
    useCallback(() => {
      animatedWidth.setValue(0);
      const animation = Animated.timing(animatedWidth, {
        toValue: targetPercentage,
        duration: 1800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        // easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      });

      const timer = setTimeout(() => {
        animation.start();
      }, 150); // small delay

      return () => {
        // cleanup
        animation.stop();
        clearTimeout(timer);
      };
    }, [targetPercentage])
  );

  // Alternative Animation: nur beim ersten Laden
    // useEffect(() => {
  //   // 3. Startet die Animation, sobald die Seite lädt
  //   Animated.timing(animatedWidth, {
  //     toValue: targetPercentage,
  //     duration: 2000,             // 2 Sekunden für ein sattes Gefühl
  //     easing: Easing.out(Easing.exp), // Startet schnell, bremst sanft ab
  //     useNativeDriver: false,     // Breite kann nicht nativ animiert werden
  //   }).start();
  // }, [targetPercentage]);

  return (
    <ScreenWrapper scrollable>
          {/* Avatar Section */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require('@/../public/assets/icon-profile.png')}
                style={styles.avatar} 
              />
              <View style={styles.levelBadge}>
                <AppText bold type='caption' style={{ fontSize: 10, color: MyTheme.text }}>LVL {mockProfile.profileLevel}</AppText>
              </View>
            </View>

            <AppText type='h1'>{mockProfile.profileName}</AppText>
            <AppText type='caption' style={{ marginTop: Spacing.xs }}>
              {mockProfile.profileClass} • <AppText type='caption' style={{color: MyTheme.secondaryAccent}}>{mockProfile.profileRank}</AppText>
            </AppText>

            {/* XP Bar */}
            <View style={styles.xpContainer}>
              <View style={styles.xpHeader}>
                <AppText bold type='caption'>XP PROGRESS</AppText>
                <AppText bold type='caption' style={{ color: MyTheme.text }}>{mockProfile.profileXp} / {500 + mockProfile.profileLevel * 300}</AppText>
              </View>
              <View style={styles.progressBarBg}>
                {/* Wir nutzen Animated.View als Container für den Gradienten */}
                <Animated.View 
                  style={[styles.progressBarFillContainer, { width: widthInterpolation }]}
                >
                  <LinearGradient
                    // Alternate design in primary accent?
                    // colors={[MyTheme.primaryAccent, '#333399']}
                    colors={['#8A2387', '#E94057', '#F27121']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Pressable style={styles.editButtonWrapper}>
                <LinearGradient
                  // Alternate design in primary Accent
                  // colors={[ MyTheme.primaryAccent, '#1a9a6c']}
                  colors={[ MyTheme.secondaryAccent, '#333399']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  {/* For the Alternative Design in primary Accent */}
                  {/* <MaterialCommunityIcons name="pencil" size={16} color={MyTheme.background} style={{marginRight: 5}}/>
                  <AppText type='title' style={{ fontSize: 14, color: MyTheme.background }}>Edit Profile</AppText> */}
                  <MaterialCommunityIcons name="pencil" size={16} color={MyTheme.text} />
                  <AppText type='title' style={{ fontSize: 14 }}>Edit Profile</AppText>
                </LinearGradient>
              </Pressable>

              <Pressable style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={16} color={MyTheme.text} />
                <AppText type='title' style={{ fontSize: 14 }}>Share Stats</AppText>
              </Pressable>
            </View>
          </View>

          {/* Stats Section */}
          <View style={{ marginTop: Spacing.xl }}>
            <View style={styles.sectionHeader}>
              {/* Alternative design in primary accent */}
              {/* <Ionicons name="stats-chart" size={18} color={MyTheme.primaryAccent} /> */}
              <Ionicons name="stats-chart" size={18} color={MyTheme.secondaryAccent} />
              <AppText type='title'>YOUR STATS</AppText>
            </View>

            <View style={styles.statsGrid}>
              <StatCard label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
              <StatCard label="TOTAL POINTS" value="12.4k" icon="gem" color="#007ec7" badge="Top 5%" />
              <StatCard label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
              <StatCard label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
            </View>
          </View>

          {/* Trophies Section */}
          <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
            <View style={styles.sectionHeaderRow}>
               <View style={{flexDirection: 'row', alignItems: 'center', gap: Spacing.sm}}>
                 <FontAwesome5 name="trophy" size={18} color="#FFD700" />
                 <AppText type='title'>TROPHIES</AppText>
               </View>
               <Pressable onPress={() => router.push('/trophies')}>
                 {/* <AppText type='caption' style={{color: MyTheme.primaryAccent }}>View All</AppText> */}
                 <AppText type='caption' style={{ color: '#FFD700' }}>View All</AppText>
               </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trophyScroll}>
              <TrophyCard title="Gym Rat" icon="dumbbell" />
              <TrophyCard title="Early Riser" icon="sun" unlocked/>
              <TrophyCard title="Cyborg" icon="robot" />
              <TrophyCard title="Reader" icon="book" unlocked />
              <TrophyCard title="Sugar Free" icon="candy-cane" />
              <TrophyCard title="Sleeper" icon="bed" />
            </ScrollView>
          </View>
    </ScreenWrapper>
  );
}

// Sub components
const StatCard = ({ label, value, icon, color, badge, blurred }) => (
  <View style={styles.statCard}>
    <View style={styles.statTop}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.xs }}>
        <View style={styles.numberContainer}>
          <AppText type='h2'>
            {value}
          </AppText>
          {blurred && (
            <BlurView 
              intensity={22} // (0-100)
              tint="dark"
              style={StyleSheet.absoluteFill} 
            />
          )}
        </View>

        {blurred && (
          <View style={styles.getMoreBadge}>
            <AppText type='caption' style={styles.getMoreText}>GET +</AppText>
          </View>)}
      </View>

      <FontAwesome5 name={icon} size={16} color={color} />
    </View>

    <AppText type='caption' style={{ marginTop: Spacing.xs }}>{label}</AppText>

    {badge && (
      <View style={styles.statBadge}>
        <AppText type='caption' style={{ fontSize: 10, color: MyTheme.text }}>{badge}</AppText>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  // Profile Header Styles
  profileHeader: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: MyTheme.secondary,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -Spacing.sm,
    alignSelf: 'center',
    backgroundColor: MyTheme.secondaryAccent,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 2,
    borderColor: MyTheme.background,
  },
  // XP Styles
  xpContainer: {
    width: '100%',
    marginTop: Spacing.lg
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: Spacing.borderRadius.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333'
  },
  progressBarFillContainer: {
    height: '100%',
    borderRadius: Spacing.borderRadius.full,
    overflow: 'hidden', // Hält den Gradienten in Form
  },
  // Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  editButtonWrapper: {
    borderRadius: Spacing.borderRadius.full,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.full,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    gap: Spacing.sm
  },
  // Sections Common
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%', // Knapp unter 50% für 2 Spalten
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberContainer: {
    overflow: 'hidden',
    borderRadius: 4
  },
  statBadge: {
    backgroundColor: MyTheme.primaryAccent,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  getMoreBadge: {
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: Spacing.borderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    marginLeft: Spacing.sm
  },
  getMoreText: {
    color: 'gold',
    fontSize: 12
  },
  // Trophies
  trophyScroll: {
    gap: Spacing.md
  },
  trophyItem: {
    alignItems: 'center',
    width: 80,
  },
  trophyIconBox: {
    width: 60,
    height: 60,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    marginBottom: Spacing.xs,
  },
  trophyText: {
    fontSize: 12,
    textAlign: 'center'
  },
});