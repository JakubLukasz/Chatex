import firebase from 'firebase/app';

export interface IMessage {
  value: string;
  id: string;
  sendBy: string;
  sendDateTime: string;
  sendTime: string;
  isDeleted: boolean;
}

export interface IUser {
  username: string;
  photoURL: string;
  uid: string;
}

export interface ICurrentChat {
  id: string;
  username: string;
  photoURL: string;
  isChatAvailable: boolean;
}

export interface IUserObject {
  username: string;
  photoURL: string | null;
  uid?: string;
  createdDateTime?: string;
}

export interface IChat {
  id: string;
  users: IUserObject[];
  messageCount: number;
  lastMessage: IMessage;
  isChatAvailable: boolean;
}

export type cursorType =
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null;

export interface IUser {
  createdDateTime: string;
  email: string;
  photoURL: string | null;
  uid: string;
  username: string;
}

export type refType =
  | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  | firebase.firestore.Query<firebase.firestore.DocumentData>;

export interface IFirestoreCtx {
  createUserData: (
    displayName: string,
    email: string,
    uid: string,
    photoURL: string
  ) => Promise<void>;
  getChatWithCheck: (usersList: IUserObject[]) => Promise<IChat>;
  searchUsers: (username: string, phrase: string) => Promise<IUser[]>;
  searchChats: (userData: IUserObject, phrase: string) => Promise<IChat[]>;
  getUserData: () => Promise<IUser>;
  sendMessage: (message: string, usersList: IUserObject[]) => Promise<void>;
  deleteMessage: (chatId: string, messageId: string) => Promise<void>;
  getUserChats: (userObj: IUserObject) => Promise<IChat[]>;
  changePhoto: (userData: IUserObject, file: File) => Promise<void>;
  getRandomUsername: () => Promise<string>;
  getRandomId: (number: number) => string;
  getAllUsernames: () => Promise<string[]>;
  getChatIdWithCheck: (usersList: IUserObject[]) => Promise<string>;
  getCursor: (ref: refType) => Promise<cursorType>;
  getDataFromCollection: (ref: refType) => Promise<any[]>;
  getAllChattingUsernames: (userObj: IUserObject) => Promise<string[]>;
}

export interface IAuthCtx {
  currentUser: firebase.User | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
