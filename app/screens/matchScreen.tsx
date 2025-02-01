import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../../redux/slices/userSlice";
import { RootState, AppDispatch } from "../../redux/store"; 

const Matchs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { matches, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#ff4757" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes Matchs</Text>
      {matches.length === 0 ? (
        <Text style={styles.noMatch}>Aucun match pour le moment.</Text>
      ) : (
        matches.map((match) => (
          <View key={match._id} style={styles.matchCard}>
            <Text style={styles.matchName}>
              {match.name}, {match.age}
            </Text>
            <Text style={styles.matchLocation}>{match.location}</Text>
            {match.bio && <Text style={styles.matchBio}>{match.bio}</Text>}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noMatch: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  matchCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  matchLocation: {
    fontSize: 14,
    color: "#666",
  },
  matchBio: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  loader: {
    marginTop: 50,
  },
});

export default Matchs;
