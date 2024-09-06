import { onDocumentCreated } from "firebase-functions/v2/firestore"
import { welcomeTemplate, newMessageTemplate } from "./templates"
import sendEmail from "./sendEmail"
import { type User } from "./types"
import { getUsers } from "./helpers"

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

  sendEmail({ body: welcomeTemplate(user.displayName), to: user.email })
})

/**
 * Triggers when a new chat is created and sends an email to all participants
 */
exports.newchat = onDocumentCreated("chats/{chatId}", async (event) => {
  const snapshot = event.data
  if (!snapshot) {
    console.log("No data associated with the event")
    return
  }
  const chat = snapshot.data()
  const users = await getUsers(chat.uids)

  // New chat has only one message
  const message = chat.messages[0]

  // Filter out message sender
  const recipientUids = chat.uids.filter((uid: string) => uid !== message.sender) as string[]  

  const body = newMessageTemplate({
    from: users[message.sender].displayName ?? 'Neznámý uživatel',
    body: message.body
  })

  recipientUids.forEach((uid: string) => {
    const email = users[uid].email
    if (email) sendEmail({ body, to: email })
  })
})

/**
 * TOTO Triggers when a new message in existing chat is created and sends an email to all participants
 */

/*const lastMessage = chat.messages.sort((a: { created: { seconds: number } },b: { created: { seconds: number } }) => {
  return b.created.seconds - a.created.seconds
})[0]*/

//console.log(lastMessage);