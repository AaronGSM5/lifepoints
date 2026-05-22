import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  PanResponder,
  Pressable
} from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import { triggerHaptic } from "@/utils/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

const BaseBottomSheet = ({ isVisible, onClose, title, children }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [showModal, setShowModal] = useState(isVisible);

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150 || gestureState.vy > 1.5) {
          onClose();
        } else {
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
      triggerHaptic();
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
          useNativeDriver: true
        })
      ]).start();
    } else {
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
        setShowModal(false);
      });
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <Modal visible={showModal} transparent={true} animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.overlay}>
        <AnimatedPressable onPress={onClose} style={[styles.backdrop, { opacity: fadeAnim }]} />

        <Animated.View style={[styles.sheetContainer, { transform: [{ translateY: slideAnim }] }]}>
          <View {...panResponder.panHandlers} style={styles.panResponderArea}>
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>

            <View style={styles.header}>
              {title ? <AppText type="h2">{title}</AppText> : <View />}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={24} color={MyTheme.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const getStyles = (theme) =>
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
      backgroundColor: theme.background,
      borderTopLeftRadius: Spacing.borderRadius.lg,
      borderTopRightRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      height: SHEET_HEIGHT,
      width: "100%"
    },
    panResponderArea: {
      backgroundColor: "transparent"
    },
    dragHandleContainer: {
      alignItems: "center",
      paddingVertical: Spacing.sm
    },
    dragHandle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.muted,
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
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center"
    },
    content: {
      flex: 1
    }
  });

export default BaseBottomSheet;
