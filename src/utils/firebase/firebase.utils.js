import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
getFirestore,
doc,
getDoc,
setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyH0Cni8mqptK8V9PiV95w9BradZUPq94",
    authDomain: "varianto-db.firebaseapp.com",
    projectId: "varianto-db",
    storageBucket: "varianto-db.appspot.com",
    messagingSenderId: "577517247003",
    appId: "1:577517247003:web:50670a72165d57e44cf6be"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });
  
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt                
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

  }