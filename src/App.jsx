import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import ChatRoom from "./components/ChatRoom";
import { auth } from "./firebase.config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <main>
      <h1>Real-Time Chat App</h1>
      <Auth />
      {user && <ChatRoom />}
    </main>
  );
}

export default App;
