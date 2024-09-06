import { onDocumentCreated } from "firebase-functions/v2/firestore"
import { welcomeTemplate } from "./templates"
import sendEmail from "./sendEmail"

type User = {
  displayName: string | null
  email: string | null
  emailVerified: boolean
  phoneNumber: string | null
  photoURL: string | null
}

/**
 * Triggers when a new user is created and sends an email
 */
exports.createuser = onDocumentCreated("users/{userId}", (event) => {
  const snapshot = event.data
  if (!snapshot) {
    console.log("No data associated with the event")
    return
  }

  const user = snapshot.data() as User

  if (!user.email || !user.displayName) {
    console.log("User has no email or display name")
    return
  }

  sendEmail({body: welcomeTemplate(user.displayName), to: user.email})
})


