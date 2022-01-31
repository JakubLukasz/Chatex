import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';
import { IAuthCtx } from '../types';

export const AuthContext = createContext({} as IAuthCtx);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((user: firebase.User): void => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
      setIsLoading(false);
    });
    return () => unsubsribe();
  }, []);

  const signIn = (email, password): Promise<firebase.auth.UserCredential> =>
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithEmailAndPassword(email, password));

  const signUp = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const logOut = (): Promise<void> => auth.signOut();

  const resetPassword = (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email);

  const ctx = {
    currentUser,
    signIn,
    signUp,
    logOut,
    resetPassword,
    isLoading,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
