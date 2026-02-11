import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';

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
                <Text style={styles.levelText}>LVL {mockProfile.profileLevel}</Text>
              </View>
            </View>

            <Text style={styles.userName}>{mockProfile.profileName}</Text>
            <Text style={styles.userClass}>{mockProfile.profileClass} • <Text style={{color: MyTheme.secondaryAccent}}>{mockProfile.profileRank}</Text></Text>

            {/* XP Bar */}
            <View style={styles.xpContainer}>
              <View style={styles.xpHeader}>
                <Text style={styles.xpLabel}>XP PROGRESS</Text>
                <Text style={styles.xpValue}>{mockProfile.profileXp} / {500 + mockProfile.profileLevel * 300}</Text>
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
                  <Text style={styles.btnText}>Edit Profile</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={16} color={MyTheme.text} style={{marginRight: 5}} />
                <Text style={styles.btnText}>Share Stats</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="stats-chart" size={20} color={MyTheme.secondaryAccent} />
              <Text style={styles.sectionTitle}>STATS</Text>
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
                 <FontAwesome5 name="trophy" size={18} color="#FFD700" style={{marginRight: 8}}/>
                 <Text style={styles.sectionTitle}>TROPHIES</Text>
               </View>
               <TouchableOpacity>
                 <Text style={{color: '#FFD700', fontSize: 12}}>View All</Text>
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
      {blurred ? <><Text style={[styles.statValue, { filter: 'blur(4.5px)' }]}>{value}</Text><Text style={{ color: MyTheme.text, fontWeight: 'bold', borderWidth: 1, borderColor: 'gold', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 5}}>GET +</Text></> : <Text style={styles.statValue}>{value}</Text>}
      <FontAwesome5 name={icon} size={16} color={color || "#666"} />
    </View>
    <Text style={styles.statLabel}>{label}</Text>
    {badge && (
      <View style={styles.statBadge}>
        <Text style={styles.statBadgeText}>{badge}</Text>
      </View>
    )}
  </View>
);

const TrophyCard = ({ title, icon }) => (
  <View style={styles.trophyContainer}>
    <View style={styles.trophyIconBox}>
      <FontAwesome5 name={icon} size={24} color='#FFD700' />
    </View>
    <Text style={styles.trophyText}>{title}</Text>
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
  safeArea: {
    flex: 1,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
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
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: 100,
    blurRadius: 20, // Funktioniert nicht überall perfekt in RN, oft braucht man ein Bild
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
    bottom: -5,
    alignSelf: 'center',
    backgroundColor: MyTheme.secondaryAccent,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: MyTheme.background,
  },
  levelText: {
    color: MyTheme.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  userName: {
    color: MyTheme.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userClass: {
    color: MyTheme.muted,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 15,
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
  xpLabel: { color: MyTheme.muted, fontSize: 10, fontWeight: 'bold' },
  xpValue: { color: MyTheme.text, fontSize: 10, fontWeight: 'bold' },
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
  btnText: {
    color: MyTheme.text,
    fontSize: 12,
    fontWeight: '600',
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
    color: MyTheme.text,
    fontSize: 14,
    fontWeight: 'bold',
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
    color: MyTheme.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: MyTheme.muted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 5,
  },
  statBadge: {
    backgroundColor: MyTheme.primaryAccent,
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  statBadgeText: {
    color: MyTheme.text,
    fontSize: 9,
    fontWeight: 'bold',
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
    color: MyTheme.text,
    fontSize: 11,
    textAlign: 'center',
  },
});