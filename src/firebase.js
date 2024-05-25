import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCMZSToUJ6YJSQFFGa_1W3ZvZwONmM2vYM',
  authDomain: 'news-reader-8e749.firebaseapp.com',
  databaseURL: 'https://news-reader-8e749-default-rtdb.firebaseio.com',
  projectId: 'news-reader-8e749',
  storageBucket: 'news-reader-8e749.appspot.com',
  messagingSenderId: '195990759050',
  appId: '1:195990759050:web:47fe7373c83380c347ef73',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app
export { app }




