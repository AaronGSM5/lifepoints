import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';
import AppText from '@/components/AppText';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Berechnet Breite für 2-Spalten Grid

export default function ShopScreen() {
  const categories = ['All', 'Food', 'Fashion', 'Tech', 'Beauty'];

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. Wallet Card */}
          <LinearGradient
            colors={[ MyTheme.background, '#121212']}
            style={styles.walletCard}
          >
            <View style={styles.walletHeader}>
              <AppText type='caption' style={styles.walletLabel}>YOUR POINTS</AppText>
              <Ionicons name="wallet-outline" size={20} color={MyTheme.primaryAccent} />
            </View>
            
            <View style={styles.pointsRow}>
              <AppText type='title' style={{ fontSize: 32 }}>1,250</AppText>
              <AppText type='title' style={styles.pointsLabel}> LP</AppText>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <AppText type='caption' style={{ fontSize: 10 }}>750 pts until Gold Tier</AppText>
            </View>
          </LinearGradient>

          {/* 2. Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index} style={index === 0 ? styles.activeTab : styles.inactiveTab}>
                {index === 0 ? (
                  <LinearGradient
                    colors={[ MyTheme.secondary, MyTheme.primary]}
                    style={styles.activeTabGradient}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  >
                    <AppText type='title' style={{ fontSize: 12 }}>{cat}</AppText>
                  </LinearGradient>
                ) : (
                  <AppText type='title' style={{ fontSize: 12, color: MyTheme.muted }}>{cat}</AppText>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 3. Featured Reward */}
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={18} color="#F27121" style={{marginRight: 8}} />
            <AppText type='title'>Featured Reward</AppText>
          </View>

          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']} // Sunset Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredIconContainer}>
               <FontAwesome5 name="music" size={20} color="#fff" />
            </View>
            
            <View style={styles.featuredContent}>
              <View style={styles.bestValueBadge}>
                <AppText type='body' style={styles.bestValueText}>BEST VALUE</AppText>
              </View>
              
              <AppText type='title'>Free Month Premium</AppText>
              <AppText type='caption' style={styles.featuredSubtitle}>Spotify Individual Plan</AppText>
              
              <View style={styles.featuredFooter}>
                <View>
                  <AppText type='caption' style={styles.oldPrice}>2,500 PTS</AppText>
                  <AppText type='title'>2,000 PTS</AppText>
                </View>
                <TouchableOpacity style={styles.redeemButton}>
                  <AppText type='title' style={styles.redeemText}>Redeem</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* 4. For You Grid */}
          <AppText type='title' style={{marginTop: 25, marginBottom: 15}}>For You</AppText>
          
          <View style={styles.gridContainer}>
            <RewardCard 
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"
              brand="ADIDAS"
              title="15% Off Storewide"
              points="450"
              icon="shopping-bag"
            />
            <RewardCard 
              image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop"
              brand="STARBUCKS"
              title="Free Tall Coffee"
              points="300"
              icon="coffee"
            />
            <RewardCard 
              image="https://images.unsplash.com/photo-1605218427368-35b81a3dd64c?q=80&w=400&auto=format&fit=crop" // Tech image
              brand="AMAZON"
              title="$10 Gift Card"
              points="2,000"
              icon="lock" // Locked item
              isLocked
            />
             <RewardCard 
              image="https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=400&auto=format&fit=crop"
              brand="NIKE"
              title="20% Off Shoes"
              points="800"
              icon="shopping-bag"
            />
          </View>

        </ScrollView>

    </View>
  );
}

// --- Sub-Components ---

const RewardCard = ({ image, brand, title, points, icon, isLocked }) => (
  <View style={styles.gridCard}>
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      {/* Icon Overlay */}
      <View style={styles.cardIconBadge}>
        <Feather name={icon === 'shopping-bag' ? 'shopping-bag' : icon === 'coffee' ? 'coffee' : 'gift'} size={14} color={MyTheme.text} />
      </View>
    </View>
    
    <View style={{ padding: 12 }}>
      <AppText type='body' style={styles.cardBrand}>{brand}</AppText>
      <AppText type='body' style={styles.cardTitle}>{title}</AppText>
      
      <View style={styles.cardFooter}>
        <AppText type='body' style={[styles.cardPoints, isLocked && {color: MyTheme.muted}]}>
          {points} PTS
        </AppText>
        {isLocked ? (
           <View style={styles.lockedBadge}>
             <AppText type='caption' style={styles.lockedText}>Locked</AppText>
           </View>
        ) : (
           <TouchableOpacity style={styles.miniFab}>
             <MaterialCommunityIcons name="shopping-outline" size={14} color={MyTheme.primaryAccent} />
           </TouchableOpacity>
        )}
      </View>
    </View>
    
    {/* Locked Overlay Effect */}
    {isLocked && <View style={styles.lockedOverlay} />}
  </View>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Platz für Bottom Bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },

  // Wallet Card
  walletCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    marginVertical: 25,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  walletLabel: { fontSize: 10, fontWeight: 'bold' },
  pointsRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  pointsLabel: { color: MyTheme.primaryAccent, marginBottom: 5 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: 3,
  },

  // Tabs
  tabsContainer: {
    marginBottom: 25,
    flexDirection: 'row',
  },
  activeTab: { marginRight: 10, borderRadius: 20, overflow: 'hidden' },
  inactiveTab: { 
    marginRight: 10, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#333', 
    backgroundColor: '#1b222e',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTabGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  // Featured Reward
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  featuredCard: {
    borderRadius: 20,
    padding: 20,
    height: 220,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  featuredIconContainer: {
    width: 35, height: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  featuredContent: { marginTop: 10 },
  bestValueBadge: {
    backgroundColor: 'rgba(47, 196, 146, 0.2)',
    paddingHorizontal: 6, paddingVertical: 3,
    borderRadius: 5, alignSelf: 'flex-start',
    marginBottom: 8, borderWidth: 1, borderColor: 'rgba(47, 196, 146, 0.5)'
  },
  bestValueText: { color: '#00FF7F', fontSize: 10, fontWeight: 'bold' },
  featuredSubtitle: { color: 'rgba(248,250,252,0.8)', fontSize: 12, marginBottom: 15 },
  featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  oldPrice: { fontSize: 10, textDecorationLine: 'line-through' },
  redeemButton: {
    backgroundColor: MyTheme.text,
    paddingVertical: 6, paddingHorizontal: 18,
    borderRadius: 20,
  },
  redeemText: { color: '#E94057', fontSize: 12, fontWeight: 'semibold' },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: MyTheme.primary,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  },
  cardImageContainer: {
    height: 100,
    position: 'relative',
  },
  cardImage: { width: '100%', height: '100%' },
  cardIconBadge: {
    position: 'absolute',
    top: '50%', left: '50%',
    marginLeft: -15, marginTop: -15,
    width: 30, height: 30,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, 
    borderColor: 'rgba(68, 68, 68, 0.8)'
  },
  cardBrand: { color: MyTheme.primaryAccent, fontSize: 9, textTransform: 'uppercase', fontWeight: 'bold' },
  cardTitle: { fontSize: 13, fontWeight: 'bold' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPoints: { fontSize: 12, fontWeight: 'bold' },
  miniFab: {
    width: 24, height: 24,
    borderRadius: 12, backgroundColor: MyTheme.background,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: MyTheme.secondary
  },
  lockedBadge: { backgroundColor: '#2A2A2A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  lockedText: { fontSize: 9, fontWeight: 'bold' },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.5)',
  }
});