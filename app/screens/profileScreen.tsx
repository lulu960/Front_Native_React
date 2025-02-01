import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import API from "../../api/api";
import { RootState } from "../../redux/store"; 

const Profile = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer le profil de l'utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await API.get("/auth/profile");
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          age: response.data.age?.toString() || "",
          gender: response.data.gender || "",
          location: response.data.location || "",
          bio: response.data.bio || "",
        });
      } catch (err: any) {
        setError(err.response?.data?.msg || "Erreur lors de la récupération du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const onChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await API.put("/auth/profile", formData);
      setProfile(response.data);
      Alert.alert("Succès", "Profil mis à jour avec succès !");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#ff4757" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!profile) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nom" value={formData.name} onChangeText={(text) => onChange("name", text)} />
        <TextInput style={styles.input} placeholder="Email" value={formData.email} keyboardType="email-address" onChangeText={(text) => onChange("email", text)} />
        <TextInput style={styles.input} placeholder="Âge" value={formData.age} keyboardType="numeric" onChangeText={(text) => onChange("age", text)} />
        <Picker selectedValue={formData.gender} onValueChange={(value) => onChange("gender", value)} style={styles.picker}>
          <Picker.Item label="Sélectionner le genre" value="" />
          <Picker.Item label="Homme" value="male" />
          <Picker.Item label="Femme" value="female" />
          <Picker.Item label="Autre" value="other" />
        </Picker>
        <TextInput style={styles.input} placeholder="Localisation" value={formData.location} onChangeText={(text) => onChange("location", text)} />
        <TextInput style={styles.textarea} placeholder="Bio" value={formData.bio} multiline onChangeText={(text) => onChange("bio", text)} />
        <Button title={loading ? "Mise à jour..." : "Mettre à jour le profil"} onPress={onSubmit} disabled={loading} />
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.subtitle}>Détails du Profil</Text>
        <Text><Text style={styles.bold}>Nom:</Text> {profile.name}</Text>
        <Text><Text style={styles.bold}>Email:</Text> {profile.email}</Text>
        <Text><Text style={styles.bold}>Âge:</Text> {profile.age}</Text>
        <Text><Text style={styles.bold}>Genre:</Text> {profile.gender}</Text>
        <Text><Text style={styles.bold}>Localisation:</Text> {profile.location}</Text>
        <Text><Text style={styles.bold}>Bio:</Text> {profile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  textarea: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  profileDetails: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
});

export default Profile;
