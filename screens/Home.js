import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { auth, load } from "../config/firebase";

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    setLoading(true);
    load()
      .then((posts) => {
        // Update the state with the loaded tasks
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
   
    loadPosts();
  }, []);

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      
      loadPosts();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialCommunityIcons
          name="location-exit"
          size={24}
          color="orange"
          style={{ marginLeft: 15 }}
          onPress={handleSignOut}
        />
      ),
      headerRight: () => (
        <MaterialCommunityIcons
          name="card-plus"
          size={24}
          color="orange"
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("New Post")}
        />
      )})
  }, [navigation]);

  const handleSignOut = () => {
    signOut(auth) // Sign out the user
      .then(() => {
        Alert.alert("Signout", "Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const handlePostPress = (post) => {
    navigation.navigate("Post Details", { post });
  };
  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.shortContent}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Posts</Text>
        </View>
        <FlatList data={posts} renderItem={renderPostItem} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={styles.chatButton}
        >
          <Entypo name="chat" size={24} color="orange" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: "#fff",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
  header: {
    backgroundColor: "#fff",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  headerTitle: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  page: {
    backgroundColor: "#fff",
  },
  postContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "orange",
  },
});
