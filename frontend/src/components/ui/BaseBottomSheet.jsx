import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Animated, // 🔥 NEU: Für unsere Custom-Animationen
  Dimensions, // 🔥 NEU: Um die Bildschirmhöhe zu kennen
  PanResponder
} from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BaseBottomSheet = ({ isVisible, onClose, title, children }) => {
  const styles = getStyles();
  // Wir entkoppeln den isVisible-State, damit wir die Schließ-Animation abspielen können,
  // BEVOR das Modal wirklich aus dem DOM verschwindet.
  const [showModal, setShowModal] = useState(isVisible);

  // Unsere zwei Animations-Werte
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // Startet außerhalb des Bildschirms (unten)
  const fadeAnim = useRef(new Animated.Value(0)).current; // Startet unsichtbar

  const panResponder = useRef(
    PanResponder.create({
      // 1. Soll die Geste gestartet werden? (Nur wenn nach UNTEN gewischt wird)
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Wir aktivieren den Responder nur, wenn der User mindestens 10px nach unten wischt.
        // Das verhindert, dass versehentliches Tippen als Swipe erkannt wird.
        return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },

      // 2. Was passiert WÄHREND der Finger sich bewegt?
      onPanResponderMove: (_, gestureState) => {
        // Das Sheet folgt dem Finger! (Wir lassen keine negativen Werte zu,
        // damit man das Sheet nicht über den oberen Rand hinausziehen kann)
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },

      // 3. Was passiert, wenn der Finger LOSLÄSST?
      onPanResponderRelease: (_, gestureState) => {
        // War der Wisch schnell genug (vy) ODER weit genug nach unten (dy)?
        if (gestureState.dy > 150 || gestureState.vy > 1.5) {
          // Ja! -> Schließen
          onClose();
        } else {
          // Nein! -> Brechen wir ab und federn das Sheet zurück zur Ausgangsposition (0)
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 65,
            friction: 11,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      // Beim Öffnen: Faden und Sliden gleichzeitig
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true // Macht die Animation extrem flüssig (60fps)
        })
      ]).start();
    } else {
      // Beim Schließen: Rückwärts abspielen
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(() => {
        // Erst wenn die Animation fertig ist, verstecken wir das Modal komplett
        setShowModal(false);
      });
    }
  }, [isVisible]);

  // Wenn das Modal komplett zu ist, rendern wir nichts (spart Performance)
  if (!showModal) return null;

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="none" // 🔥 WICHTIG: Wir übernehmen die Animation jetzt selbst!
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.overlay}>
        {/* 1. Der Hintergrund: FADET ein */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* 2. Das Sheet: SLIDET von unten rein */}
        <Animated.View
          style={[
            styles.sheetContainer,
            { transform: [{ translateY: slideAnim }] } // Hier greift unsere Spring-Animation
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.header}>
            {title ? <AppText type="h2">{title}</AppText> : <View />}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={MyTheme.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const getStyles = () =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end"
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    sheetContainer: {
      backgroundColor: MyTheme.background,
      borderTopLeftRadius: Spacing.borderRadius.lg,
      borderTopRightRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      height: "80%",
      width: "100%"
    },
    dragHandleContainer: {
      alignItems: "center",
      paddingVertical: Spacing.sm
    },
    dragHandle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: MyTheme.muted,
      opacity: 0.5
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.sm
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: MyTheme.primary,
      alignItems: "center",
      justifyContent: "center"
    },
    content: {
      flex: 1
    }
  });

export default BaseBottomSheet;
