import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Berechnet Breite für 2-Spalten Grid

export default function ShopScreen() {
  const categories = ['All', 'Food', 'Fashion', 'Tech', 'Beauty'];

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. Wallet Card */}
          <LinearGradient
            colors={['#2E1D3B', '#1E1B2E']}
            style={styles.walletCard}
          >
            <View style={styles.walletHeader}>
              <Text style={styles.walletLabel}>YOUR POINTS</Text>
              <Ionicons name="wallet-outline" size={20} color="#FF00FF" />
            </View>
            
            <View style={styles.pointsRow}>
              <Text style={styles.pointsValue}>1,250</Text>
              <Text style={styles.pointsLabel}> LP</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>750 pts until Gold Tier</Text>
            </View>
          </LinearGradient>

          {/* 2. Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index} style={index === 0 ? styles.activeTab : styles.inactiveTab}>
                {index === 0 ? (
                  <LinearGradient
                    colors={['#FF00CC', '#9900CC']}
                    style={styles.activeTabGradient}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.activeTabText}>{cat}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.inactiveTabText}>{cat}</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 3. Featured Reward */}
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={18} color="#FF00FF" style={{marginRight: 8}} />
            <Text style={styles.sectionTitle}>Featured Reward</Text>
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
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
              
              <Text style={styles.featuredTitle}>Free Month Premium</Text>
              <Text style={styles.featuredSubtitle}>Spotify Individual Plan</Text>
              
              <View style={styles.featuredFooter}>
                <View>
                  <Text style={styles.oldPrice}>2,500 PTS</Text>
                  <Text style={styles.newPrice}>2,000 PTS</Text>
                </View>
                <TouchableOpacity style={styles.redeemButton}>
                  <Text style={styles.redeemText}>Redeem</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* 4. For You Grid */}
          <Text style={[styles.sectionTitle, {marginTop: 25, marginBottom: 15}]}>For You</Text>
          
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
        <Feather name={icon === 'shopping-bag' ? 'shopping-bag' : icon === 'coffee' ? 'coffee' : 'gift'} size={14} color="#fff" />
      </View>
    </View>
    
    <View style={styles.cardContent}>
      <Text style={styles.cardBrand}>{brand}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={[styles.cardPoints, isLocked && {color: '#666'}]}>
          {points} PTS
        </Text>
        {isLocked ? (
           <View style={styles.lockedBadge}>
             <Text style={styles.lockedText}>Locked</Text>
           </View>
        ) : (
           <TouchableOpacity style={styles.miniFab}>
             <MaterialCommunityIcons name="shopping-outline" size={14} color="#FF00FF" />
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
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Wallet Card
  walletCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginVertical: 25,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  walletLabel: { color: '#aaa', fontSize: 10, fontWeight: 'bold' },
  pointsRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  pointsValue: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  pointsLabel: { color: '#FF00FF', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF00FF',
    borderRadius: 3,
  },
  progressText: { color: '#888', fontSize: 10 },

  // Tabs
  tabsContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    // paddingLeft: 20, // Optional, wenn man möchte, dass Tabs am Rand starten
  },
  activeTab: { marginRight: 10, borderRadius: 20, overflow: 'hidden' },
  inactiveTab: { 
    marginRight: 10, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#333', 
    backgroundColor: '#1E1B2E',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTabGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTabText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  inactiveTabText: { color: '#888', fontSize: 12, fontWeight: 'bold' },

  // Featured Reward
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
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
    backgroundColor: 'rgba(0, 255, 127, 0.2)', // Green trans
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 5, alignSelf: 'flex-start',
    marginBottom: 8, borderWidth: 1, borderColor: 'rgba(0, 255, 127, 0.5)'
  },
  bestValueText: { color: '#00FF7F', fontSize: 10, fontWeight: 'bold' },
  featuredTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  featuredSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 15 },
  featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  oldPrice: { color: 'rgba(255,255,255,0.6)', fontSize: 10, textDecorationLine: 'line-through' },
  newPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  redeemButton: {
    backgroundColor: '#fff',
    paddingVertical: 8, paddingHorizontal: 20,
    borderRadius: 20,
  },
  redeemText: { color: '#E94057', fontSize: 12, fontWeight: 'bold' },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1E1B2E',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#444'
  },
  cardContent: { padding: 12 },
  cardBrand: { color: '#FF00FF', fontSize: 9, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  cardTitle: { color: '#fff', fontSize: 13, fontWeight: 'bold', marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPoints: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  miniFab: {
    width: 24, height: 24,
    borderRadius: 12, backgroundColor: '#2A2A2A',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#444'
  },
  lockedBadge: { backgroundColor: '#2A2A2A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  lockedText: { color: '#666', fontSize: 8, fontWeight: 'bold' },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.5)',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 20, right: 20,
    backgroundColor: '#1E1B2E',
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1, borderColor: '#333',
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5, shadowRadius: 10, elevation: 10,
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 9, marginTop: 4 },
  fabContainer: {
    top: -25, // Hebt den Button heraus
  },
  fab: {
    width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#FF00CC", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, shadowRadius: 8, elevation: 5,
  }
});