import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { ApiKey } from "@env";

const firebaseConfig = {
  apiKey: ApiKey,
  authDomain: "chatapp-a13b2.firebaseapp.com",
  projectId: "chatapp-a13b2",
  storageBucket: "chatapp-a13b2.appspot.com",
  messagingSenderId: "791876059295",
  appId: "1:791876059295:web:1e8e177095a4cb91b262aa",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getFirestore();
const postCollection = collection(database, "posts");

export { auth, database, postCollection };

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

        //  // Sort the posts by dtStamp in descending order
        //  data.sort((a, b) => {
        //   const dateA = new Date(a.dtStamp);
        //   const dateB = new Date(b.dtStamp);
        //   return dateB - dateA;
        // });

        resolve(data);
      })
      .catch((error) => {
        console.log("Error:", error);
        reject(error);
      });
  });
}
