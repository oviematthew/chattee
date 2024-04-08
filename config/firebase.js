// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwPckR7VJdFGyMri9PCLuLJ6bjQS6ZnY8",
  authDomain: "chatapp-a13b2.firebaseapp.com",
  projectId: "chatapp-a13b2",
  storageBucket: "chatapp-a13b2.appspot.com",
  messagingSenderId: "791876059295",
  appId: "1:791876059295:web:1e8e177095a4cb91b262aa",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export const postCollection = collection(database, "posts");

//load posts database function
export function load() {
  const data = [];

  return new Promise((resolve, reject) => {
    getDocs(postCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const posts = {
            ...doc.data(),
            id: doc.id,
          };

          data.push(posts);
        });

        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error);
      });
  });
}
