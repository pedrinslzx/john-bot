import { Response } from 'express'

interface APIErrorType {
  name: string
  message: string
  code: number
}

const APIErrors = {
  UNAUTHORIZED: {
    name: 'Unauthorized',
    code: 401,
    message: 'Unauthorized! Log in to continue!'
  },
  INTERNAL_SERVER_ERROR: {
    name: 'Internal Server Error',
    code: 500,
    message: ''
  }
}
export function APIError(
  errorName: keyof typeof APIErrors,
  res?: Response
): APIErrorType {
  const error = APIErrors[errorName]
  if (res) {
    res.status(error.code).json({
      error: error.name,
      message: error.message,
      date: new Date().toUTCString()
    })
  }
  return error
}
