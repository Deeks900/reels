import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  console.log("I'm the second one");
  // This Component will be re-rendered whenever user or loading state will be changed
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  // This will run only when this component will be mounted that is only once.
  useEffect(() => {
    console.log("I'm in");
    //Attaching the onAuthStateChanged Listener on auth.This event has to be attached only once that's why has to be done inside useEffect
    const unsub = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });
    //This will detach this onAuthStateChanged event Listener when the component will Unmount.This prevents memory leak
    return () => {
      console.log("I'm out");
      unsub();
    };
  }, []);

  //This is the Global Store
  const store = {
    user,
    signup,
    login,
    logout,
  };

  return (
    <>
      {console.log("Hello! I'm the third one")}
      <AuthContext.Provider value={store}>
        {/* Loading here helps that don't made this global accessible to children components until I attach the onAuthStateChangedEvent Listener */}
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
}
