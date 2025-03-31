import firebase from "firebase-admin";
import serviceAccount from "./base-de-datos-planeacion-firebase-adminsdk-fbsvc-e1e032d11c.json" with {type: "json"}
import { getFirestore } from "firebase-admin/firestore"
import { cert } from "firebase-admin/credential"

const app = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://base-de-datos-planeacion-default-rtdb.firebaseio.com"

})

const db = getFirestore(app);

export default db;
