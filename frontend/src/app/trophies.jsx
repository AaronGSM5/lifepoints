import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';

export default function TrophiesScreen() {
  const mockTrophies = [
    {id: 1, title: 'Gym Rat', icon: 'dumbbell'},
    {id: 2, title: 'Early Riser', icon: 'sun'},
    {id: 3, title: 'Cyborg', icon: 'robot'},
    {id: 4, title: 'Reader', icon: 'book'},
    {id: 5, title: 'Sugar Free', icon: 'candy-cane'},
    {id: 6, title: 'Sleeper', icon: 'bed'},
    {id: 7, title: 'Gym Rat', icon: 'dumbbell'},
    {id: 8, title: 'Early Riser', icon: 'sun'},
    {id: 9, title: 'Cyborg', icon: 'robot'},
    {id: 10, title: 'Reader', icon: 'book'},
    {id: 11, title: 'Sugar Free', icon: 'candy-cane'},
    {id: 12, title: 'Sleeper', icon: 'bed'},
    {id: 13, title: 'Gym Rat', icon: 'dumbbell'},
    {id: 14, title: 'Early Riser', icon: 'sun'},
    {id: 15, title: 'Cyborg', icon: 'robot'},
    {id: 16, title: 'Reader', icon: 'book'},
    {id: 17, title: 'Sugar Free', icon: 'candy-cane'},
    {id: 18, title: 'Sleeper', icon: 'bed'},
    {id: 19, title: 'Gym Rat', icon: 'dumbbell'},
    {id: 20, title: 'Early Riser', icon: 'sun'},
    {id: 21, title: 'Cyborg', icon: 'robot'},
    {id: 22, title: 'Reader', icon: 'book'},
    {id: 23, title: 'Sugar Free', icon: 'candy-cane'},
    {id: 24, title: 'Sleeper', icon: 'bed'},
    {id: 25, title: 'Gym Rat', icon: 'dumbbell'},
    {id: 26, title: 'Early Riser', icon: 'sun'},
    {id: 27, title: 'Cyborg', icon: 'robot'},
    {id: 28, title: 'Reader', icon: 'book'},
    {id: 29, title: 'Sugar Free', icon: 'candy-cane'},
    {id: 30, title: 'Sleeper', icon: 'bed'},
  ]

  const TrophyCard = ({ title, icon }) => (
    <View style={styles.trophyItem}>
      <View style={styles.trophyIconBox}>
        <FontAwesome5 name={icon} size={24} color='#FFD700' />
      </View>
      <AppText type='caption' style={styles.trophyText}>{title}</AppText>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable={true}>
        <LinearGradient colors={[ MyTheme.background, '#121212']} style={styles.background} />
        <View style={styles.header}>
          <AppText type="h1">Trophies</AppText>
        </View>
        <View style={styles.trophiesContainer}>
        {mockTrophies.map((trophy) => (
          <TrophyCard key={trophy.id} title={trophy.title} icon={trophy.icon} />
        ))}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  },
  trophiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    paddingBottom: Spacing.xl
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
    fontSize: 13,
    textAlign: 'center'
  },
})