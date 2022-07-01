import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASEADMIN_PROJECTID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASEADMIN_CLIENTEMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASEADMIN_PRIVATEKEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = admin.auth()
const adminDB = admin.firestore()

export { adminAuth, adminDB }