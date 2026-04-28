// src/hooks/useLeveling.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getXpThreshold } from "@/utils/xpHelpers";

export const useLeveling = () => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem("@lp_user_level");
        const savedXP = await AsyncStorage.getItem("@lp_user_xp");

        if (savedLevel !== null) setLevel(parseInt(savedLevel));
        if (savedXP !== null) setXp(parseInt(savedXP));
      } catch (e) {
        console.error("Fehler beim Laden der XP-Daten", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addExperience = async (amount) => {
    let newXP = xp + amount;
    let newLevel = level;

    while (newXP >= getXpThreshold(newLevel)) {
      newXP -= getXpThreshold(newLevel);
      newLevel++;
      alert(`Glückwunsch! Du hast Level ${newLevel} erreicht!`);
    }

    setXp(newXP);
    setLevel(newLevel);

    // Dauerhaft speichern
    try {
      await AsyncStorage.setItem("@lp_user_level", newLevel.toString());
      await AsyncStorage.setItem("@lp_user_xp", newXP.toString());
    } catch (e) {
      console.error("Fehler beim Speichern", e);
    }
  };

  return {
    level,
    xp,
    nextLevelAt: getXpThreshold(level),
    addExperience,
    loading
  };
};
