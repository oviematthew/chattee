import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (email != "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => Alert.alert("Registration", "User Registration Successful"))
        .catch((error) => Alert.alert("Signup error", error.message));
    } else {
      Alert.alert("Email / Password not provided");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Us</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="info@example.com"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        textContentType="password"
        placeholder="Enter Password"
        autoCorrect={false}
        secureTextEntry={true}
        autoFocus={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.navigationCont}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.navigationText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 50,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: 200,
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationCont: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  navigationText: {
    color: "orange",
    fontWeight: "bold",
  },
});
