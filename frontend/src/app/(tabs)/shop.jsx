import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (Spacing.md * 3)) / 2; // Width for 2-Column Grid

export default function ShopScreen() {
  const categories = ['All', 'Food', 'Fashion', 'Tech', 'Beauty'];

  // 1. Animations-Wert (0 bis 60 für 60%)
  const animatedWalletProgress = useRef(new Animated.Value(0)).current;
  
  const walletWidth = animatedWalletProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useFocusEffect(
    useCallback(() => {
      animatedWalletProgress.setValue(0); // Reset
      
      Animated.timing(animatedWalletProgress, {
        toValue: 60, // Mock-Wert: 60%
        duration: 1500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }, [])
  );

  return (
    <ScreenWrapper scrollable={true}>
      <LinearGradient colors={[ MyTheme.background, '#121212']} style={styles.background} />
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
              <AppText type='h1'>1.250</AppText>
              <AppText type='title' style={styles.pointsLabel}>LP</AppText>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <Animated.View style={[styles.progressBarFill, { width: walletWidth, backgroundColor: MyTheme.primaryAccent}]} />
              </View>
              <AppText type='caption'>750 pts until Gold Tier</AppText>
            </View>
          </LinearGradient>

          {/* 2. Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer} contentContainerStyle={{ gap: Spacing.sm }}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index}>
                {index === 0 ? (
                  <LinearGradient
                    colors={[ MyTheme.secondary, MyTheme.primary]}
                    style={styles.activeTabGradient}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  >
                    <AppText type='title' style={{ fontSize: 12 }}>{cat}</AppText>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTab}>
                    <AppText type='title' style={{ fontSize: 12, color: MyTheme.muted }}>{cat}</AppText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 3. Featured Reward */}
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={18} color="#F27121" />
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
                <AppText type='caption' style={styles.bestValueText}>BEST VALUE</AppText>
              </View>
              
              <AppText type='h2'>Free Month Premium</AppText>
              <AppText type='caption' style={styles.featuredSubtitle}>Spotify Individual Plan</AppText>
              
              <View style={styles.featuredFooter}>
                <View>
                  <AppText type='caption' style={{ textDecorationLine: 'line-through' }}>2.500 PTS</AppText>
                  <AppText type='title'>2.000 PTS</AppText>
                </View>
                <TouchableOpacity style={styles.redeemButton}>
                  <AppText type='title' style={styles.redeemText}>Redeem</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* 4. 'For You' Grid */}
          <AppText type='title' style={{marginTop: Spacing.lg, marginBottom: Spacing.md}}>For You</AppText>
          
          <View style={styles.gridContainer}>
            <RewardCard 
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"
              brand="ADIDAS"
              title="15% Off Storewide"
              points="450"
              icon="shopping-bag"
            />
            <RewardCard 
              image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400"
              brand="STARBUCKS"
              title="Free Tall Coffee"
              points="300"
              icon="coffee"
            />
            <RewardCard 
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400"
              brand="AMAZON"
              title="$10 Gift Card"
              points="2,000"
              icon="lock" // Locked item
              isLocked
            />
             <RewardCard 
              image="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400"
              brand="NIKE"
              title="20% Off Shoes"
              points="800"
              icon="shopping-bag"
            />
          </View>
    </ScreenWrapper>
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
    
    <View style={{ padding: Spacing.sm, gap: 2 }}>
      <AppText type='caption' style={styles.cardBrand}>{brand}</AppText>
      <AppText type='body' style={{ fontFamily: 'Inter-Bold' }} numberOfLines={2}>{title}</AppText>
      
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  // Wallet Card
  walletCard: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    marginVertical: Spacing.md,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  walletLabel: {
    fontFamily: 'Inter-Bold',
    opacity: 0.8
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.md
  },
  pointsLabel: {
    color: MyTheme.primaryAccent,
    marginLeft: Spacing.xs
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: Spacing.borderRadius.full,
    marginBottom: Spacing.xs,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Spacing.borderRadius.full
  },
  // Tabs
  tabsContainer: {
    marginBottom: Spacing.lg,
    // flexDirection: 'row',
  },
  activeTabGradient: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.borderRadius.full
  },
  inactiveTab: { 
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.borderRadius.full, 
    borderWidth: 1, 
    borderColor: '#333', 
    backgroundColor: '#1b222e',
  },
  // Featured Reward
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm
  },
  featuredCard: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  featuredIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContent: {
    marginTop: Spacing.md,
    gap: Spacing.xs
  },
  bestValueBadge: {
    backgroundColor: 'rgba(0, 255, 127, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 127, 0.8)'
  },
  bestValueText: {
    color: '#00FF7F',
    fontSize: 12,
    fontFamily: 'Inter-Bold'
  },
  featuredSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: Spacing.md
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  redeemButton: {
    backgroundColor: MyTheme.text,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.full,
  },
  redeemText: {
    color: '#E94057',
    fontSize: 14,
    fontFamily: 'Inter-Bold'
  },
  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingBottom: Spacing.xl
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: MyTheme.secondary,
  },
  cardImageContainer: {
    height: 100,
    backgroundColor: '#333'
  },
  cardImage: {
    width: '100%',
    height: '100%'
  },
  cardIconBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBrand: {
    color: MyTheme.primaryAccent,
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm
  },
  cardPoints: {
    fontSize: 14,
    fontFamily: 'Inter-Bold'
  },
  miniFab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: MyTheme.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  lockedBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4
  },
  lockedText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold'
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.6)',
  }
});