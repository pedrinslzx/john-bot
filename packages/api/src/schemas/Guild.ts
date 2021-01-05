import { Document, model, Schema } from 'mongoose'

const required = true

const GuildSchema = new Schema(
  {
    guild_id: {
      type: String,
      required
    },
    prefix: {
      type: String,
      required,
      default: '!'
    },
    default_role: {
      type: String,
      required: false
    },
    member_log_channel: {
      type: String,
      required: false
    },
    idea_channel: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

interface GuildModel extends Document {
  guild_id: string
  prefix: string
  default_role?: string
  member_log_channel?: string
  idea_channel?: string
}

export default model<GuildModel>('Guild', GuildSchema)
