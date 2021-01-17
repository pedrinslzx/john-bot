import chalk from 'chalk'
import {
  Client,
  ClientEvents,
  Collection,
  ColorResolvable,
  Message,
  MessageEmbed,
  PermissionResolvable,
  StreamDispatcher,
  VoiceConnection
} from 'discord.js'
import { connect } from 'mongoose'
import { VideoSearchResult } from 'yt-search'
import config from '../config'
import RegisterFileCommands from './commands'
import RegisterFileEvents from './events'

// #region code

type CommandTypes = 'moderation' | 'games' | 'server' | 'music' | 'bot'

class Command {
  public readonly cooldown = new Map<string, Date>()
  constructor(
    public name: string,
    public description: string,
    public aliases: string[],
    public run: (
      client: Bot,
      message: Message,
      args: string[]
    ) => Promise<void | unknown> | void | unknown,
    public config: {
      type: CommandTypes
      permissions?: PermissionResolvable
      acceptDM?: boolean
      show?: boolean
      cooldown?: number
    },
    public help: {
      usage: string | string[]
    }
  ) {
    if (help.usage === '' || help.usage === [] || help.usage.includes('')) {
      const error = new Error(
        'A propriedade `usage` não pode ser ou conter valores vazios'
      )
      console.error(error)
      throw error
    }
    Bot.commands.set(name, {
      ...this,
      isAlias: false
    })
    aliases.forEach(alias => {
      if (Bot.commands.has(alias)) {
        throw new Error(`Alias \`${alias}\` already exists`)
      } else {
        Bot.commands.set(alias, {
          ...this,
          isAlias: true
        })
      }
    })
    console.info(
      chalk.bold('[', chalk.green('new-command'), ']  '),
      name,
      chalk.grey(` call: ${name} ${aliases.join(' ')}`)
    )
  }
}

type EventHandler<K extends keyof ClientEvents> = (
  // eslint-disable-next-line no-use-before-define
  bot: Bot,
  ...args: ClientEvents[K]
) => void

class Event<K extends keyof ClientEvents> {
  constructor(public name: K, public handler: EventHandler<K>) {
    Bot.events.set(name, {
      name,
      handler
    })
    console.info(chalk.bold('[', chalk.green('new-event'), ']  '), name)
  }
}

interface SavedCommand extends Command {
  isAlias: boolean
}

class Database {
  constructor(public databaseURL: string) {
    connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).catch(console.error)
  }
}

class EmbedMessage extends MessageEmbed {
  constructor(color?: ColorResolvable, timestamp?: number | Date) {
    super()
    this.setColor(color || config.color)
    this.setTimestamp(timestamp || new Date())
  }
}

function renderPage(data: {
  title: string
  description: string
  page: Array<{
    name: string
    value: string
    inline: boolean
  }>
}): EmbedMessage {
  const embed = new EmbedMessage()
  const page = data.page.slice(0, 24)
  embed.setTitle(data.title)
  embed.setDescription(data.description)
  embed.addFields(page)
  return embed
}

// #endregion

interface Queue {
  connection: VoiceConnection
  songs: VideoSearchResult[]
  volume: number
  dispatcher: StreamDispatcher | null
  clear?: number
}
class Bot extends Client {
  public readonly database: Database
  public readonly config = config
  public readonly queues = new Map<string, Queue>()
  public readonly utils = { EmbedMessage, renderPage }
  public readonly token: string
  static commands: Collection<string, SavedCommand> = new Collection<
    string,
    SavedCommand
  >()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static events: Collection<string, Event<any>> = new Collection<
    string,
    Event<keyof ClientEvents>
  >()

  constructor(token: string) {
    super({})
    if (!token || token === '') throw new Error('Token is invalid')
    this.token = token
    this.database = new Database('mongodb://localhost:27017/discord-bot')
    this.on('ready', () =>
      console.log(
        chalk.bold('[', chalk.green('bot'), ']  '),
        'logged in as ',
        chalk.bold(this.user?.tag)
      )
    )
  }

  public get commands(): Collection<string, SavedCommand> {
    return Bot.commands
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get events(): Collection<string, Event<any>> {
    return Bot.events
  }

  private async registerEvents() {
    await RegisterFileEvents()
    this.events.map(event => {
      try {
        this.addListener(event.name, (...args) => event.handler(this, ...args))
        return true
      } catch (e) {
        return false
      }
    })
  }

  public async start(): Promise<void> {
    await this.registerEvents()
    await RegisterFileCommands()
    this.login(this.token)
  }
}

export default Bot

export { Bot, Command, Event, Database, EmbedMessage, Queue }
