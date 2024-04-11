import React, { useState } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Firebase
import { addDoc } from "firebase/firestore";
import { postCollection } from "../config/firebase";

export default function NewPost() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [shortContent, setShortContent] = useState(""); // Corrected variable name
  const [content, setContent] = useState("");

  // Add new post
  const addNewPost = async () => {
    try {
      const docRef = await addDoc(postCollection, {
        title,
        shortContent,
        content,
      });

      setTitle("");
      setShortContent(""); // Updated to use the correct state variable
      setContent("");
      Alert.alert("Posts", "Post added successfully", [
        {
          text: "OK",
        },
      ]);

      // Navigate back to the home screen
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Add A New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Post Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Short Description"
        onChangeText={setShortContent}
        value={shortContent}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Post Content"
        onChangeText={setContent}
        value={content}
        multiline={true} // Enable multiline input
        numberOfLines={4} // Set the number of lines you want to show by default
      />

      <TouchableOpacity style={styles.buttonCont}>
        <Button
          style={styles.button}
          onPress={addNewPost}
          labelStyle={{ color: "#ffffff" }}
        >
          Create Post
        </Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonCont: {
    display: "flex",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "orange",
    width: "80%",
  },
  contentInput: {
    height: 200,
    textAlignVertical: "top",
  },
});
