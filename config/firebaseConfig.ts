import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import serviceAccount from "../assignment3-events-firebase-adminsdk-fbsvc-45252e5c3d.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export { db };