import crypto from 'crypto'
import config from '../config'

const algorithm = 'aes-256-ctr'
const secretKey = config.mediaContent.encryptionKey
const iv = crypto.randomBytes(16)

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return `${iv.toString('hex')}|${encrypted.toString('hex')}`
}

export function decrypt(hash: string): string {
  const [iv, content] = hash.split('|')
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'))
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()])
  return decrypted.toString()
}
