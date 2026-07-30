import { database } from "@/database";

const CATEGORIES = ["Fitness", "Productivity", "Mindfulness", "Learning", "Health", "Social"];
const ICONS = ["dumbbell", "book", "heart", "brain", "leaf", "star"];

/**
 * Generiert 100 Mock-Tasks und speichert sie performant in der WatermelonDB.
 */
export const seedMockTasks = async () => {
  const tasksCollection = database.get("tasks");

  console.log(tasksCollection);

  // Prüfen, ob schon Tasks da sind, damit sie nicht bei jedem App-Start doppelt reingeschrieben werden
  const existingCount = await tasksCollection.query().count;
  if (existingCount >= 100) {
    console.log("Mock tasks already seeded.");
    return;
  }

  console.log("Seeding 100 mock tasks...");

  await database.write(async () => {
    for (let i = 1; i <= 100; i++) {
      const categoryIndex = i % CATEGORIES.length;
      const category = CATEGORIES[categoryIndex];
      const lifepoints = ((i % 5) + 1) * 20; // Punktzahlen zwischen 20 und 100
      const estimatedTime = ((i % 4) + 1) * 15; // 15, 30, 45 oder 60 Minuten

      // Generiere 2 bis 4 realistische Substeps für den Task
      const subStepsCount = (i % 3) + 2;
      const subSteps = [];
      for (let s = 1; s <= subStepsCount; s++) {
        subSteps.push({
          title: `Schritt ${s} für ${category}-Aufgabe #${i}`,
          description: `Führe diesen Teilschritt sorgfältig aus, um Fortschritt zu erzielen.`
        });
      }

      await tasksCollection.create((task) => {
        // ID generiert WatermelonDB standardmäßig automatisch,
        // du kannst hier aber auch eine feste Test-ID vergeben (z.B. `task_${i}`)
        task.title = `${category} Challenge #${i}`;
        task.description = `Das ist eine automatisch generierte Test-Aufgabe im Bereich ${category}, um deine App-Performance und Offline-Fähigkeit zu testen.`;
        task.lifepoints = lifepoints;
        task.active = true;
        task.image = `https://picsum.photos/seed/task_${i}/300/200`;
        task.icon = ICONS[categoryIndex];
        task.estimatedTime = estimatedTime;

        // Arrays & Objekte werden dank deiner Sanitizer/JSON-Logik verarbeitet
        task.subSteps = subSteps;
        task.category = [category, "mock"];
        task.custom = { difficulty: i % 2 === 0 ? "medium" : "easy", version: 1 };

        task.createdAt = Date.now() - i * 3600000; // Zeitstempel leicht versetzt in der Vergangenheit
        task.updatedAt = Date.now();
      });
    }
  });

  console.log("Successfully created 100 mock tasks in WatermelonDB!");
};
