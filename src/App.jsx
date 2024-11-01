import React from "react";
import Auth from "./components/Auth";
import ChatRoom from "./components/ChatRoom";
import { auth } from "./firebase.config";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      <Auth />
      {user && <ChatRoom />}
    </div>
  );
}

export default App;
