import chalk from 'chalk'
import { Client, ClientEvents, Collection, Message } from 'discord.js'
import config from '../config'

class Command {
  constructor(
    public name: string,
    public description: string,
    public aliases: string[],
    public run: (
      client: Bot,
      message: Message,
      args: string[]
    ) => Promise<void | any> | void | any
  ) {
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
    console.log(
      chalk.bold('[', chalk.green('new-command'), ']  '),
      name,
      chalk.grey(' aliases: ' + aliases.join(' '))
    )
  }
}

class Event<K extends keyof ClientEvents> {
  constructor(
    public name: K,
    public handler: (bot: Bot, ...args: ClientEvents[K]) => void
  ) {
    Bot.events.set(name, {
      name,
      handler: handler
    })
    console.log(chalk.bold('[', chalk.green('new-event'), ']  '), name)
  }
}

interface SavedCommand extends Command {
  isAlias: boolean
}

class Bot {
  public client: Client
  public config = config
  static commands: Collection<string, SavedCommand> = new Collection<
    string,
    SavedCommand
  >()

  static events: Collection<string, Event<keyof ClientEvents>> = new Collection<
    string,
    Event<keyof ClientEvents>
  >()

  constructor(token: string) {
    if (!token || token === '') throw new Error('Token is invalid')
    this.client = new Client()
    this.client.on('ready', () =>
      console.log(
        chalk.bold('[', chalk.green('bot'), ']  '),
        'logged in as ',
        chalk.bold(this.client.user?.tag)
      )
    )
    this.client.login(token)
  }

  public get commands() {
    return Bot.commands
  }

  public get events() {
    return Bot.events
  }
}

export default Bot

export { Bot, Command, Event }
