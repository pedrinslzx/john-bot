import { Application } from 'express'
import passport from 'passport'
import DiscordStrategy from 'passport-discord'
import UserModel from './schemas/User'
import { UserType } from './types'

export class Strategy {
  constructor(private server: Application) {
    this.server.use(passport.initialize())
    this.server.use(passport.session())
    this.registerPassports()
  }

  private registerDiscordLogin() {
    passport.use(
      new DiscordStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL,
          scope: ['identify', 'guilds', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
          const { id, username, discriminator, avatar, guilds } = profile
          console.log(profile.guilds.length)
          try {
            const user = await UserModel.findOneAndUpdate(
              { discordID: id },
              {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds: [...guilds]
              },
              { new: true }
            )
            if (user) {
              return done(null, user)
            } else {
              const newUser = await UserModel.create({
                discordID: id,
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds: [...guilds]
              })
              return done(null, newUser)
            }
          } catch (error) {
            console.error(error)
            done(new Error(error), null)
          }
        }
      )
    )
  }

  private registerSerializer() {
    passport.serializeUser((user: UserType, done) => {
      done(null, user.discordID)
    })
    passport.deserializeUser(async (discordID: string, done) => {
      try {
        const user = await UserModel.findOne({ discordID })
        done(user ? null : { error: 'user-not-found' }, user || null)
      } catch (err) {
        console.error(err)
        done(new Error(err), null)
      }
    })
  }

  private registerPassports() {
    this.registerSerializer()
    this.registerDiscordLogin()
  }
}
