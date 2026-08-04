import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import useStore from "@/store/useStore"; // Passe den Pfad zu deinem Store an

export default function DatabaseTestScreen() {
  const { fetchTasksState, fetchUserState, getActiveActivities, trackTask, completeTask, cancelTask, tasks, user } =
    useStore();

  const runDiagnostics = async () => {
    console.log("--- 🧪 STARTING DATABASE TESTS ---");

    // 1. Test Fetching Tasks
    const taskResult = await fetchTasksState();
    console.log("1. Tasks geladen:", taskResult);
    console.log("Aktuelle Tasks im Store:", tasks);

    if (tasks.length === 0) {
      console.warn("⚠️ Keine Tasks in der Collection gefunden! Bitte erstelle zuerst Tasks.");
      return;
    }

    // Nimm die ID der ersten vorhandenen Task zum Testen
    const testTaskId = tasks[0].id;
    console.log(`Verwende Test-Task ID: ${testTaskId}`);

    // 2. Test Fetching User
    const userResult = await fetchUserState();
    console.log("2. User geladen:", userResult);
    console.log("Aktueller User im Store:", user);

    // 3. Test Track Task (Aktivität starten)
    console.log("3. Versuche Task zu tracken (active)...");
    const trackResult = await trackTask(testTaskId);
    console.log("Track-Ergebnis:", trackResult);

    // 4. Test Get Active Activities
    const activeActs = await getActiveActivities();
    console.log("4. Aktive Activities aus DB:", activeActs);

    // 5. Test Complete Task (oder Cancel) nach kurzer Verzögerung zum Testen
    setTimeout(async () => {
      console.log("5. Schließe Task ab...");
      await completeTask(testTaskId);

      const activeActsAfter = await getActiveActivities();
      console.log("Aktive Activities nach Abschluss (sollte leer sein):", activeActsAfter);
      console.log("--- ✅ TESTS ABGESCHLOSSEN ---");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WatermelonDB & Store Tester</Text>
      <Text>Vorhandene Tasks im Store: {tasks?.length ?? "No Tasks"}</Text>
      <Text>Eingeloggter User: {user?.username || "Keiner"}</Text>

      <Button title="Tests in Konsole ausführen" onPress={runDiagnostics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 }
});
