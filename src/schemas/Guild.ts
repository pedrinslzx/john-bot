import { Document, model, Schema } from 'mongoose'

const GuildSchema = new Schema(
  {},
  {
    timestamps: true
  }
)

interface GuildModel extends Document {}

export default model<GuildModel>('Guild', GuildSchema)
