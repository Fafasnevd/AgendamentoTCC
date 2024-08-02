import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

  const app = initializeApp({
    apiKey: "AIzaSyCvTGFfOa3kDWkBRUd_LQMgJIRvzX4UIyc",
    authDomain: "agendamento-online-3a4f6.firebaseapp.com",
    projectId: "agendamento-online-3a4f6",
    storageBucket: "agendamento-online-3a4f6.appspot.com",
    messagingSenderId: "443802581600",
    appId: "1:443802581600:web:8699fbc6ff386865bd6105",
    measurementId: "G-PZ3N1WY6BB"
  })

export const auth = getAuth(app)

export const db = getFirestore(app)

export default app
