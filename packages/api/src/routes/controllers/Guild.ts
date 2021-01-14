import { Request, Response, Router } from 'express'
import { authenticate } from '../../lib/auth'
import Guild, { GuildModel } from '../../schemas/Guild'

class GuildController {
  public router = Router()
  constructor() {
    this.router.get('/', authenticate, this.index)
    this.router.post('/', authenticate, this.update)
  }

  public async index(req: Request, res: Response): Promise<Response | void> {
    const { guilds } = req.user
    res.json(
      await Promise.all(
        guilds.isAdm.map(async guild => ({
          ...guild,
          config: await Guild.findOne({ guild_id: guild.id })
        }))
      )
    )
  }

  public async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const {
        guild_id,
        prefix,
        default_role,
        member_log_channel,
        idea_channel
      } = req.body
      // eslint-disable-next-line no-throw-literal
      if (!guild_id) throw { code: 400, message: '`guild_id` is not provided' }
      let guild: GuildModel = await Guild.findOne({ guild_id })
      if (!guild) {
        guild = await Guild.create({
          guild_id,
          prefix,
          default_role,
          member_log_channel,
          idea_channel
        })
      } else {
        if (prefix) guild.prefix = prefix
        if (default_role) guild.default_role = default_role
        if (member_log_channel) guild.member_log_channel = member_log_channel
        if (idea_channel) guild.idea_channel = idea_channel
        await guild.save()
      }
      res.json(guild)
    } catch (error) {
      console.log(error)
      res.status(error.code || 500).send(error)
    }
  }
}

export default new GuildController()
