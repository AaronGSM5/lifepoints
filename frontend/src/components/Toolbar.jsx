import { View, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { MyTheme } from '@/constants/Colors';

export default function Toolbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const mainTabs = ['/home', '/tasks', '/shop', '/profile'];
  const isMainTab = mainTabs.includes(pathname);

  // Responsive Logo
  const screenWidth = Dimensions.get('window').width;
  const logoWidth = Math.min(screenWidth * 0.4, 180);
  const logoHeight = logoWidth / 3.75;

  return (
    <View style={[styles.container, { 
      height: 56 + insets.top, 
      paddingTop: insets.top, 
      paddingLeft: Math.max(12, insets.left), 
      paddingRight: Math.max(12, insets.right)
    }]}>
      {/* Back-Button */}
      <View style={styles.sideSection}>
        {!isMainTab && (
          <Pressable onPress={() => router.back()}>
            <Ionicons name={'chevron-back'} size={24} color='white' />
          </Pressable>
        )}
      </View>

      {/* Title */}
      <View style={styles.centerSection}>
      <Image
      source={require('@/../public/assets/adaptive-icon.png')}
      style={{ width: logoWidth, height: logoHeight }}
      resizeMode="contain"
    />
    </View>
    {/* Alternative Title (Lifepoints text) */}
      {/* <Image
      source={require('@/../public/assets/lifepointsLogo.png')}
      style={{ width: logoWidth, height: logoHeight }}
      resizeMode="contain"
    /> */}

      <View style={[styles.sideSection, { alignItems: 'flex-end' }]}>
      {pathname === '/profile' ? (
          <Pressable onPress={() => router.push('/settings')}>
            <Ionicons name={'settings-outline'} size={24} color='white' />
          </Pressable>
        ) : isMainTab && pathname !== '/profile' ? (
          <Pressable onPress={() => router.push('/notifications')}>
            <Ionicons name={'notifications-outline'} size={24} color='white' />
          </Pressable>
        ) : (
          /* Placeholder damit Logo mittig bleibt */
          <View style={{ width: 40 }} />
        )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.background,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sideSection: {
    flex: 1, // Nimmt jeweils 1/3 ein
    justifyContent: 'center',
  },
  centerSection: {
    flex: 2, // Logo bekommt mehr Platz
    alignItems: 'center',
    justifyContent: 'center',
  }
});
