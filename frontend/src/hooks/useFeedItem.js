import { useCallback, useRef, useState } from "react";
import { Animated, Platform, Share } from "react-native";

import { APP_EVENTS } from "@/constants/Events";
import useStore from "@/store/useStore";

const DOUBLE_PRESS_DELAY = 300;

export const useFeedItem = ({ initialLikes, username, description }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const lastTap = useRef(0);
  const trackEvent = useStore((state) => state.trackEvent);


  const [heartScale] = useState(() => new Animated.Value(0));
  const [heartOpacity] = useState(() => new Animated.Value(0));

  const handleLike = useCallback(() => {
    setIsLiked((prevLiked) => {
      const nextLiked = !prevLiked;
      setLikesCount((count) => nextLiked ? count + 1 : count - 1);

      if (nextLiked) {
        trackEvent(APP_EVENTS.LIKE_POST);
      }
      return nextLiked;
    });
  }, [trackEvent])

  const handleSave = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, [])

  const handleShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `Schau dir diesen Beitrag von ${username} an: "${description}" \n\nlifepoints://profile`,
        title: `Beitrag von ${username}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Geteilt mit:", result.activityType);
        } else {
          console.log("Erfolgreich geteilt");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Teilen abgebrochen");
      }
    } catch (error) {
      console.error("Fehler beim Teilen:", error.message);
    }
  }, [username, description])

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    let isDoubleTap = false
    if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
      isDoubleTap = true;
      setIsLiked((prevLiked) => {
        if (!prevLiked) {
          setLikesCount((count) => count + 1);
          trackEvent(APP_EVENTS.LIKE_POST);
        }
        return true;
      });

      Animated.sequence([
        Animated.parallel([
          Animated.spring(heartScale, { toValue: 1, friction: 3, useNativeDriver: Platform.OS !== "web" }),
          Animated.timing(heartOpacity, { toValue: 1, duration: 100, useNativeDriver: Platform.OS !== "web" })
        ]),
        Animated.delay(400),
        Animated.timing(heartOpacity, { toValue: 0, duration: 200, useNativeDriver: Platform.OS !== "web" }),
        Animated.timing(heartScale, { toValue: 0, duration: 0, useNativeDriver: Platform.OS !== "web" })
      ]).start();
    }
    lastTap.current = now
    return isDoubleTap
  }, [trackEvent, heartOpacity, heartScale])


  return {
    isLiked,
    isSaved,
    likesCount,
    heartScale,
    heartOpacity,
    handleLike,
    handleSave,
    handleShare,
    handleDoubleTap
  }
}