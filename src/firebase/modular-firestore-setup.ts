import {getFirestore} from 'firebase/firestore';

import {initFirrebaseApp} from './modular-firebase-setup';

export const firestore = getFirestore(initFirrebaseApp);
