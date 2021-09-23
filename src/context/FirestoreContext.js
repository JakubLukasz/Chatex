import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { generateID } from '../helpers/generateID';
import { getCurrentDateTime } from '../helpers/getCurrentDateTime';

export const FirestoreContext = createContext({});

const FirestoreContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const createUserData = (username, { email, uid, photoURL }) => {
    const { dateTime } = getCurrentDateTime();
    const currentUserRef = db.collection('users').doc(uid);
    currentUserRef.set({
      username,
      email,
      uid,
      photoURL,
      createdDateTime: dateTime,
    });
  };

  const checkIsProviderDataExists = async ({
    displayName,
    email,
    uid,
    photoURL,
  }) => {
    const currentUserRef = db.collection('users').doc(uid);
    const userDoc = await currentUserRef.get();
    if (userDoc.exists) return;
    else createUserData(displayName, { email, uid, photoURL });
  };

  const getUsers = async () => {
    const tmp = [];
    const usersRef = db.collection('users');
    const docs = await usersRef.get();
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getUserData = async () => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const doc = await userRef.get();
    return doc.data();
  };

  const deleteConversation = (partnerUid) => {
    const chatRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats')
      .doc(partnerUid);
    chatRef.delete();
  };

  // const createChat = (partnerData, userData) => {
  //   const chatPartnerRef = db
  //     .collection('users')
  //     .doc(currentUser.uid)
  //     .collection('chats')
  //     .doc(partnerData.uid);
  //   const currentUserRef = db
  //     .collection('users')
  //     .doc(partnerData.uid)
  //     .collection('chats')
  //     .doc(currentUser.uid);
  //   const chatID = generateID(20);
  //   chatPartnerRef.set({
  //     id: chatID,
  //     messages: [],
  //     username: partnerData.username,
  //     photoURL: partnerData.photoURL,
  //     uid: partnerData.uid,
  //   });
  //   currentUserRef.set({
  //     id: chatID,
  //     messages: [],
  //     username: userData.username,
  //     photoURL: userData.photoURL,
  //     uid: userData.uid,
  //   });
  // };

  const createChat = (firstUser, secondUser) => {
    const chatRef = db
      .collection('users')
      .doc(firstUser.uid)
      .collection('chats')
      .doc(secondUser.uid);
    const chatID = generateID(20);
    chatRef.set({
      id: chatID,
      messages: [],
      username: secondUser.username,
      photoURL: secondUser.photoURL,
      uid: secondUser.uid,
    });
  };

  const createMessage = async (ref, message, send) => {
    const doc = await ref.get();
    const messageID = generateID(20);
    const { dateTime, time } = getCurrentDateTime();
    const { messages } = doc.data();
    messages.unshift({
      messageID,
      message,
      send,
      sendDateTime: dateTime,
      sendTime: time,
    });
    ref.update({ messages });
  };

  const addMessage = async (message, userUid, partnerUid) => {
    const currentUserRef = db
      .collection('users')
      .doc(userUid)
      .collection('chats')
      .doc(partnerUid);

    const chatPartnerRef = db
      .collection('users')
      .doc(partnerUid)
      .collection('chats')
      .doc(userUid);

    createMessage(chatPartnerRef, message, false);
    createMessage(currentUserRef, message, true);
  };

  const checkIsChatCreated = async (uid, uid2) => {
    const chatRef = db
      .collection('users')
      .doc(uid)
      .collection('chats')
      .doc(uid2);
    const doc = await chatRef.get();
    return doc.exists;
  };

  const configureChats = async (userData, partnerData) => {
    const isUserChatCreated = await checkIsChatCreated(
      userData.uid,
      partnerData.uid
    ); // twoj
    const isPartnerChatCreated = await checkIsChatCreated(
      partnerData.uid,
      userData.uid
    ); // partner
    if (!isUserChatCreated) createChat(userData, partnerData); // twoj
    if (!isPartnerChatCreated) createChat(partnerData, userData); // partnera
  };

  const sendMessage = async (message, partnerData, userData) => {
    await configureChats(userData, partnerData);
    addMessage(message, userData.uid, partnerData.uid);
  };

  const getAllUsernames = async () => {
    const usersRef = db.collection('users');
    const users = await usersRef.get();
    const usernames = [];
    users.forEach((userDoc) => {
      const { username } = userDoc.data();
      usernames.push(username.toLowerCase());
    });
    return usernames;
  };

  const getChatUsernames = async () => {
    const chatsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats');
    const tmp = [];
    const chats = await chatsRef.get();
    chats.forEach((chat) => {
      const { username } = chat.data();
      tmp.push(username);
    });
    return tmp;
  };

  const changePhoto = async (url) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    userRef.update({
      photoURL: url,
    });
  };

  const getChatUids = async () => {
    const chatRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats');
    const docs = await chatRef.get();
    const tmp = [];
    docs.forEach((doc) => {
      const { uid } = doc.data();
      tmp.push(uid);
    });
    return tmp;
  };

  const getUsersUid = async () => {
    const users = await getUsers();
    return users.map(({ uid }) => uid);
  };

  const deleteUser = async (uid) => {
    const userRef = db
      .collection('users')
      .doc(uid)
      .collection('chats')
      .doc(currentUser.uid);
    userRef.delete();
  };

  const deleteOwnAccount = async (chatUids) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    chatUids.forEach((uid) => {
      userRef.collection('chats').doc(uid).delete();
    });
    userRef.delete();
  };

  const clearUser = async () => {
    const chatUids = await getChatUids();
    const userUids = await getUsersUid();
    userUids.forEach((uid) => {
      if (chatUids.includes(uid)) deleteUser(uid);
    });
    deleteOwnAccount(chatUids);
  };

  const ctx = {
    createUserData,
    checkIsProviderDataExists,
    getUsers,
    getUserData,
    createChat,
    sendMessage,
    deleteConversation,
    getAllUsernames,
    getChatUsernames,
    changePhoto,
    clearUser,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};

FirestoreContextProvider.propTypes = {
  children: PropTypes.node,
};

export default FirestoreContextProvider;
