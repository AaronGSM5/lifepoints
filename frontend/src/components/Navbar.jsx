import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'

export default function Navbar({ activePage, setActivePage }) {
  const insets = useSafeAreaInsets()

  return (
      <View style={[styles.container, { paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
          <TouchableOpacity onPress={() => setActivePage("home")} style={styles.button}>
            <Ionicons name={activePage === "home" ? "home" : "home-outline"} size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivePage("shop")} style={styles.button}>
            <Ionicons name={activePage === "shop" ? "bag" : "bag-outline"} size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivePage("profile")} style={styles.button}>
            <Ionicons name={activePage === "profile" ? "person" : "person-outline"} size={26} color="white" />
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  button: {
    border: '1px solid grey',
    borderRadius: '20%',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
})