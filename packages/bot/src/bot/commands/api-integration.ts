import { Message, MessageReaction, User } from 'discord.js'
import { Command } from '.'
import config from '../../config'
import { splitArray } from '../../utils'
import { clashRoyaleAPI, clashRoyaleAPICached } from '../../utils/api'
import {
  ClashRoyaleAPI_GetLocations,
  ClashRoyaleAPI_GetRanking,
  ClashRoyaleAPI_LocationItem,
  ClashRoyaleAPI_PlayerStats,
  ClashRoyaleAPI_RakingItem
} from '../../utils/types'

export const ClashRoyaleCommand = new Command(
  'clash-royale',
  'Veja suas estatísticas no **Clash Royale**',
  ['cr'],
  async (bot, message, args) => {
    if (typeof args[0] !== 'string') {
      return message.reply(
        'você tem que colocar a sua tag né, porque eu não sou adivinha'
      )
    }
    const tag = args[0]
    const mainMessage = await message.reply(
      `tô buscando os dados para tag ${tag}, pera um pouco`
    )
    try {
      const apiResponse = await clashRoyaleAPI.get<ClashRoyaleAPI_PlayerStats>(
        `/players/${encodeURIComponent(tag)}`
      )
      const { data } = apiResponse
      const msg = new bot.utils.EmbedMessage()
      msg.setTitle(`${data.name} - **${data.tag}**`)
      msg.addField('XP Level', data.expLevel, true)
      msg.addField('Arena Atual', data.arena.name, true)

      msg.addField('Total de Troféus', data.trophies, true)
      msg.addField('Total de partidas', data.battleCount, true)

      msg.addField('Total de vitórias', data.wins, true)
      msg.addField('Total de derrotas', data.losses, true)
      if (data.clan) {
        msg.addField('Nome do Clan', data.clan.name, true)
        msg.addField('Tag do Clan', data.clan.tag, true)
      }
      if (data.currentFavouriteCard) {
        msg.addField('Carta Favorita', data.currentFavouriteCard.name, true)
        msg.setThumbnail(data.currentFavouriteCard.iconUrls.medium)
      }
      await mainMessage.edit(`<@!${message.author.id}>, achei aqui!`, msg)
    } catch (error) {
      if (error.isAxiosError) {
        if (error.response.status === 404) {
          return await mainMessage.edit(
            `<@!${message.author.id}>, acho que você pois uma tag invalida, não encontrei nada por aqui!`
          )
        } else if (error.response.status === 500) {
          return await mainMessage.edit(
            `<@!${message.author.id}>, deu erro aqui no servidor, tente depois tá!?`
          )
        }
      }
      return await mainMessage.edit(
        `<@!${message.author.id}>, deu erro, naõ sei oque aconteceu, entre em contato com o time de suporte que eles vao te falar oque fazer`
      )
    }
  },
  { type: 'games', acceptDM: true },
  {
    usage: [
      'Veja suas estatísticas no game. Veja sua arena, quantidade de batalhas, quantas você ganhou, quantas você perdeu.',
      `Para isso digite \`${config.prefix}cr {sua tag}\`, ou se estiver na DM \`cr {sua tag}\``,
      '\n\n**Obs.: Como os dados vem de uma API externa, latência alta ou demora do bot a enviar ois dados é normal**'
    ]
  }
)

export const ClashRoyaleLocationCommand = new Command(
  'clash-royale-location',
  'Veja quais são os rankings disponíveis no **Clash Royale**',
  ['cr-location', 'cr-l'],
  async (bot, message, args) => {
    const mainMessage = await message.reply(
      'tô buscando os dados, pera um pouco'
    )
    async function render(
      page: Array<{ name: string; value: string; inline: boolean }>,
      editMessage: Message,
      data?: { currPage?: number; pages?: number; type?: 'ids' | 'ranking' }
    ) {
      const embed = bot.utils.renderPage({
        title: 'IDS dos rankings',
        description: `Digite um desses ids apos o comando para ver o ranking \`${bot.config.prefix}cl-location \``,
        page
      })
      if (data && data.currPage && data.pages) {
        embed.setFooter(`${data.currPage + 1} de ${data.pages}`)
      }
      if (data && data.type && data.type === 'ranking') {
        embed.setTitle('Ranking ' + args[0])
        embed.setDescription('Veja quem são os 48 melhor no ranking local')
      }
      await editMessage.edit(`<@!${message.author.id}>, achei aqui!`, embed)
    }
    try {
      if (typeof args[0] === 'string') {
        const id = Number(args[0])
        if (id >= 57000007 && id <= 57000260) {
          const apiResponse = await clashRoyaleAPI.get<ClashRoyaleAPI_GetRanking>(
            `/locations/${encodeURIComponent(id)}/rankings/players?limit=48`
          )

          const renderPage = (location: ClashRoyaleAPI_RakingItem) => ({
            name: location.name,
            value: `*Total de troféus:* ${location.trophies}`,
            inline: true
          })

          let currPage = 0
          const { data } = apiResponse
          const pages = splitArray(data.items, 24)

          await render(pages[currPage].map(renderPage), mainMessage, {
            currPage,
            pages: pages.length,
            type: 'ranking'
          })

          const emojis = ['◀️', '▶️']

          await Promise.all(
            emojis.map(async emoji => await mainMessage.react(emoji))
          )

          await mainMessage.awaitReactions(
            async (reaction: MessageReaction, user: User) => {
              if (emojis.includes(reaction.emoji.name) && !user.bot) {
                if (reaction.emoji.name === emojis[0]) {
                  if (currPage > 0) {
                    currPage--
                    await render(pages[currPage].map(renderPage), mainMessage, {
                      currPage,
                      pages: pages.length,
                      type: 'ranking'
                    })
                  }
                  await mainMessage.reactions.removeAll()
                  await Promise.all(
                    emojis.map(async emoji => await mainMessage.react(emoji))
                  )
                }
                if (reaction.emoji.name === emojis[1]) {
                  await reaction?.remove()
                  await mainMessage.react(emojis[1])
                  if (currPage + 1 < pages.length) {
                    currPage++
                    await render(pages[currPage].map(renderPage), mainMessage, {
                      currPage,
                      pages: pages.length,
                      type: 'ranking'
                    })
                  }
                }
              }
              return true
            },
            { time: 12e4, errors: ['time'] }
          )
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'ID é invalido', type: 'invalid-id' }
        }
      } else {
        const apiResponse = await clashRoyaleAPI.get<ClashRoyaleAPI_GetLocations>(
          '/locations'
        )

        const renderPage = (location: ClashRoyaleAPI_LocationItem) => ({
          name: location.name,
          value: String(location.id),
          inline: true
        })

        let currPage = 0
        const { data } = apiResponse
        clashRoyaleAPICached.locations = data.items.reduce((obj, location) => {
          obj[location.id] = location
          return obj
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any)
        const pages = splitArray(
          data.items.filter(rank => rank.isCountry),
          24
        )

        await render(pages[currPage].map(renderPage), mainMessage, {
          currPage,
          pages: pages.length
        })

        const emojis = ['◀️', '▶️']

        await Promise.all(
          emojis.map(async emoji => await mainMessage.react(emoji))
        )

        await mainMessage.awaitReactions(
          async (reaction: MessageReaction, user: User) => {
            if (emojis.includes(reaction.emoji.name) && !user.bot) {
              if (reaction.emoji.name === emojis[0]) {
                if (currPage > 0) {
                  currPage--
                  await render(pages[currPage].map(renderPage), mainMessage, {
                    currPage,
                    pages: pages.length
                  })
                }
                await mainMessage.reactions.removeAll()
                await Promise.all(
                  emojis.map(async emoji => await mainMessage.react(emoji))
                )
              }
              if (reaction.emoji.name === emojis[1]) {
                await reaction?.remove()
                await mainMessage.react(emojis[1])
                if (currPage + 1 < pages.length) {
                  currPage++
                  await render(pages[currPage].map(renderPage), mainMessage, {
                    currPage,
                    pages: pages.length
                  })
                }
              }
            }
            return true
          },
          { time: 12e4, errors: ['time'] }
        )
      }
    } catch (error) {
      if (error.isAxiosError) {
        if (error.response.status === 404) {
          return await mainMessage.edit(
            `<@!${message.author.id}>, acho que você pois um id invalido, não encontrei nada por aqui! Tente \`${bot.config.prefix}cr-l\``
          )
        } else if (error.response.status === 500) {
          return await mainMessage.edit(
            `<@!${message.author.id}>, deu erro aqui no servidor, tente depois tá!?`
          )
        }
      }
      if (error.type === 'invalid-id') {
        return await mainMessage.edit(
          `<@!${message.author.id}>, acho que você pois um id invalido, não encontrei nada por aqui!\n Tente \`${bot.config.prefix}cr-l\``
        )
      }
      console.log({ ...error })
      return await mainMessage.edit(
        `<@!${message.author.id}>, deu erro, não sei oque aconteceu, entre em contato com o time de suporte que eles vao te falar oque fazer`
      )
    }
  },
  { type: 'games', acceptDM: true },
  {
    usage: [
      'Veja quem são os 48 melhores em cada ranking do game.',
      `**Como ver todos os rankings:** Para isso digite \`${config.prefix}cr-l\`, ou se estiver na DM \`cr-l\`, assim o bot enviara uma mensagem com todos os rankings disponíveis, com seu id e nome.`,
      `**Como ver um ranking especifico:** Para isso digite \`${config.prefix}cr-l {id do ranking}\`, ou se estiver na DM \`cr-l {id do ranking}\`, assim o bot enviara uma mensagem com todos os 48 melhores players do game para aquele ranking.`,
      '\n\n**Obs.: Como os dados vem de uma API externa, latência alta ou demora do bot a enviar ois dados é normal**'
    ]
  }
)
