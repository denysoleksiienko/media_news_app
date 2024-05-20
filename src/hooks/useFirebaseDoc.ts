import FirestoreService from '@/firebase/FirestoreService';
import { DocInput } from '@/types/firestore';
import { makeRandId } from '@/utils/js-utils';

import { useLoading } from './useLoading';

type UseDocument = {
  path: string;
  docId?: string;
};

export function useFirebaseDoc({ path = '', docId = '' }: UseDocument) {
  const { loading, startLoading, stopLoading } = useLoading();

  const getDocumentById = async (documentId: string) => {
    startLoading();
    try {
      return await FirestoreService.getById({
        path,
        docId: documentId,
      });
    } catch (err) {
      throw new Error(`Something went wrong: ${err}`);
    } finally {
      stopLoading();
    }
  };

  const createDocument = async (doc: DocInput) => {
    startLoading();
    try {
      const resp = await FirestoreService.create({
        path,
        docId: makeRandId(20),
        doc,
      });
      return resp;
    } catch (err) {
      throw new Error(`Something went wrong: ${err}`);
    } finally {
      stopLoading();
    }
  };

  const deleteDocument = async () => {
    startLoading();
    try {
      await FirestoreService.deleteById({ path, docId });
    } catch (err) {
      throw new Error(`Something went wrong: ${err}`);
    } finally {
      stopLoading();
    }
  };

  return [
    {
      loading,
      getDocumentById,
      createDocument,
      deleteDocument,
    },
  ];
}
