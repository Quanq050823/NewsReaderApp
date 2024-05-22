import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCJLikriG2K94cMm7OPOoUSQ1MHQsH1Nq4',
  authDomain: 'newspaper-4ab39.firebaseapp.com',
  projectId: 'newspaper-4ab39',
  storageBucket: 'newspaper-4ab39.appspot.com',
  messagingSenderId: '159133467334',
  appId: '1:159133467334:web:ad826ad43c8e8b9222cdc7',
  measurementId: 'G-PY5GDSL1RB',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app
export { app }




