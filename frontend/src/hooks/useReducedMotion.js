import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Liefert true, wenn der Nutzer in den Systemeinstellungen "Bewegung reduzieren" aktiviert hat.
 * Komponenten sollen dann auf dekorative Animationen, Autoplay und Loops verzichten.
 */
export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((enabled) => {
        if (isMounted) setReduceMotion(Boolean(enabled));
      })
      .catch(() => {});

    const subscription = AccessibilityInfo.addEventListener?.("reduceMotionChanged", (enabled) => {
      setReduceMotion(Boolean(enabled));
    });

    return () => {
      isMounted = false;
      subscription?.remove?.();
    };
  }, []);

  return reduceMotion;
}

export default useReducedMotion;
