import { View, Text } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Content() {
const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: 'grey', paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      <Text>Placeholder Content</Text>
    </View>
  )
}