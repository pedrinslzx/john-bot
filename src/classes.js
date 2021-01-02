import {Message, Client, ClientOptions, Collection } from 'discord.js'
import db from './database'

export class Command {
  name = ''
  description = ''
  examples = ['']
  alias = ['']
  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {string[]} args
   * @param {Client} client
  */
  async handler(message, args, client){
    throw new Error('Handler not implemented')
  }
}

export class Bot extends Client{
  config = new Collection()
  commands = new Collection();
  // prefix = PREFIX;
  queue = new Map();
  /**
   * @param {ClientOptions} options
   */
  constructor(options = {}){
    super(options)
  }
}
