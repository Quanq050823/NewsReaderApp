import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDT2R5iEkxh39ykaeziit-n1ZDrCkaaukU',
  authDomain: 'news-aggregator-a2d13.firebaseapp.com',
  projectId: 'news-aggregator-a2d13',
  storageBucket: 'news-aggregator-a2d13.appspot.com',
  messagingSenderId: '491427728629',
  appId: '1:491427728629:web:91a3fb9f2d43263f4489bc',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
export { db }




