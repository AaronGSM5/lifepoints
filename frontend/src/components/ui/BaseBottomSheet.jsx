import React, { useEffect, useMemo, useState } from "react";
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
  TouchableOpacity,
  View
} from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

const BaseBottomSheet = ({ isVisible, onClose, title, children }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [showModal, setShowModal] = useState(isVisible);

  const [slideAnim] = useState(() => new Animated.Value(SCREEN_HEIGHT));
  const [fadeAnim] = useState(() => new Animated.Value(0));

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
            useNativeDriver: true
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
              useNativeDriver: true
            }).start();
          }
        }
      }),
    [onClose, slideAnim]
  );

  useEffect(() => {
    if (isVisible) {
      triggerHaptic();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowModal(true);
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
  }, [isVisible, fadeAnim, slideAnim]);

  return (
    <Modal visible={showModal} transparent={true} animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.overlay}
        keyboardVerticalOffset={Platform.OS === "android" ? 24 : 0}
      >
        <AnimatedPressable
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          style={[styles.backdrop, { opacity: fadeAnim }]}
        />

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

BaseBottomSheet.displayName = "BaseBottomSheet";

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
      maxHeight: SHEET_HEIGHT,
      width: "100%",
      flex: 1
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
    },
    content: {
      flex: 1
    }
  });

export default BaseBottomSheet;
