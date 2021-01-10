import DiscordOAuth from 'discord-oauth2'

const oauthClient = new DiscordOAuth({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL
})

const scope = ['guilds', 'identify', 'email']

export { oauthClient, scope, DiscordOAuth }
export default oauthClient
