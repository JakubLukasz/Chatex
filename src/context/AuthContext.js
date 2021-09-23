import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth, fbProvider, googleProvider } from '../services/firebase';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
    return () => unsubsribe();
  }, []);

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const verifyEmail = () => {
    return auth.currentUser.sendEmailVerification();
  };

  const deleteUser = () => {
    return auth.currentUser.delete();
  };

  const fbAuth = () => {
    return auth.signInWithPopup(fbProvider);
  };

  const googleAuth = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const ctx = {
    currentUser,
    signIn,
    signUp,
    logOut,
    resetPassword,
    fbAuth,
    googleAuth,
    verifyEmail,
    deleteUser,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
