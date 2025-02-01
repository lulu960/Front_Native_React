import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface SwipeCardProps {
  user: { name: string; age: number; location: string; bio: string, _id: string };
  onSwipe: (direction: "left" | "right", userId: string) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe }) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: withTiming(Math.max(1 - Math.abs(translateX.value) / SCREEN_WIDTH, 0.5)),
  }));

  const handleGesture = (event: any) => {
    translateX.value = event.translationX;
  };

  const handleGestureEnd = (event: any) => {
    if (event.translationX > SWIPE_THRESHOLD) {
      translateX.value = withSpring(SCREEN_WIDTH, {}, () => runOnJS(onSwipe)("right", user._id));
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      translateX.value = withSpring(-SCREEN_WIDTH, {}, () => runOnJS(onSwipe)("left", user._id));
    } else {
      translateX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        handleGestureEnd(nativeEvent);
      }
    }}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.name}>
          {user.name}, {user.age}
        </Text>
        <Text style={styles.location}>{user.location}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  location: {
    fontSize: 18,
    color: "#777",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default SwipeCard;
