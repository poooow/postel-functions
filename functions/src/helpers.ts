const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
import { type User } from "./types"

// Get user objects from given uids
export async function getUsers(uids: string[]) {
  const snapshot = db.collection("users").where("__name__", "in", uids)
  const docsSnapshot = await snapshot.get()

  const users: { [key: string]: User } = {}

  docsSnapshot.docs.forEach((doc: { id: string; data: () => User }) =>
    users[doc.id] = doc.data()
  )

  return users
}