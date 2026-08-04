import { Q } from "@nozbe/watermelondb";

import { database } from "@/database";

export const createTaskSlice = (set, get) => ({
  activeTaskIds: [],
  completedTaskIds: [],
  tasks: [],
  user: null,

  // --- Base Fetchers
  fetchTasksState: async () => {
    try {
      const tasksCollection = database.get("tasks");
      const taskRecords = await tasksCollection.query().fetch();
      const tasks = taskRecords.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        lifepoints: task.lifepoints,
        communityId: task.communityId,
        icon: task.icon
      }));
      set({ tasks });
      return { success: true, tasks };
    } catch (error) {
      console.error("Fehler beim Abrufen der Tasks:", error);
      return { success: false, tasks: [], error };
    }
  },

  ensureOrCreateUser: async () => {
    try {
      const usersCollection = database.get("users");
      const users = await usersCollection.query().fetch();

      if (users.length > 0) {
        return users[0]; // User existiert bereits
      }

      // Wenn kein User da ist, erstellen wir einen Default-User
      let newUser;
      await database.write(async () => {
        newUser = await usersCollection.create((user) => {
          user.username = "Aaroen"; // oder ein generischer Name
          user.name = "Aaron";
          user.level = 1;
          user.lifepoints = 0;
          user.settings = {
            push_notifications: true,
            email_notifications: false,
            offer_notifications: false,
            isPrivate: false,
            appearance: "dark",
            language: "de",
            activityVisibility: true
          };
          user.communities = [];
          user.inventory = [];
        });
      });

      console.log("Standard-User erfolgreich in WatermelonDB erstellt!");
      return newUser;
    } catch (error) {
      console.error("Fehler beim Erstellen des Default-Users:", error);
      return null;
    }
  },

  fetchUserState: async () => {
    try {
      // 1. Sicherstellen, dass ein User da ist (erstellt ggf. einen, falls leer)
      const currentUser = await get().ensureOrCreateUser();
      if (!currentUser) return { success: false, reason: "user_creation_failed" };

      const userData = {
        id: currentUser.id,
        username: currentUser.username,
        name: currentUser.name,
        about: currentUser.about,
        email: currentUser.email,
        externalId: currentUser.externalId,
        level: currentUser.level,
        lifepoints: currentUser.lifepoints,
        inventory: currentUser.inventory,
        profilePicture: currentUser.profilePicture,
        communities: currentUser.communities,
        subscription: currentUser.subscription,
        settings: currentUser.settings,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt
      };

      set({ user: userData });
      return { success: true, user: userData };
    } catch (error) {
      console.error("Fehler beim Abrufen des Users:", error);
      return { success: false, reason: "database_error", user: null, error };
    }
  },

  // --- Direkte DB-Abfragen für Activities (Keine Sync-Probleme, da Single Source of Truth = DB) ---

  getActiveActivities: async () => {
    try {
      const records = await database.get("activities").query(Q.where("status", "active")).fetch();

      return records.map((activity) => ({
        id: activity.id,
        taskId: activity.taskId,
        title: activity.title,
        description: activity.description,
        category: activity.category || [],
        points: activity.lifepoints || 0,
        type: "active",
        status: "active",
        time: activity.createdAt ? new Date(activity.createdAt).toISOString() : new Date().toISOString(),
        icon: activity.icon || ""
      }));
    } catch (error) {
      console.error("Fehler beim Laden aktiver Activities:", error);
      return [];
    }
  },

  getDoneActivities: async () => {
    try {
      const records = await database
        .get("activities")
        .query(Q.where("status", "done"), Q.sortBy("created_at", Q.desc))
        .fetch();

      return records.map((activity) => ({
        id: activity.id,
        taskId: activity.taskId,
        title: activity.title,
        description: activity.description,
        category: activity.category || [],
        points: activity.lifepoints || 0,
        type: "gain",
        status: "done",
        time: activity.createdAt ? new Date(activity.createdAt).toISOString() : new Date().toISOString(),
        icon: activity.icon || ""
      }));
    } catch (error) {
      console.error("Fehler beim Laden erledigter Activities:", error);
      return [];
    }
  },

  getActivities: async (limit = 20, offset = 0) => {
    // 3. Used for impact Journal
    try {
      const records = await database
        .get("activities")
        .query(Q.sortBy("created_at", Q.desc), Q.take(limit), Q.skip(offset))
        .fetch();

      return records.map((activity) => ({
        id: activity.id,
        taskId: activity.taskId,
        title: activity.title,
        description: activity.description,
        category: activity.category || [],
        points: activity.lifepoints || 0,
        type: activity.status === "active" ? "active" : "gain",
        status: activity.status,
        time: activity.createdAt ? new Date(activity.createdAt).toISOString() : new Date().toISOString(),
        icon: activity.icon || ""
      }));
    } catch (error) {
      console.error("Fehler beim Laden der paginierten Activities:", error);
      return [];
    }
  },

  // --- Core Actions (Schreiben in DB + minimaler Zustand für UI-Trigger) ---

  trackTask: async (taskId) => {
    if (get().activeTaskIds.includes(taskId)) {
      return { success: false, reason: "already_active" };
    }

    try {
      const taskRecord = await database.get("tasks").find(taskId);
      if (!taskRecord) return { success: false, reason: "task_not_found" };

      const usersCollection = database.get("users");
      const users = await usersCollection.query().fetch();
      const currentUser = users[0];
      if (!currentUser) return { success: false, reason: "user_not_found" };

      await database.write(async () => {
        await database.get("activities").create((activity) => {
          activity.userId = currentUser.id;
          activity.title = taskRecord.title;
          activity.description = taskRecord.description;
          activity.category = taskRecord.category;
          activity.icon = taskRecord.icon;
          activity.lifepoints = taskRecord.lifepoints || 0;
          activity.communityId = taskRecord.communityId || null;
          activity.taskId = taskRecord.id;
          activity.status = "active";
          activity.visibility = currentUser.settings?.activityVisibility ? "public" : "private";
        });
      });

      // Nur die ID für UI-Guardrails im State cachen
      set((state) => ({
        activeTaskIds: [taskId, ...state.activeTaskIds]
      }));

      return { success: true };
    } catch (error) {
      console.error("Fehler beim Starten der Task:", error);
      return { success: false, reason: "database_error", error };
    }
  },

  completeTask: async (taskId) => {
    try {
      const taskRecord = await database.get("tasks").find(taskId);
      if (!taskRecord) return;

      const usersCollection = database.get("users");
      const users = await usersCollection.query().fetch();
      const userId = users[0]?.id || "default-user-id";
      const earnedPoints = taskRecord.lifepoints || 0;

      await database.write(async () => {
        // 1. Aktive Activity auf 'done' setzen oder neue erstellen (je nach Workflow)
        const activeRecords = await database
          .get("activities")
          .query(Q.where("task_id", taskId), Q.where("status", "active"))
          .fetch();

        if (activeRecords.length > 0) {
          await activeRecords[0].update((activity) => {
            activity.status = "done";
          });
        } else {
          await database.get("activities").create((activity) => {
            activity.userId = userId;
            activity.taskId = taskRecord.id;
            activity.status = "done";
            activity.lifepoints = earnedPoints;
            activity.communityId = taskRecord.communityId || null;
            activity.visibility = "public";
          });
        }
      });

      // Zustand bereinigen
      set((state) => ({
        activeTaskIds: state.activeTaskIds.filter((id) => String(id) !== String(taskId)),
        completedTaskIds: [...state.completedTaskIds, taskId]
      }));

      if (earnedPoints && typeof get().addLp === "function") {
        get().addLp(earnedPoints);
      }
    } catch (error) {
      console.error("Fehler beim Abschließen der Task:", error);
    }
  },

  cancelTask: async (taskId) => {
    try {
      const records = await database
        .get("activities")
        .query(Q.where("task_id", taskId), Q.where("status", "active"))
        .fetch();

      if (records[0]) {
        await database.write(async () => {
          await records[0].update((activity) => {
            activity.status = "cancelled";
          });
        });
      }

      set((state) => ({
        activeTaskIds: state.activeTaskIds.filter((id) => String(id) !== String(taskId))
      }));

      return { success: true };
    } catch (error) {
      console.error("Fehler beim Abbrechen der Task:", error);
      return { success: false, error };
    }
  }
});
