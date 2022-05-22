import {
  HttpError,
  HttpUnauthorizedError,
  HttpForbiddenError,
  HttpBadRequestError,
  HttpNotFoundError,
  HttpInternalServerError,
} from '../Errors'

describe('HttpError', () => {
  const defaultMsg = 'API error'
  const customMsg = 'User needs to be authenticated'

  it('should have default error message and name', () => {
    const err = new HttpError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('API_ERROR')
  })

  it('should have custom error message', () => {
    const err = new HttpError({ message: customMsg })
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpError()
    expect(err.status).toBe(500)
  })

  it('should have correct data object', () => {
    const errData = { someData: 'something went wrong' }
    const err = new HttpError({ data: errData })
    expect(err.data).toStrictEqual(errData)
  })
})

describe('HttpBadRequestError', () => {
  const defaultMsg = 'Bad request error'
  const customMsg = 'Invalid request body'

  it('should have default error message and name', () => {
    const err = new HttpBadRequestError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('BAD_REQUEST')
  })

  it('should have custom error message', () => {
    const err = new HttpBadRequestError(customMsg)
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpBadRequestError()
    expect(err.status).toBe(400)
  })

  it('should have correct data object', () => {
    const errData = { message: 'something went wrong' }
    const err = new HttpBadRequestError(customMsg, errData)
    expect(err.data).toStrictEqual(errData)
  })
})

describe('HttpUnauthorizedError', () => {
  const defaultMsg = 'Unauthorized error'
  const customMsg = 'User needs to be authenticated'

  it('should have default error message and name', () => {
    const err = new HttpUnauthorizedError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('UNAUTHORIZED')
  })

  it('should have custom error message', () => {
    const err = new HttpUnauthorizedError(customMsg)
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpUnauthorizedError()
    expect(err.status).toBe(401)
  })

  it('should have correct data object', () => {
    const errData = { message: 'something went wrong' }
    const err = new HttpUnauthorizedError(customMsg, errData)
    expect(err.data).toStrictEqual(errData)
  })
})

describe('HttpForbiddenError', () => {
  const defaultMsg = 'Forbidden error'
  const customMsg = 'User needs to have permissions'

  it('should have default error message and name', () => {
    const err = new HttpForbiddenError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('FORBIDDEN')
  })

  it('should have custom error message', () => {
    const err = new HttpForbiddenError(customMsg)
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpForbiddenError()
    expect(err.status).toBe(403)
  })

  it('should have correct data object', () => {
    const errData = { message: 'something went wrong' }
    const err = new HttpForbiddenError(customMsg, errData)
    expect(err.data).toStrictEqual(errData)
  })
})

describe('HttpNotFoundError', () => {
  const defaultMsg = 'Not found error'
  const customMsg = 'Resource was not found'

  it('should have default error message and name', () => {
    const err = new HttpNotFoundError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('NOT_FOUND')
  })

  it('should have custom error message', () => {
    const err = new HttpNotFoundError(customMsg)
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpNotFoundError()
    expect(err.status).toBe(404)
  })

  it('should have correct data object', () => {
    const errData = { message: 'something went wrong' }
    const err = new HttpNotFoundError(customMsg, errData)
    expect(err.data).toStrictEqual(errData)
  })
})

describe('HttpInternalServerError', () => {
  const defaultMsg = 'Internal server error'
  const customMsg = 'An API error has occurred. Contact support.'

  it('should have default error message and name', () => {
    const err = new HttpInternalServerError()
    expect(err.message).toBe(defaultMsg)
    expect(err.name).toBe('INTERNAL_SERVER_ERROR')
  })

  it('should have custom error message', () => {
    const err = new HttpInternalServerError(customMsg)
    expect(err.message).toBe(customMsg)
  })

  it('should have correct error status code', () => {
    const err = new HttpInternalServerError()
    expect(err.status).toBe(500)
  })

  it('should have correct data object', () => {
    const errData = { message: 'something went wrong' }
    const err = new HttpInternalServerError(customMsg, errData)
    expect(err.data).toStrictEqual(errData)
  })
})
