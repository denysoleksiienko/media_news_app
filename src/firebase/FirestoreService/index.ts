import { doc, getDoc } from 'firebase/firestore';

import { firestore } from '../modular-firestore-setup';

class FirestoreService {
  static getById = async ({ path, docId }: { path: string; docId: string }) => {
    try {
      const docRef = doc(firestore, path, docId);
      const document = await getDoc(docRef);

      if (document.data()) {
        return { ...document.data(), documentId: document.id };
      }
    } catch (err) {
      throw new Error(`Document at ${path}/${docId} doesn't exist`);
    }
  };
}

export default FirestoreService;
