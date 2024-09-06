export const welcomeTemplate = (displayName: string) => {
  return {
    subject: `Welcome subject`,
    text: `Welcome ${displayName}`,
    html: `<h1>Welcome ${displayName}</h1>`
  }
}

type Message = {
  from: string
  body: string
}
export const newMessageTemplate = (message: Message) => {
  return {
    subject: `New message subject`,
    text: `New message from ${message.from}: ${message.body}`,
    html: `<h1>New message from ${message.from}</h1>
    <p>${message.body}</p>`
  }
}