import { Document, model, Schema, SchemaTypes } from 'mongoose'
import config from '../config'

const GuildSchema = new Schema(
  {
    guildID: {
      type: SchemaTypes.String,
      require: true,
      unique: true
    },
    prefix: {
      type: SchemaTypes.String,
      require: true,
      default: config.prefix
    },
    // defaultRole: {
    //   type: SchemaTypes.String,
    //   require: false
    // },
    // memberLogChannel: {
    //   type: SchemaTypes.String,
    //   require: false
    // },
    ideaChannel: {
      type: SchemaTypes.String,
      require: false
    }
  },
  {
    timestamps: true
  }
)

export interface GuildModel extends Document {
  guildID: string
  prefix: string
  // defaultRole?: string
  // memberLogChannel?: string
  ideaChannel?: string
}

export default model<GuildModel>('Guild', GuildSchema)
