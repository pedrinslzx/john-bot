// #region Definitions_and_imports
import { Message } from 'discord.js'
import search, { VideoSearchResult } from 'yt-search'
import download from 'ytdl-core-discord'
import { Command } from '.'
import config from '../../config'
import { formatSeconds, getYouTubeID, isYouTubeURL } from '../../utils'
import Bot, { EmbedMessage } from '../bot'

export const MusicGif = {
  url:
    'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif'
}
// #endregion Definitions_and_imports

// #region playSong_function
async function playSong(bot: Bot, message: Message, song: VideoSearchResult) {
  const guildID = message.guild?.id || ''
  if (!song) {
    const queue = bot.queues.get(guildID)
    if (queue) {
      queue.connection.disconnect()
      bot.queues.delete(guildID)
    }
    return
  }
  if (message.channel.type !== 'text') return
  if (!message.member?.voice.channel) {
    return message.reply('você tem que estar em um canal né')
  }
  if (
    message.member &&
    message.member.voice &&
    message.guild &&
    message.guild.me
  ) {
    const permissions = message.member.voice.channel.permissionsFor(
      message.guild.me
    )
    if (!permissions?.has('CONNECT')) {
      return message.reply(
        'eu não posso entrar neste canal, veja minhas permissões ou entre em outro!'
      )
    }
    if (!permissions?.has('SPEAK')) {
      return message.reply(
        'eu não posso falar neste canal, veja minhas permissões ou entre em outro!'
      )
    }
  }

  let queue = bot.queues.get(guildID)
  if (!queue) {
    const connection = await message.member?.voice.channel.join()
    await connection.voice?.setSelfDeaf(true)
    queue = {
      connection,
      dispatcher: null,
      songs: [song],
      volume: 10
    }
  }
  const stream = await download(song.url, {
    highWaterMark: 1 << 25,
    filter: 'audioonly'
  })
  queue.dispatcher = queue.connection.play(stream, {
    type: 'opus',
    volume: queue.volume / 10
  })
  queue.dispatcher.on('finish', () => {
    if (queue) {
      queue.songs.shift()
      bot.queues.set(guildID, queue)
      if (queue.songs[0]) {
        playSong(bot, message, queue.songs[0])
      } else {
        queue.connection.disconnect()
        bot.queues.delete(guildID)
      }
    }
  })
  bot.queues.set(guildID, queue)
}
// #endregion playSong-function

// #region renderMusicEmbed_function
export function renderMusicEmbed(song: search.VideoSearchResult): EmbedMessage {
  const msg = new EmbedMessage()
  msg
    .setThumbnail(song.thumbnail)
    .setDescription(song.description)
    .setURL(song.url)
    .addField('Título', song.title, true)
    .addField('ID', song.videoId, true)
    .addField('Duração', song.duration.timestamp, true)
    .addField('Views', song.views, true)
    .addField('Autor', song.author.name, true)
  return msg
}
// #endregion renderMusicEmbed_function

// #region PlayCommand
export const PlayCommand = new Command(
  'play',
  'Comando para tocar musica',
  ['p'],
  async (bot, message, args) => {
    if (message.channel.type !== 'text' || !message.guild) return
    let msg = new bot.utils.EmbedMessage()
    const mainMSG = await message.reply('procurando...')
    try {
      if (typeof args[0] !== 'string') {
        return mainMSG.edit(`${message.author}, você tem que por uma musica né`)
      }
      let songData: search.VideoSearchResult | search.VideoMetadataResult
      if (isYouTubeURL(args[0])) {
        const id = getYouTubeID(args[0])
        if (id) {
          const result = await search({ videoId: id })
          if (!result) {
            return mainMSG.edit(`${message.author}, não encontrei essa musica`)
          }
          songData = result
        } else {
          return mainMSG.edit(`${message.author}, não encontrei essa musica`)
        }
      } else {
        const query = args.join(' ')

        const result = await search({ query })
        if (!result || !result.videos[0]) {
          return mainMSG.edit(`${message.author}, não encontrei essa musica`)
        }
        songData = result.videos[0]
      }
      const queue = bot.queues.get(message.guild?.id || '')

      const song: search.VideoSearchResult = {
        type: 'video',
        ...songData
      }

      msg = renderMusicEmbed(song).addField(
        'Pedido por',
        message.author.tag,
        true
      )

      if (queue) {
        queue.songs.push(song)
        bot.queues.set(message.guild?.id || '', queue)
        msg.setAuthor('Musica adicionada', MusicGif.url)

        await mainMSG.edit(message.author.toString(), msg)
      } else {
        await playSong(bot, message, song)
        msg.setAuthor('Tocando música', MusicGif.url)

        await mainMSG.edit(message.author.toString(), msg)
      }
    } catch (error) {
      console.error(error)
      mainMSG.edit(
        `${message.author}, deu erro aqui, tente novamente mais tarde`
      )
    }
  },
  { type: 'music', acceptDM: false, cooldown: 5 },
  {
    usage: [
      'Eu posso tocar musicas do YouTube',
      `Para isso digite: \`${config.prefix}play {nome da musica}\``
    ]
  }
)
// #endregion PlayCommand

// #region QueueCommand
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
  { type: 'music', acceptDM: false, cooldown: 5 },
  {
    usage: [
      'Veja as musicas que serão tocadas nesse servidor',
      `Para isso digite: \`${config.prefix}queue\``
    ]
  }
)
// #endregion QueueCommand

// #region NowCommand
export const NowCommand = new Command(
  'now',
  'Veja oque esta tocando agora',
  ['now-playing', 'tocando-agora', 'tocando'],
  async (bot, message) => {
    const queue = bot.queues.get(message.guild?.id || '')
    if (queue) {
      if (queue.songs && queue.songs[0]) {
        const { songs, dispatcher } = queue
        const [song] = songs
        const msg = renderMusicEmbed(song)
        msg
          .addField(
            'Decorrido',
            formatSeconds((dispatcher?.streamTime || 0) / 1000),
            true
          )
          .setAuthor('Tocando', MusicGif.url)
        console.log(
          dispatcher?.streamTime,
          (dispatcher?.streamTime || 0) / 1000,
          (dispatcher?.streamTime || 0) / 1000,
          formatSeconds((dispatcher?.streamTime || 0) / 1000)
        )
        return message.reply(msg)
      } else {
        const msg = new bot.utils.EmbedMessage()
        msg
          .setTitle('Não temos nada tocando')
          .setDescription('Tente adicionar uma musica')
        return message.reply(msg)
      }
    } else {
      const msg = new bot.utils.EmbedMessage()
      msg
        .setTitle('Não tem nenhuma fila neste servidor')
        .setDescription('Tente criar uma e depois adicione uma musica')
      return message.reply(msg)
    }
  },
  { type: 'music', acceptDM: false, cooldown: 5 },
  { usage: ['Em testes'] }
)
// #endregion NowCommand

// #region SkipCommand
export const SkipCommand = new Command(
  'skip',
  'Passe a musica que está tocando',
  ['passar-musica'],
  async (bot, message) => {
    if (!message.guild) return
    const queue = bot.queues.get(message.guild.id)
    if (!queue || !queue.songs[0]) {
      return message.reply('não tem nenhuma musica tocando')
    }
    queue.songs.shift()
    playSong(bot, message, queue.songs[0])
    if (!queue.songs[0]) {
      return message.reply('A fila acabou :)')
    }
    return message.reply(
      renderMusicEmbed(queue.songs[0]).setAuthor('Tocando', MusicGif.url)
    )
  },
  { type: 'music', acceptDM: false, cooldown: 5 },
  { usage: ['Em testes'] }
)
// #endregion SkipCommand
