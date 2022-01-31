import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db, storage } from '../services/firebase';
import firebase from 'firebase';
import { generateID } from '../helpers/generateID';
import { getCurrentDateTime } from '../helpers/getCurrentDateTime';
import {
  IUserObject,
  IChat,
  IMessage,
  IUser,
  IFirestoreCtx,
  refType,
  cursorType,
} from '../types';

export const FirestoreContext = createContext<IFirestoreCtx>(null);

const FirestoreContextProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();

  const getRandomNumber = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const getAllUsernames = async (): Promise<string[]> => {
    const usersRef = db.collection('users');
    const data = await getDataFromCollection(usersRef);
    const usernames = data.map(({ username }) => username);
    return usernames;
  };

  const getRandomId = (number: number): string => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < number; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getRandomUsername = async (): Promise<string> => {
    const usernames = await getAllUsernames();
    const randomId = getRandomNumber(4);
    const randomUsername = `guest_${randomId}`;
    usernames.forEach(
      (username) => username === randomUsername && getRandomUsername()
    );
    return randomUsername;
  };

  const getUserData = async (): Promise<IUser> => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const doc = await userRef.get();
    return doc.data() as IUser;
  };

  const getDataFromCollection = async (ref: refType): Promise<any[]> => {
    const docs = await ref.get();
    const tmp = [];
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getUserChats = async (userObj: IUserObject): Promise<IChat[]> => {
    const ref = db
      .collection('chats')
      .where('users', 'array-contains', userObj);
    const data = await getDataFromCollection(ref);
    return data;
  };

  const deleteMessage = async (
    chatId: string,
    messageId: string
  ): Promise<void> => {
    const ref = db
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .doc(messageId);
    await ref.update({
      isDeleted: true,
      value: 'Message has been deleted',
    });
  };

  const updateLastMessage = async (
    message: IMessage,
    id: string
  ): Promise<void> => {
    const ref = db.collection('chats').doc(id);
    await ref.update({
      lastMessage: message,
    });
  };

  const findSameChat = (
    dbUserList: IUserObject[],
    appUserList: IUserObject[]
  ): boolean => {
    if (dbUserList.length !== appUserList.length) return false;
    let count = 0;
    dbUserList.forEach(
      ({ username }) =>
        appUserList.some((user) => user.username === username) && count++
    );
    return count === dbUserList.length;
  };

  const createUserData = async (
    displayName: string,
    email: string,
    uid: string,
    photoURL: string
  ): Promise<void> => {
    const { dateTime } = getCurrentDateTime();
    const currentUserRef = db.collection('users').doc(uid);
    await currentUserRef.set({
      username: displayName,
      email,
      uid,
      photoURL,
      createdDateTime: dateTime,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const updatePhotoInChats = async (username, chats, fileUrl) => {
    const ids = chats.map(({ id }) => id);
    for (const id of ids) {
      const chat = chats.find((chat) => chat.id === id);
      chat.users.forEach(
        (user) => user.username === username && (user.photoURL = fileUrl)
      );
      const ref = db.collection('chats').doc(id);
      await ref.update({
        users: chat.users,
      });
    }
  };

  const changePhoto = async (
    userData: IUserObject,
    file: File
  ): Promise<void> => {
    const userChats = await getUserChats({
      username: userData.username,
      photoURL: userData.photoURL,
    });
    const userFolderRef = storage.ref(userData.uid);
    const fileRef = userFolderRef.child('profilePicture');
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const userRef = db.collection('users').doc(userData.uid);
    await userRef.update({
      photoURL: fileUrl,
    });
    await updatePhotoInChats(userData.username, userChats, fileUrl);
  };

  const getAllIdsFromCollection = async (ref: refType): Promise<string[]> => {
    const docs = await ref.get();
    const ids = [];
    docs.forEach((doc) => ids.push(doc.id));
    return ids;
  };

  const generateRandomId = (array: any[]): string => {
    const randomId = generateID(20);
    array.forEach(({ id }) => id === randomId && generateRandomId(array));
    return randomId;
  };

  const generateChatId = async (): Promise<string> => {
    const ref = db.collection('chats');
    const chatIds = await getAllIdsFromCollection(ref);
    const chatId = generateRandomId(chatIds);
    return chatId;
  };

  // --------------------------------------------------------------------

  const createChat = async (usersList: IUserObject[]): Promise<void> => {
    const generatedChatId = await generateChatId();
    const { dateTime } = getCurrentDateTime();
    const ref = db.collection('chats').doc(generatedChatId);
    await ref.set({
      id: generatedChatId,
      createdDateTime: dateTime,
      users: usersList,
      lastMessage: null,
      messageCount: 0,
      isChatAvailable: true,
    });
  };

  const checkIsChatCreated = async (
    usersList: IUserObject[]
  ): Promise<boolean> => {
    const senderChats = await getUserChats(usersList[0]);
    let isChatCreated = false;
    senderChats.forEach(
      ({ users }) => findSameChat(users, usersList) && (isChatCreated = true)
    );
    return isChatCreated;
  };

  const getChatWithUsers = async (usersList: IUserObject[]): Promise<IChat> => {
    const senderChats = await getUserChats(usersList[0]);
    const tmp = senderChats.find(({ users }) => findSameChat(users, usersList));
    return tmp;
  };

  const getChatWithCheck = async (usersList: IUserObject[]): Promise<IChat> => {
    const isChatCreated = await checkIsChatCreated(usersList);
    if (!isChatCreated) await createChat(usersList);
    const chat = await getChatWithUsers(usersList);
    return chat;
  };

  const getChatIdWithCheck = async (
    usersList: IUserObject[]
  ): Promise<string> => {
    const chat = await getChatWithCheck(usersList);
    return chat.id;
  };

  const getAllChattingUsernames = async (
    userObj: IUserObject
  ): Promise<string[]> => {
    const userChats = await getUserChats(userObj);
    const userWithoutEmptyChats = userChats.filter(
      (chat) => chat.lastMessage !== null
    );
    const usernames = [];
    userWithoutEmptyChats.forEach((chat) =>
      chat.users.forEach(({ username }) => {
        if (username !== userObj.username && !usernames.includes(username))
          usernames.push(username);
      })
    );
    return usernames;
  };

  const getCursor = async (ref: refType): Promise<cursorType> => {
    const resp = await ref.get();
    return resp.docs[resp.docs.length - 1];
  };

  const sendMessage = async (
    message: string,
    usersList: IUserObject[]
  ): Promise<void> => {
    const chat = await getChatWithUsers(usersList);
    const messageID = generateID(20);
    const { dateTime, time } = getCurrentDateTime();
    const chatRef = db.collection('chats').doc(chat.id);
    const messageObj = {
      id: messageID,
      value: message,
      sendBy: usersList[0].username,
      sendDateTime: dateTime,
      sendTime: time,
      isDeleted: false,
    };
    await chatRef.collection('messages').doc(messageID).set(messageObj);
    await chatRef.update({
      messageCount: firebase.firestore.FieldValue.increment(1),
    });
    await updateLastMessage(messageObj, chat.id);
  };

  const searchUsers = async (
    username: string,
    phrase: string
  ): Promise<IUser[]> => {
    const ref = db
      .collection('users')
      .where('username', '>=', phrase.toLocaleLowerCase())
      .where('username', '<=', `${phrase.toLocaleLowerCase()}z`)
      .orderBy('username', 'desc');
    const data = await getDataFromCollection(ref);
    const users = data.filter((user) => user.username !== username);
    return users;
  };

  const searchChats = async (
    userData: IUserObject,
    phrase: string
  ): Promise<IChat[]> => {
    const ref = db
      .collection('chats')
      .where('users', 'array-contains', userData)
      .orderBy('lastMessage.sendDateTime', 'desc');
    const chats = await getDataFromCollection(ref);
    const dataChats = chats.map((chat) => ({
      ...chat,
      users: chat.users.filter((user) => user.username !== userData.username),
    }));
    const searchedChats = dataChats.filter(({ users }) =>
      users.some(({ username }) => {
        return username.toLowerCase().includes(phrase.toLowerCase());
      })
    );
    return searchedChats;
  };

  const ctx = {
    getChatWithCheck,
    searchUsers,
    searchChats,
    getUserData,
    sendMessage,
    deleteMessage,
    getAllChattingUsernames,
    getUserChats,
    getDataFromCollection,
    getCursor,
    changePhoto,
    createUserData,
    getRandomUsername,
    getRandomId,
    getAllUsernames,
    getChatIdWithCheck,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContextProvider;
