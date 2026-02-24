import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';

export default function TrophiesScreen() {
  const mockTrophies = [
    {id: 1, title: 'Gym Rat', icon: 'dumbbell', unlocked: false},
    {id: 2, title: 'Early Riser', icon: 'sun', unlocked: false},
    {id: 3, title: 'Cyborg', icon: 'robot', unlocked: false},
    {id: 4, title: 'Reader', icon: 'book', unlocked: true},
    {id: 5, title: 'Sugar Free', icon: 'candy-cane', unlocked: false},
    {id: 6, title: 'Sleeper', icon: 'bed', unlocked: false},
    {id: 7, title: 'Gym Rat', icon: 'dumbbell', unlocked: true},
    {id: 8, title: 'Early Riser', icon: 'sun', unlocked: false},
    {id: 9, title: 'Cyborg', icon: 'robot', unlocked: false},
    {id: 10, title: 'Reader', icon: 'book', unlocked: false},
    {id: 11, title: 'Sugar Free', icon: 'candy-cane', unlocked: false},
    {id: 12, title: 'Sleeper', icon: 'bed', unlocked: true},
    {id: 13, title: 'Gym Rat', icon: 'dumbbell', unlocked: false},
    {id: 14, title: 'Early Riser', icon: 'sun', unlocked: true},
    {id: 15, title: 'Cyborg', icon: 'robot', unlocked: false},
    {id: 16, title: 'Reader', icon: 'book', unlocked: false},
    {id: 17, title: 'Sugar Free', icon: 'candy-cane', unlocked: true},
    {id: 18, title: 'Sleeper', icon: 'bed', unlocked: false},
    {id: 19, title: 'Gym Rat', icon: 'dumbbell', unlocked: true},
    {id: 20, title: 'Early Riser', icon: 'sun', unlocked: false},
    {id: 21, title: 'Cyborg', icon: 'robot', unlocked: false},
    {id: 22, title: 'Reader', icon: 'book', unlocked: false},
    {id: 23, title: 'Sugar Free', icon: 'candy-cane', unlocked: false},
    {id: 24, title: 'Sleeper', icon: 'bed', unlocked: false},
    {id: 25, title: 'Gym Rat', icon: 'dumbbell', unlocked: false},
    {id: 26, title: 'Early Riser', icon: 'sun', unlocked: false},
    {id: 27, title: 'Cyborg', icon: 'robot', unlocked: true},
    {id: 28, title: 'Reader', icon: 'book', unlocked: false},
    {id: 29, title: 'Sugar Free', icon: 'candy-cane', unlocked: false},
    {id: 30, title: 'Sleeper', icon: 'bed', unlocked: false},
  ]

  const TrophyCard = ({ title, icon, unlocked }) => (
    <View style={styles.trophyItem}>
      <View style={styles.trophyIconBox}>
        <FontAwesome5 name={icon} size={24} color={ unlocked ? '#FFD700' : '#838383' } />
      </View>
      <AppText type='caption' style={styles.trophyText}>{title}</AppText>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable>
        <View style={styles.header}>
          <AppText type="h1">Trophies</AppText>
        </View>
        <View style={styles.trophiesContainer}>
        {mockTrophies.map((trophy) => (
          <TrophyCard key={trophy.id} title={trophy.title} icon={trophy.icon} unlocked={trophy.unlocked}/>
        ))}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
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