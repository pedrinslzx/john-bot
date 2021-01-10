import Iron from '@hapi/iron'
import { Request } from 'express'
import { v4 } from 'uuid'
import { Session } from '../types'
import { getTokenCookie } from './cookie'

const TOKEN_SECRET = process.env.TOKEN_SECRET || v4()

export async function encryptSession(session: Session): Promise<string> {
  return await Iron.seal(session, TOKEN_SECRET, Iron.defaults)
}

export async function getSession(req: Request): Promise<Session> {
  const token = getTokenCookie(req)
  return token && (await Iron.unseal(token, TOKEN_SECRET, Iron.defaults))
}
