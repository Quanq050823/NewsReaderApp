/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'news-reader-8e749.firebaseapp.com',
  databaseURL: 'https://news-reader-8e749-default-rtdb.firebaseio.com',
  projectId: 'news-reader-8e749',
  storageBucket: 'news-reader-8e749.appspot.com',
  messagingSenderId: '195990759050',
  appId: '1:195990759050:web:ed2be9a8b78bb8f147ef73',
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }
