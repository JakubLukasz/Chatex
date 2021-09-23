import { useContext } from 'react';
import { FirestoreContext } from '../context/FirestoreContext';

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
