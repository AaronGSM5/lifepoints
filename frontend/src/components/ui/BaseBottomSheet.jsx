import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  View
} from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

import CloseButton from "./CloseButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BaseBottomSheet = memo(({ isVisible, onClose, onAnimationComplete, title, children, containerStyle }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [showModal, setShowModal] = useState(isVisible);

  const [slideAnim] = useState(() => new Animated.Value(Dimensions.get("window").height));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    onClose();
  }, [onClose]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return gestureState.dy > 5 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            slideAnim.setValue(gestureState.dy);
          }
        },
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderTerminate: () => {
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 65,
            friction: 11,
            useNativeDriver: Platform.OS !== "web"
          }).start();
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 150 || gestureState.vy > 1.5) {
            Keyboard.dismiss();
            onClose();
          } else {
            Animated.spring(slideAnim, {
              toValue: 0,
              tension: 65,
              friction: 11,
              useNativeDriver: Platform.OS !== "web"
            }).start();
          }
        }
      }),
    [onClose, slideAnim]
  );

  useEffect(() => {
    const currentScreenHeight = Dimensions.get("window").height;

    if (isVisible) {
      triggerHaptic();

      setShowModal(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: Platform.OS !== "web"
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: Platform.OS !== "web"
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: Platform.OS !== "web"
        }),
        Animated.timing(slideAnim, {
          toValue: currentScreenHeight,
          duration: 250,
          useNativeDriver: Platform.OS !== "web"
        })
      ]).start(() => {
        setShowModal(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [isVisible, fadeAnim, slideAnim, onAnimationComplete]);

  return (
    <Modal visible={showModal} transparent={true} animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.overlay}
        keyboardVerticalOffset={Platform.OS === "android" ? 24 : 0}
      >
        <AnimatedPressable onPress={handleClose} style={[styles.backdrop, { opacity: fadeAnim }]} />

        <Animated.View style={[styles.sheetContainer, containerStyle, { transform: [{ translateY: slideAnim }] }]}>
          <View {...panResponder.panHandlers} style={styles.panResponderArea}>
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>

            <View style={styles.header}>
              {title ? <AppText type="h2">{title}</AppText> : <View />}
              <CloseButton withBackground onPress={onClose} />
            </View>
          </View>
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

BaseBottomSheet.displayName = "BaseBottomSheet";

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end"
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.backdrop
    },
    sheetContainer: {
      backgroundColor: theme.background,
      borderTopLeftRadius: Spacing.borderRadius.lg,
      borderTopRightRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      maxHeight: "80%",
      width: "100%",
      paddingBottom: Platform.OS === "ios" ? 20 : 0,
      boxShadow: "0px -6px 10px rgba(0, 0, 0, 0.6)"
    },
    panResponderArea: {
      backgroundColor: theme.background,
      borderTopLeftRadius: Spacing.borderRadius.lg,
      borderTopRightRadius: Spacing.borderRadius.lg
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
    }
  });

export default BaseBottomSheet;
