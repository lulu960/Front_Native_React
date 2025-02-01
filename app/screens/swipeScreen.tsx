import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, likeUser, dislikeUser } from "../../redux/slices/userSlice";
import SwipeCard from "../components/swipeCard";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { RootState } from "../../redux/store"; // Assurez-vous d'avoir un RootState défini

const SwipeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error, matchMessage } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers() as any); // TypeScript peut nécessiter `as any` si `dispatch` ne supporte pas Thunks
  }, [dispatch]);

  const handleSwipe = (direction: "left" | "right", userId: string) => {
    if (direction === "right") {
      dispatch(likeUser(userId) as any);
    } else if (direction === "left") {
      dispatch(dislikeUser(userId) as any);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const currentUser = users.length > 0 ? users[0] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe</Text>
      {matchMessage && <Text style={styles.matchMessage}>{matchMessage}</Text>}
      <View style={styles.cardContainer}>
        {currentUser ? (
          <SwipeCard user={currentUser} onSwipe={handleSwipe} />
        ) : (
          <Text style={styles.noUserText}>Aucun utilisateur à afficher.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  matchMessage: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  noUserText: {
    fontSize: 16,
    color: "#888",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default SwipeScreen;
