import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store"; // Assurez-vous que RootState est bien défini

const Navbar: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Tinder-like App</Text>
      <View style={styles.menu}>
        {token ? (
          <>
            <NavButton label="Swipe" onPress={() => navigation.navigate("swipe")} />
            <NavButton label="Messages" onPress={() => navigation.navigate("messages")} />
            <NavButton label="Matchs" onPress={() => navigation.navigate("matchs")} />
            <NavButton label="Mon Profil" onPress={() => navigation.navigate("profile")} />
            <NavButton label="Déconnexion" onPress={handleLogout} isLogout />
          </>
        ) : (
          <>
            <NavButton label="Connexion" onPress={() => navigation.navigate("login")} />
            <NavButton label="Inscription" onPress={() => navigation.navigate("register")} />
          </>
        )}
      </View>
    </View>
  );
};

// Composant réutilisable pour les boutons de navigation
const NavButton: React.FC<{ label: string; onPress: () => void; isLogout?: boolean }> = ({ label, onPress, isLogout }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, isLogout && styles.logoutButton]}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  menu: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
  },
  buttonText: {
    color: "#ff4d4d",
    fontWeight: "bold",
  },
});

export default Navbar;
