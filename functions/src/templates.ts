export const welcomeTemplate = (displayName: string) => {
  return {
    subject: `Welcome subject`,
    text: `Welcome ${displayName}`,
    html: `<h1>Welcome ${displayName}</h1>`
  }
}