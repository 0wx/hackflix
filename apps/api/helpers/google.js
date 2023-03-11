const { OAuth2Client } = require('google-auth-library')

const { CLIENT_ID } = process.env
if(!CLIENT_ID) {
  console.log(`'CLIENT_ID' (google client id) is required in envoirment`)
  process.exit(1)
}

const client = new OAuth2Client(CLIENT_ID)

const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  })

  const payload = ticket.getPayload()

  return payload
}

module.exports = { client, verifyToken }