import { encrypt, decrypt } from '../encryption'

jest.mock('../../config.ts', () => {
  return {
    mediaContent: {
      encryptionKey: 'Nwe5kKPDbity4e3jOjTkS8NWnpMtzybA',
    },
  }
})

describe('encrypt/decrypt functionality', () => {
  const videoURL = 'http://url.to/video.mp4'
  describe('encrypt', () => {
    it('should return an string encrypted value formatted', () => {
      const encrypted = encrypt(videoURL)

      expect(typeof encrypted).toBe('string')
      expect(encrypted).toContain('|')
    })
  })

  describe('decrypt', () => {
    it('should decrypt a previously encrypted value correctly', () => {
      const encrypted = encrypt(videoURL)
      const decrypted = decrypt(encrypted)

      expect(typeof decrypted).toBe('string')
      expect(decrypted).toEqual(videoURL)
    })
  })
})
