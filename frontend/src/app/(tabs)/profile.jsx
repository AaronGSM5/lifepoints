import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';
import AppText from '@/components/AppText';

export default function ProfileScreen() {

  const mockProfile = {
    backgroundImg: '',
    profileName: 'Tomhtzx',
    profileClass: 'Habit Hunter Class',
    profileRank: 'Elite',
    profileLevel: '42',
    profileXp: '3520'
  }

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[ MyTheme.background, '#121212']}
        style={styles.background}
      />
        {/* ScrollView? */}
        <View contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require('@/../public/assets/icon-profile.png')}
                style={styles.avatar} 
              />
              <View style={styles.levelBadge}>
                <AppText type='body' style={{ fontSize: 10, fontWeight: 'bold' }}>LVL {mockProfile.profileLevel}</AppText>
              </View>
            </View>

            <AppText type='h2'>{mockProfile.profileName}</AppText>
            <AppText type='caption' style={{ marginTop: 2, marginBottom: 15 }}>{mockProfile.profileClass} • <AppText type='caption' style={{color: MyTheme.secondaryAccent}}>{mockProfile.profileRank}</AppText></AppText>

            {/* XP Bar */}
            <View style={styles.xpContainer}>
              <View style={styles.xpHeader}>
                <AppText type='caption' style={styles.xpLabel}>XP PROGRESS</AppText>
                <AppText type='body' style={styles.xpValue}>{mockProfile.profileXp} / {500 + mockProfile.profileLevel * 300}</AppText>
              </View>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={['#8A2387', '#E94057', '#F27121']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: mockProfile.profileXp / (500 + mockProfile.profileLevel * 300) * 100 +'%' }]} 
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButtonWrapper}>
                <LinearGradient
                  colors={[ MyTheme.secondaryAccent, '#333399']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <MaterialCommunityIcons name="pencil" size={16} color={MyTheme.text} style={{marginRight: 5}}/>
                  <AppText type='title' style={{ fontSize: 14 }}>Edit Profile</AppText>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={16} color={MyTheme.text} style={{marginRight: 5}} />
                <AppText type='title' style={{ fontSize: 14 }}>Share Stats</AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="stats-chart" size={18} color={MyTheme.secondaryAccent} />
              <AppText type='title' style={styles.sectionTitle}>STATS</AppText>
            </View>

            <View style={styles.statsGrid}>
              <StatCard label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
              <StatCard label="TOTAL POINTS" value="12.4k" icon="diamond" color="#C70039" badge="Top 5%" />
              <StatCard label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
              <StatCard label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
            </View>
          </View>

          {/* Trophies Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <FontAwesome5 name="trophy" size={18} color="#FFD700" />
                 <AppText type='title' style={styles.sectionTitle}>TROPHIES</AppText>
               </View>
               <TouchableOpacity>
                 <AppText type='body' style={{color: '#FFD700', fontSize: 12}}>View All</AppText>
               </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 25}}>
              <TrophyCard title="Sugar Free Week" icon="candy-cane" />
              <TrophyCard title="Early Riser" icon="sun" />
              <TrophyCard title="Gym Rat" icon="dumbbell" />
              <TrophyCard title="Reader" icon="book" />
            </ScrollView>
          </View>
        {/* ScrollView? */}
        </View>
    </View>
  );
}

// Hilfskomponenten für saubereren Code
const StatCard = ({ label, value, icon, color, badge, blurred }) => (
  <View style={styles.statCard}>
    <View style={styles.statTop}>
      {blurred ? <><AppText type='title' style={[styles.statValue, { filter: 'blur(4.5px)' }]}>{value}</AppText><AppText type='body' style={{ color: MyTheme.text, fontWeight: 'bold', borderWidth: 1, borderColor: 'gold', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 5}}>GET +</AppText></> : <AppText type='title' style={styles.statValue}>{value}</AppText>}
      <FontAwesome5 name={icon} size={16} color={color || "#666"} />
    </View>
    <AppText type='caption' style={{ fontSize: 10 }}>{label}</AppText>
    {badge && (
      <View style={styles.statBadge}>
        <AppText type='body' style={{ fontSize: 10 }}>{badge}</AppText>
      </View>
    )}
  </View>
);

const TrophyCard = ({ title, icon }) => (
  <View style={styles.trophyContainer}>
    <View style={styles.trophyIconBox}>
      <FontAwesome5 name={icon} size={24} color='#FFD700' />
    </View>
    <AppText type='body' style={styles.trophyText}>{title}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.background, // Fallback
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Profile Header Styles
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: MyTheme.secondaryAccent,
    paddingHorizontal: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: MyTheme.background,
  },

  // XP Styles
  xpContainer: {
    width: '85%',
    marginBottom: 20,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  xpLabel: { fontSize: 10, fontWeight: 'bold' },
  xpValue: { fontSize: 10, fontWeight: 'bold' },
  progressBarBg: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  editButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  // Sections Common
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    marginLeft: 10,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%', // Knapp unter 50% für 2 Spalten
    backgroundColor: MyTheme.primary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statBadge: {
    backgroundColor: MyTheme.primaryAccent,
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },

  // Trophies
  trophyContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  trophyIconBox: {
    width: 60,
    height: 60,
    backgroundColor: MyTheme.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    marginBottom: 8,
  },
  trophyText: {
    fontSize: 11,
    textAlign: 'center'
  },
});