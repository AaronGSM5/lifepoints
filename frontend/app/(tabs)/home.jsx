import { ScrollView, Text, View } from "react-native";
import TaskList from "../../src/components/TaskList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: Math.max(16, insets.left + insets.right) }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, minHeight: 200, borderColor: 'black', marginBottom: 20, }}><Text>Das ist jetzt die Section?</Text></View>
    <View>
      <TaskList />
    </View>
    </ScrollView>
  );
}
