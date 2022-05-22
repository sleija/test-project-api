import { Request } from 'express'

export function isUUID(id: string): boolean {
  const match = id?.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  )
  return match?.length > 0
}

export function isDefinedUserId(text: string): string | boolean {
  return text && text !== 'undefined'
}

export function toLongNamesDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const merged: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return date?.toLocaleDateString(undefined, merged)
}

export function toRouteUrl(req: Request): string {
  const port = process.env.PORT ? `:${process.env.PORT}` : ''
  return `${req.protocol}://${req.hostname}${port}${req.baseUrl}`
}
