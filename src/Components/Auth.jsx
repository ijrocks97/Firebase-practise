import React, { useState } from "react";
import { auth, googleProvider } from "../Config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter mail"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Auth;
