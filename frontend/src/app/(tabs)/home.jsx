import { ScrollView, Text, View } from "react-native";
import TaskList from "@/components/TaskList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingFilterButton from "@/components/FloatingFilterButton";
import { MyTheme } from "@/constants/Colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <>
    <FloatingFilterButton />
    <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: Math.max(16, insets.left + insets.right), backgroundColor: MyTheme.background }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, minHeight: 200, borderColor: MyTheme.secondary, marginBottom: 20, backgroundColor: MyTheme.primary }}><Text style={{ color: MyTheme.text }}>Das ist jetzt die Section?</Text></View>
    <View>
      <TaskList />
    </View>
    </ScrollView>
    </>
  );
}
