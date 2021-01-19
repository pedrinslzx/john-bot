/* eslint-disable no-use-before-define */
export interface ClashRoyaleAPI_PlayerStats {
  tag: string
  name: string
  expLevel: number
  trophies: number
  bestTrophies: number
  wins: number
  losses: number
  battleCount: number
  threeCrownWins: number
  challengeCardsWon: number
  challengeMaxWins: number
  tournamentCardsWon: number
  tournamentBattleCount: number
  role: string
  donations: number
  donationsReceived: number
  totalDonations: number
  warDayWins: number
  clanCardsCollected: number
  clan: ClashRoyaleAPI_Clan
  arena: ClashRoyaleAPI_Arena
  leagueStatistics: ClashRoyaleAPI_LeagueStatistics
  badges: ClashRoyaleAPI_Badge[]
  achievements: ClashRoyaleAPI_Achievement[]
  cards: ClashRoyaleAPI_DeckCard[]
  currentDeck: ClashRoyaleAPI_DeckCard[]
  currentFavouriteCard: ClashRoyaleAPI_Card
}

export interface ClashRoyaleAPI_Card {
  name: string
  id: number
  maxLevel: number
  iconUrls: ClashRoyaleAPI_IconUrls
}

export interface ClashRoyaleAPI_DeckCard extends ClashRoyaleAPI_Card {
  level: number
  count: number
}

export interface ClashRoyaleAPI_IconUrls {
  medium: string
}

export interface ClashRoyaleAPI_Achievement {
  name: string
  stars: number
  value: number
  target: number
  info: string
  completionInfo?: null | any
}

export interface ClashRoyaleAPI_Badge {
  name: string
  progress: number
  level?: number
  maxLevel?: number
  target?: number
}

export interface ClashRoyaleAPI_LeagueStatistics {
  currentSeason: ClashRoyaleAPI_BaseSeason
  previousSeason: ClashRoyaleAPI_PreviousSeason
  bestSeason: ClashRoyaleAPI_BestSeason
}

export interface ClashRoyaleAPI_BestSeason extends ClashRoyaleAPI_BaseSeason {
  id: string
}

export interface ClashRoyaleAPI_PreviousSeason
  extends ClashRoyaleAPI_BaseSeason {
  id: string
}

export interface ClashRoyaleAPI_BaseSeason {
  trophies: number
  bestTrophies: number
}

export interface ClashRoyaleAPI_Arena {
  id: number
  name: string
}

export interface ClashRoyaleAPI_Clan {
  tag: string
  name: string
  badgeId: number
}
export interface ClashRoyaleAPI_GetLocations {
  items: ClashRoyaleAPI_LocationItem[]
}

export interface ClashRoyaleAPI_LocationItem {
  id: number
  name: string
  isCountry: boolean
  countryCode?: string
}
export interface ClashRoyaleAPI_GetRanking {
  items: ClashRoyaleAPI_RakingItem[]
}

export interface ClashRoyaleAPI_RakingItem {
  tag: string
  name: string
  expLevel: number
  trophies: number
  rank: number
  previousRank: number
  clan?: ClashRoyaleAPI_Clan
  arena: ClashRoyaleAPI_Arena
}
