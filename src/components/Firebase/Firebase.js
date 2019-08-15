import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBXGqX92NqkwQ-Mui6jv1wkHTf--XyMcto",
  authDomain: "wsutc-trio-app.firebaseapp.com",
  databaseURL: "https://wsutc-trio-app.firebaseio.com",
  projectId: "wsutc-trio-app",
  storageBucket: "wsutc-trio-app.appspot.com",
  messagingSenderId: "910423929795",
  appId: "1:910423929795:web:a2bf0a0f8303b7ba"
}

export default class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

    this.db = app.firestore();
    this.db2 = app.database();
    this.storage = app.storage();

    this.userRef = this.db.collection('users');
    this.postRef = this.db.collection('posts');
    this.realtimeUserRef = this.db2.ref('/').child('users');
    this.realtimeTutorRef = this.db2.ref('/').child('tutors');

  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doLogout = () => {
    this.auth.signOut();
  }

  queryUsers = () => {
    return this.realtimeUserRef.once('value')
  }

  queryTutors = () => {
    return this.realtimeTutorRef.once('value')
  }

  queryPosts = () => {
    return this.postRef.get();
  }

  doAddUser = user => {
    const { email, password } = user;

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(object => {
        const { password, ...otherProps } = user;

        this.db2.ref('users/' + object.user.uid).set({
          ...otherProps,
          uid: object.user.uid
        })
      });
  }

  doUpdatePost = post => {
    return this.db.collection('posts').doc(post.postId).update({
      ...post
    })
  }

  doAddNewPost = postData => {
    if (postData.image) {
      const { image, ...post } = postData
      let id;
      let fileExtension = image.name.split('.').pop();


      if (fileExtension != 'png' && fileExtension !=  'jpg' && fileExtension != 'jpeg') {
        throw new Error('Error! Only images of type png, jpg and jpeg are supported at the momment.');
      }

      return this.db.collection('posts').add(
        {
          ...post
        })
        .then(ref => {
          id = ref.id;
          console.log(ref);
          ref.set({
            ...post,
            postId: ref.id
          });

          return this.storage.ref().child('posts/' + ref.id + '/post-image.' + fileExtension).put(image);
        })
        .then(() => {
          console.log('upload complete!');

          return this.storage.ref().child('posts/' + id + '/post-image.' + fileExtension).getDownloadURL()
        })
        .then(url => {
          return this.db.collection('posts').doc(id).update({
            ...post,
            image: url,
            imageStoragePath: '/posts/' + id + '/post-image.' + fileExtension
          })
        })
        .catch(error => {
          console.log("Error in adding Post: " + error)
        })
    }
    else {
      const post = postData;

      return this.db.collection('posts').add(
        {
          ...post
        })
        .then(ref => {
          console.log(ref);
          ref.set({
            ...post,
            postId: ref.id
          })

        })
        .catch(error => {
          console.log("Error in adding Post: " + error)
        })
    }
  }

  doDeletePost = post => {
    return this.db.collection('posts').doc(post.postId).delete()
      .then(() => {
        if(post.imageStoragePath)
        {
          return this.storage.ref(post.imageStoragePath).delete();
        }
      })
      .then(() => {
        console.log('post data deleted');
      })
      .catch(err => {
        console.log(err);
      })
  }

  doAddTutor = tutor => {
    const { email, password } = tutor;

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(object => {
        const {password, ...otherProps } = tutor;

        this.db2.ref('tutors/' + object.user.uid).set({
          ...otherProps,
          uid: object.user.uid,
        })
      })
  }
}