import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice"; // Utiliser Redux pour l'inscription
import { NavigationProp } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';


interface RegisterScreenProps {
  navigation: NavigationProp<any>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state: any) => state.auth);

  // Rediriger l'utilisateur s'il est déjà connecté
  if (token) {
    navigation.navigate("swipe");
  }

  const handleRegister = async () => {
    if (!name || !email || !password || !age || !gender || !location) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    const formData = { name, email, password, age, gender, location };

    dispatch(register(formData)).then((res: any) => {
      if (res.type === "auth/register/fulfilled") {
        Alert.alert("Succès", "Inscription réussie !");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erreur", "Échec de l'inscription.");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Âge"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

    <Picker
      selectedValue={gender}
      onValueChange={(itemValue) => setGender(itemValue)}
      style={styles.input}
    >
      <Picker.Item label="Sélectionner le genre" value="" />
      <Picker.Item label="Homme" value="male" />
      <Picker.Item label="Femme" value="female" />
      <Picker.Item label="Autre" value="other" />
    </Picker>

      <TextInput
        style={styles.input}
        placeholder="Localisation"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Inscription..." : "S'inscrire"}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ea",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#6200ea",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  linkText: {
    color: "#6200ea",
    textDecorationLine: "underline",
    marginTop: 15,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
