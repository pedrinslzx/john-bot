import { Document, model, Schema } from 'mongoose'
import { UserType } from '../types'

const required = true
const unique = true

const UserSchema = new Schema(
  {
    discordID: {
      type: String,
      required,
      unique
    },
    discordTag: {
      type: String,
      required,
      unique
    },
    avatar: {
      type: String,
      required
    },
    guilds: {
      type: Array,
      required
    },
    refreshToken: {
      type: String,
      required
    },
    accessToken: {
      type: String,
      required
    }
  },
  {
    timestamps: true
  }
)

type UserModel = UserType & Document
const User = model<UserModel>('User', UserSchema)

export { User }
export default User
