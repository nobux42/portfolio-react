import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBt8Zw4xTbaAoRuKsBsC74vadmOp4YEwu0",
    authDomain: "portfolio-react-3d680.firebaseapp.com",
    databaseURL: "https://portfolio-react-3d680.firebaseio.com",
    projectId: "portfolio-react-3d680",
    storageBucket: "portfolio-react-3d680.appspot.com",
    messagingSenderId: "924073439870",
    appId: "1:924073439870:web:39cccc2af019699e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export { firebase as default, firestore, storage, auth };