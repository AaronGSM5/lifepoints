import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';

export default function HomeScreen() {
  return (
    <ScreenWrapper scrollable>
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.background} />

        <View style={styles.heroSection}>
          <Image source={require('../../../public/assets/sportevent.png')} style={styles.heroImage} resizeMode="cover"/>
        </View>

        {/* ACTIVE TASKS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>ACTIVE TASKS</Text>
            <View style={styles.pulseDot} />
          </View>
          
          <View style={styles.taskCardActive}>
            <View style={styles.taskIconContainer}>
              <Ionicons name="timer" size={20} color={MyTheme.primaryAccent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>Morning Vitality</Text>
            </View>
            <View style={styles.lpContainer}>
              <Text style={styles.lpValue}>1,500</Text>
              <Text style={styles.lpUnit}>LP</Text>
            </View>
            <TouchableOpacity style={styles.finishButton}>
              <Text style={styles.finishButtonText}>FINISH</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RECOMMENDED TASKS */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>RECOMMENDED TASKS</Text>
            <TouchableOpacity><AppText style={styles.seeAllText}>See all</AppText></TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[
              { title: 'Deep Breathing', lp: '500', icon: 'self-improvement', color: '#3B82F6' },
              { title: 'Fast Walk', lp: '750', icon: 'directions-run', color: '#10B981' },
              { title: 'Read 5 Pages', lp: '300', icon: 'menu-book', color: '#F472B6' }
            ].map((item, index) => (
              <View key={index} style={styles.recomCard}>
                <MaterialIcons name={item.icon} size={28} color={item.color} style={styles.recomIcon} />
                <Text style={styles.recomTitle}>{item.title}</Text>
                <View style={styles.recomFooter}>
                  <Text style={styles.recomLP}>{item.lp} <Text style={{fontSize: 8}}>LP</Text></Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={18} color={MyTheme.primaryAccent} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* PRODUCTIVITY CHART */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PRODUCTIVITY</Text>
          <Text style={styles.productivityText}>You earned <Text style={{color: MyTheme.primaryAccent}}>2,450 LP</Text> this week!</Text>
          
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {[45, 75, 60, 90, 55, 100, 35].map((h, i) => (
                <View key={i} style={styles.chartColumnWrapper}>
                  <View style={[styles.chartBar, { height: `${h}%`, opacity: h/100 }]} />
                  <Text style={styles.chartDay}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SUGGESTION INPUT */}
        <View style={styles.suggestionBox}>
          <View style={styles.suggestionHeader}>
            <View style={styles.bulbIcon}><Ionicons name="bulb-outline" size={20} color="white" /></View>
            <View>
              <AppText type='title' >Suggest a Task</AppText>
              <AppText type='caption'>Earn LP if your idea gets added!</AppText>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View style={{ flex: 1 }}>
            <TextInput 
              placeholder="I want to see a task for..." 
              placeholderTextColor={MyTheme.muted}
              style={styles.input}
            />
            </View>
            <View>
            <Pressable style={styles.sendButton}>
              <Ionicons name="send" size={18} color="white" />
            </Pressable>
            </View>
          </View>
        </View>

      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  heroSection: {
    width: "100%",
    minHeight: 200,
    marginBottom: Spacing.lg
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  bannerContainer: {
    height: 120,
    marginBottom: 30,
    overflow: 'hidden'
  },
  bannerImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
  bannerOverlay: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 24,
    flex: 1,
    justifyContent: 'flex-end'
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  activeBadgeText: {
    color: MyTheme.text,
    fontSize: 9,
    fontFamily: 'Inter-Bold',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  timeLeftBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  timeLeftText: {
    color: MyTheme.text,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: MyTheme.muted,
    letterSpacing: 1,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MyTheme.primaryAccent,
    marginLeft: 8,
  },
  taskCardActive: {
    backgroundColor: MyTheme.primary,
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  taskIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskTitle: {
    color: MyTheme.text,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  lpContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  lpValue: {
    color: MyTheme.primaryAccent,
    fontFamily: 'Inter-Bold',
    fontSize: 13,
  },
  lpUnit: {
    color: MyTheme.primaryAccent,
    fontSize: 8,
    fontFamily: 'Inter-Bold',
  },
  finishButton: {
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  finishButtonText: {
    color: MyTheme.text,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recomCard: {
    width: 150,
    backgroundColor: MyTheme.primary,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
  },
  recomIcon: {
    marginBottom: 10,
  },
  recomTitle: {
    color: MyTheme.text,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  recomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  recomLP: {
    color: MyTheme.primaryAccent,
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
  addButton: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productivityText: {
    color: MyTheme.text,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 15,
  },
  chartCard: {
    backgroundColor: MyTheme.primary,
    borderRadius: 24,
    padding: 20,
    height: 160,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartColumnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: '70%',
    backgroundColor: MyTheme.primaryAccent,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  chartDay: {
    color: MyTheme.muted,
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  suggestionBox: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 20,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bulbIcon: {
    width: 40,
    height: 40,
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionTitle: {
    color: MyTheme.text,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  suggestionSub: {
    color: MyTheme.muted,
    fontSize: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: Spacing.borderRadius.md,
    padding: Spacing.sm
  },
  input: {
    flex: 1,
    color: MyTheme.text,
  },
  sendButton: {
    width: 35,
    height: 35,
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: Spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeAllText: {
    color: MyTheme.primaryAccent,
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  }
});