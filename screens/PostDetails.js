import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function PostDetails({ route }) {
  const { post } = route.params;
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Posted By Anonymous</Text>
            <Text style={styles.stamp}>{post.dtStamp}</Text>
            <Text style={styles.text}>{post.content}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "orange",
  },

  text: {
    marginTop: 20,
    color: "black",
  },
  author: {
    marginTop: 10,
    color: "grey",
    fontStyle: "italic",
  },
  stamp: {
    marginTop: 10,
    color: "grey",
    fontStyle: "italic",
    fontSize: 10
  },
});
