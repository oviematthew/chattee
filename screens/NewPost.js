import React, { useState, useEffect } from "react";
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
import moment from "moment/moment";
// import { useNavigation } from '@react-navigation/native';


// Firebase
import { addDoc } from "firebase/firestore";
import { postCollection } from "../config/firebase";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [shortContent, setshortContent] = useState("");
  const [content, setContent] = useState("");

  // Add new post
  const addNewPost = async () => {
  const dtStamp = moment().format('llll'); // Wed, Apr 10, 2024 10:21 PM

  
  //Add new transaction
  const AddNewTransaction = async () => {
    // const navigation = useNavigation(); // Access the navigation object
    try {
      const docRef = await addDoc(postCollection, {
        title,
        shortContent,
        content,
        dtStamp,
      });

      setTitle("");
      setshortContent("");
      setContent("");
      Alert.alert("Posts", "Posts Added Successfully", [
        {
          text: "OK",
          // onPress: () => navigation.navi gate('Home'), // Navigate back to the home screen
        },
      ]);
    } catch (error) {
      console.error("Error adding transaction:", error);
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
        onChangeText={setshortContent}
        value={shortContent}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Post Content"
        onChangeText={setContent}
        value={content}
      />

      <TouchableOpacity style={styles.buttonCont}>
        <Button
          style={styles.button}
          onPress={AddNewTransaction}
          labelStyle={{ color: "#ffffff" }}
        >
          Create Post
        </Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}}

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
