import app from 'firebase/app';
import auth from 'firebase/auth';

const config = {
  apiKey: "AIzaSyBXGqX92NqkwQ-Mui6jv1wkHTf--XyMcto",
  authDomain: "wsutc-trio-app.firebaseapp.com",
  databaseURL: "https://wsutc-trio-app.firebaseio.com",
  projectId: "wsutc-trio-app",
  storageBucket: "wsutc-trio-app.appspot.com",
  messagingSenderId: "910423929795",
  appId: "1:910423929795:web:a2bf0a0f8303b7ba"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = () => {
    return this.auth.signOut();
  }
}

export default Firebase;