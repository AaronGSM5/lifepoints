import { AccessibilityInfo } from "react-native";

/**
 * Lässt den Screenreader (VoiceOver/TalkBack) eine Nachricht vorlesen,
 * z.B. bei LP-Gutschriften, Level-ups oder freigeschalteten Trophäen.
 */
export function announce(message) {
  if (!message) return;
  try {
    AccessibilityInfo.announceForAccessibility?.(String(message));
  } catch {
    // Ansagen sind optional und dürfen die App nie zum Absturz bringen.
  }
}
