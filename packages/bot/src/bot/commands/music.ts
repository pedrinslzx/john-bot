import { Message } from 'discord.js'
import search, { VideoSearchResult } from 'yt-search'
import download from 'ytdl-core-discord'
import { Command } from '.'
import { formatSeconds } from '../../utils'
import Bot from '../bot'

async function playSong(
  bot: Bot,
  message: Message,
  song: VideoSearchResult,
  mainMessage: Message
) {
  if (message.channel.type !== 'text') return
  if (!message.member?.voice.channel) {
    return mainMessage.edit(
      `${message.author}, você tem que estar em um canal né`
    )
  }
  const guildID = message.guild?.id || ''
  let queue = bot.queues.get(guildID)
  if (queue) {
    queue.songs.push(song)
    bot.queues.set(guildID, queue)
  } else {
    const connection = await message.member?.voice.channel.join()
    const stream = await download(song.url)
    const dispatcher = connection.play(stream, { type: 'opus' })
    queue = {
      connection,
      dispatcher,
      songs: [song],
      volume: 10
    }
    dispatcher.on('finish', () => {
      if (queue) {
        queue.songs.shift()
        if (queue.songs && queue.songs.length > 0) {
          playSong(bot, message, queue?.songs[0], mainMessage)
        } else {
          queue.clear = setTimeout(() => {
            queue?.connection.disconnect()
            bot.queues.set(guildID, null)
          }, 5000)
        }
        bot.queues.set(guildID, queue)
      }
    })
    bot.queues.set(guildID, queue)
  }
}

export const PlayCommand = new Command(
  'play',
  'Comando para tocar musica',
  ['p'],
  async (bot, message, args) => {
    if (message.channel.type !== 'text') return
    const msg = new bot.utils.EmbedMessage()
    const mainMSG = await message.reply('procurando...')
    try {
      if (typeof args[0] !== 'string') {
        return mainMSG.edit(`${message.author}, você tem que por uma musica né`)
      }
      const s = args.join(' ')
      const result = await search({ query: s })
      if (!result || !result.videos[0]) {
        return mainMSG.edit(`${message.author}, não encontrei essa musica`)
      }
      const [song] = result.videos
      msg
        .setTitle(song.title)
        .setImage(song.thumbnail)
        .setDescription(song.description)
        .setURL(song.url)
        .addField('ID', song.videoId, true)
        .addField('Duração', formatSeconds(song.seconds), true)
        .addField('Views', song.views, true)
        .addField('Autor', song.author.name, true)
        .addField('ago', song.ago, true)
      await mainMSG.edit(msg)
      await playSong(bot, message, song, mainMSG)
    } catch (error) {
      console.error(error)
      mainMSG.edit(
        `${message.author}, deu erro aqui, tente novamente mais tarde`
      )
    }
  },
  { type: 'music', acceptDM: false }
)

export const QueueCommand = new Command(
  'queue',
  'Mostra a fila de musicas',
  ['list', 'ls'],
  async (bot, message) => {
    const guildID = message.guild?.id || ''
    const queue = bot.queues.get(guildID)
    if (queue) {
      const msg = new bot.utils.EmbedMessage()
      msg.setTitle('Fila de Musicas')
      if (queue.songs.length > 0) {
        msg.addFields(
          queue.songs.map((song, i) => ({
            name: `**${i + 1}.** ${song.title}`,
            value: song.url
          }))
        )
      } else {
        msg.addField(
          'Não tem musicas',
          `não achei nenhuma musica nesta fila, aproveite e adicione uma musica com o comando \`${bot.config.prefix}play\``
        )
      }
      message.channel.send(msg)
    } else {
      message.reply(
        `não achei nenhuma fila para este servidor, aproveite e crie uma adicionando uma musica com o comando \`${bot.config.prefix}play\``
      )
    }
  },
  { type: 'music', acceptDM: false }
)
