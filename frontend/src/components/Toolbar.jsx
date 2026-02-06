import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Toolbar() {
  const insets = useSafeAreaInsets()

  return (
      <View style={[styles.container, { height: 56 + insets.top, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]}>
        <Text>Toolbar Placeholder</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    border: '1px solid grey',
    borderRadius: '50%',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
})