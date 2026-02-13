import { View } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MyTheme } from '@/constants/Colors'
import AppText from './AppText'

export default function Content() {
const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: MyTheme.background, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      <AppText type='body'>Placeholder Content</AppText>
    </View>
  )
}