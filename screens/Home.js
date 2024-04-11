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
    const unsubscribe = navigation.addListener("focus", () => {
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
      ),
    });
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
      <View style={styles.card}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.stamp}>{item.dtStamp}</Text>
        <Text>{item.shortContent}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Share your thoughts...</Text>
        </View>
        <FlatList data={posts} renderItem={renderPostItem} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "orange",
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
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    backgroundColor: "#fff",
    height: 70,
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "orange",
  },
  stamp: {
    color: "grey",
    fontStyle: "italic",
    fontSize: 10,
    paddingBottom : 5
  },
});
