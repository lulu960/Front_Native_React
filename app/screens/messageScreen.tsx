import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage, receiveMessage } from "../../redux/slices/messageSlice";
import { getMatches } from "../../redux/slices/userSlice";
import { io } from "socket.io-client";
import { RootState } from "../../redux/store"; 

let socket: any;

const Messages = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { messages, loading, error } = useSelector((state: RootState) => state.messages);
  const { matches } = useSelector((state: RootState) => state.user);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    dispatch(getMatches());

    // Connexion au serveur WebSocket
    socket = io("http://127.0.0.1:5000");

    // Signaler au backend que l'utilisateur est connecté
    socket.emit("userConnected", userId);

    // Écouter les nouveaux messages
    socket.on("receiveMessage", (message: any) => {
      dispatch(receiveMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, userId]);

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    dispatch(fetchMessages(user._id));
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !selectedUser) return;

    const messageData = {
      sender: userId,
      receiver: selectedUser._id,
      message: messageInput,
    };

    socket.emit("sendMessage", messageData);
    dispatch(sendMessage({ receiver: selectedUser._id, message: messageInput }));
    setMessageInput("");
  };

  const messagesWithSelected = selectedUser ? messages[selectedUser._id] || [] : [];

  return (
    <View style={styles.container}>
      <View style={styles.matchesContainer}>
        <Text style={styles.header}>Matchs</Text>
        {matches.length === 0 ? (
          <Text style={styles.noMatch}>Aucun match pour le moment.</Text>
        ) : (
          <FlatList
            data={matches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.matchItem,
                  selectedUser && selectedUser._id === item._id && styles.activeMatch,
                ]}
                onPress={() => handleSelectUser(item)}
              >
                <Text style={styles.matchName}>{item.name}</Text>
                <Text style={styles.matchBio}>{item.bio}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={styles.chatContainer}>
        {selectedUser ? (
          <>
            <Text style={styles.chatHeader}>Conversation avec {selectedUser.name}</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#ff4757" />
            ) : (
              <FlatList
                data={messagesWithSelected}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={[styles.message, item.sender === userId ? styles.sent : styles.received]}>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </View>
                )}
              />
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={messageInput}
                onChangeText={setMessageInput}
                placeholder="Écrire un message..."
              />
              <Button title="Envoyer" onPress={handleSendMessage} />
            </View>
          </>
        ) : (
          <Text style={styles.noConversation}>Sélectionnez un match pour commencer la conversation.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  matchesContainer: {
    width: "35%",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noMatch: {
    textAlign: "center",
    color: "#888",
  },
  matchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  activeMatch: {
    backgroundColor: "#ff4757",
    borderRadius: 5,
  },
  matchName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  matchBio: {
    fontSize: 12,
    color: "#666",
  },
  chatContainer: {
    width: "65%",
    padding: 10,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noConversation: {
    textAlign: "center",
    color: "#888",
    marginTop: 50,
  },
  message: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    maxWidth: "80%",
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#ff4757",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default Messages;
