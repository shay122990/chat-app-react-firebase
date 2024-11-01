import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// Listener for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Authenticated user:", user);
  } else {
    console.error("User is not authenticated");
  }
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Sign-in successful:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out", error);
  }
};

export const sendMessage = async (message) => {
  if (!auth.currentUser) return;

  try {
    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
    });
    console.log("Message sent:", message);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const getMessages = (callback) => {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  return onSnapshot(q, callback);
};
