import admin from "firebase-admin";
const serviceAccount = require("./todo-serviceAccount.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminAuth = admin.auth()
const adminDB = admin.firestore()

export { adminAuth, adminDB }