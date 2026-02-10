import { ScrollView, Text, View } from "react-native";
import TaskList from "../../src/components/TaskList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1 }}>
    <View style={{ flex: 2.5, borderWidth: 1, borderColor: 'black' }}><Text>Das ist jetzt die Section</Text></View>
    <View style={{ flex: 7.5 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: Math.max(16, insets.left + insets.right), paddingBottom: 16 }}>
      <TaskList />
    </ScrollView>
    </View>
    </View>
  );
}
