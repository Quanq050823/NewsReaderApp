import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCP9zNOoDI1RhQv3HnTR-bU1TwtWtB3RpI',
  authDomain: 'news-admin-60412.firebaseapp.com',
  projectId: 'news-admin-60412',
  storageBucket: 'news-admin-60412.appspot.com',
  messagingSenderId: '368054578353',
  appId: '1:368054578353:web:633cecf31588f1057c8690',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app
export { app }




