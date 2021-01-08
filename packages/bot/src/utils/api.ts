import axios from 'axios'
import { ClashRoyaleAPI_LocationItem } from './types'

export const clashRoyaleAPI = axios.create({
  baseURL: 'https://api.clashroyale.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.CLASH_ROYALE_API}`
  }
})
export const clashRoyaleAPICached: {
  locations: {
    [key: number]: ClashRoyaleAPI_LocationItem
  } | null
} = {
  locations: null
}
