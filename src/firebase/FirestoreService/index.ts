import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
  orderBy as queryOrderBy,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { FirestoreServiceTypes, QueryGetAllTypes } from '@/types/firestore';

import { firestore } from '../modular-firestore-setup';

class FirestoreService {
  static getById = async ({
    path,
    docId,
  }: FirestoreServiceTypes): Promise<any> => {
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

  static querySnapResult = (
    querySnapshot: QuerySnapshot,
    queryLimit: number
  ) => {
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const hasMore = querySnapshot.docs.length >= queryLimit;

    let results: any = [];

    querySnapshot.forEach((documentSnapshot) => {
      results = [
        ...results,
        {
          ...documentSnapshot.data(),
          documentId: documentSnapshot.id,
          _createdAt: documentSnapshot.data().createdAt,
        },
      ];
    });

    return {
      hasMore,
      lastVisible,
      pageCount: querySnapshot.size,
      results,
    };
  };

  static getAll = async ({
    path,
    lastVisible = false,
    orderByField = 'createdAt',
    sortDir = 'desc',
    queryLimit = 25,
    whereFilter = { key: '', opString: '==', value: '' },
    multipleWhereFilters = [],
  }: QueryGetAllTypes): Promise<any> => {
    try {
      const collectionRef = collection(firestore, path);

      const queryConstraints = [];

      if (queryLimit) {
        queryConstraints.push(limit(queryLimit));
      }

      if (whereFilter.key) {
        queryConstraints.push(
          where(whereFilter.key, whereFilter.opString, whereFilter.value)
        );
      }

      if (multipleWhereFilters.length) {
        queryConstraints.push(
          ...multipleWhereFilters.map(({ key, opString, value }) =>
            where(key, opString, value)
          )
        );
      }

      if (sortDir && (!whereFilter.key || orderByField === whereFilter.key)) {
        queryConstraints.push(queryOrderBy(orderByField, sortDir));
      }

      if (lastVisible) {
        queryConstraints.push(startAfter(lastVisible));
      }

      const q = query(collectionRef, ...queryConstraints);

      const querySnapshot = await getDocs(q);

      return this.querySnapResult(querySnapshot, queryLimit);
    } catch (err) {
      throw new Error(`Something went wrong: ${err}`);
    }
  };

  static create = async ({
    path,
    doc: docPayload = {},
    docId,
  }: {
    path: string;
    doc?: any;
    docId?: string;
  }): Promise<void> => {
    try {
      const documentId = docId || docPayload.documentId;

      const createdAt = serverTimestamp();

      const document = { ...docPayload, documentId, createdAt };

      const docRef = doc(firestore, path, documentId);

      await setDoc(docRef, document, { merge: true });

      return document;
    } catch (err) {
      throw new Error(`db create with error: ${err}`);
    }
  };

  static deleteById = async ({
    path,
    docId,
  }: FirestoreServiceTypes): Promise<any> => {
    if (!docId) {
      throw new Error('Invalid document id');
    }
    try {
      const docRef = doc(firestore, path, docId);

      await deleteDoc(docRef);

      return { docId };
    } catch (err) {
      throw new Error(`db delete with error: ${err}`);
    }
  };
}

export default FirestoreService;
