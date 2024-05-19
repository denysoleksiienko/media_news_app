import { WhereFilterOp, OrderByDirection, FieldPath } from 'firebase/firestore';

export type FirestoreServiceTypes = {
  path: string;
  docId: string;
};

export type QueryGetAllTypes = {
  path: string;
  whereFilter?: {
    key: string | FieldPath;
    opString: WhereFilterOp;
    value: unknown;
  };
  multipleWhereFilters?: {
    key: string | FieldPath;
    opString: WhereFilterOp;
    value: unknown;
  }[];
  orderByField?: string;
  sortDir?: OrderByDirection;
  queryLimit?: number;
  lastVisible?: any;
};

export type Results = {
  documentId: string;
  title: string;
  imgUrl?: string;
  link?: string;
  message: string;
  createdAt: string;
};

export type FirestoreData = {
  hasMore: boolean;
  lastVisible: any;
  pageCount: number;
  results: Results[];
};

export type DocInput = {
  title: string;
  imgUrl?: string;
  link?: string;
  message: string;
};
