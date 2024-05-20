import { PATHS } from '@/constants/paths';

export type MainStackParamList = {
  [PATHS.NEWS]: undefined;
  [PATHS.ADD_NEWS]: undefined;
  [PATHS.VIEW_NEWS]: {
    documentId: string;
    title: string;
  };
};
