import { format } from 'util'
import SequelizeMock from 'sequelize-mock-v5'
import { env } from '@usefultools/utils'
import * as nock from 'nock'
import { userCourseCertInstanceMocks } from './api/certification/__test__/mocks'
import { courseEnrollmentInstanceMocks } from './api/enrollment/__test__/mocks'
import { OrgSettingsModelMock } from './api/organization/__test__/mocks'
import {
  courseInstanceMocks,
  courseModuleInstanceMocks,
  moduleHtmlInstanceMocks,
  moduleInstanceMocks,
  userCourseModuleInstanceMocks,
} from './api/course/__test__/mocks'
import {
  topicInstanceMocks,
  subtopicInstanceMocks,
  ceTypeInstanceMocks,
} from './api/course-topic/__test__/mocks'
import { paymentInstanceMocks } from './api/payment/__test__/mocks'
import { bundleInstanceMocks, bundleCourseInstanceMocks } from './api/bundle/__test__/mocks'

//Environmental variables needed to avoid nock errors
//Disable launch darkly
process.env['LAUNCH_DARKLY_DISABLED'] = 'true'
process.env['MEDIA_ENCRYPTION_KEY'] = '01234567890123456789012345678901'
// Do not throw for missing environment variables
jest.spyOn(env, 'getAsStr').mockImplementation((key) => process.env[key] || '')
jest.spyOn(env, 'getAsInt').mockImplementation((key) => Number(process.env[key]))
jest.spyOn(env, 'getAsBool').mockImplementation((key) => Boolean(process.env[key]))

const error = global.console.error
const warn = global.console.warn

global.console.error = function (...args: unknown[]) {
  error(...args)
  // Fail the tests if we have a console.error
  throw new Error(format(...args))
}

global.console.warn = function (...args: unknown[]) {
  warn(...args)
  // Fail the tests if we have a console.warn
  throw new Error(format(...args))
}

// Ensure that we mock the Sequelize class so that any constructor call
// or authentication / connect call does not actually connect to the database
jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize')
  // manually mock Sequelize.literal as a function that receives a string and returns it, we dont do any calls to db.
  SequelizeMock.literal = jest.fn((string: string) => string)
  // manually mock Sequelize.prototype.transaction so that the generated sequelize object returns a
  // transaction object that contain the commit and rollback async functions
  SequelizeMock.prototype.transaction = async function () {
    const fn = async function (t: unknown) {
      return t
    }
    return fn({ commit: fn, rollback: fn })
  }
  return {
    ...actualSequelize,
    Sequelize: SequelizeMock,
  }
})
const dbMock = new SequelizeMock()

export const ProductCourseMapModel = dbMock.define('ProductCourseMapModel', {
  id: 33,
  courseId: 'course-v1:HIMSS+1+2021_Q1',
  productId: '3d595679-e932-44dd-be39-e8f7b70bc4d6',
  createdAt: '2021-07-30T16:22:14.118Z',
  updatedAt: '2021-07-30T16:22:14.118Z',
})
jest.mock('./api/product-course/models.ts', () => {
  return {
    ProductCourseMapModel,
  }
})

export const UserSettingsModel = dbMock.define('UserSettingsModel', {
  userId: 'e4ad425f-3740-4ca2-bca6-f9f658f3b20a',
  welcomeVideoViewed: true,
  confirmedHimssCheck: true,
})
jest.mock('./api/user/models.ts', () => {
  return { UserSettingsModel }
})

export const CourseModel = dbMock.define('Course', courseInstanceMocks)
export const CourseModuleModel = dbMock.define('CourseModule', courseModuleInstanceMocks)
export const ModuleModel = dbMock.define('Module', moduleInstanceMocks)
export const ModuleHtmlModel = dbMock.define('ModuleHtml', moduleHtmlInstanceMocks)
export const UserCourseModuleModel = dbMock.define(
  'UserCourseModule',
  userCourseModuleInstanceMocks
)
jest.mock('api/course/models.ts', () => {
  return {
    CourseModel,
    ModuleModel,
    ModuleHtmlModel,
    CourseModuleModel,
    UserCourseModuleModel,
  }
})

export const UserCourseCertificationModel = dbMock.define(
  'UserCourseCertification',
  userCourseCertInstanceMocks
)
jest.mock('api/certification/models.ts', () => {
  return {
    UserCourseCertificationModel,
  }
})

export const PaymentModel = dbMock.define('Payment', paymentInstanceMocks)
jest.mock('api/payment/models.ts', () => {
  return {
    PaymentModel,
  }
})

export const BundleModel = dbMock.define('Bundle', bundleInstanceMocks)
export const BundleCourseModel = dbMock.define('BundleCourse', bundleCourseInstanceMocks)
jest.mock('api/bundle/models.ts', () => {
  return {
    BundleModel,
    BundleCourseModel,
  }
})

export const CourseEnrollmentModel = dbMock.define(
  'CourseEnrollment',
  courseEnrollmentInstanceMocks
)
jest.mock('api/enrollment/models.ts', () => {
  return {
    CourseEnrollmentModel,
  }
})

export const OrganizationSettingsModel = dbMock.define('OrganizationSettings', OrgSettingsModelMock)
jest.mock('api/organization/models.ts', () => {
  return {
    OrganizationSettingsModel,
  }
})

export const TopicModel = dbMock.define('Topic', topicInstanceMocks)
export const SubtopicModel = dbMock.define('Subtopic', subtopicInstanceMocks)
export const CeTypeModel = dbMock.define('Topic', ceTypeInstanceMocks)
jest.mock('api/course-topic/models.ts', () => {
  return {
    TopicModel,
    SubtopicModel,
    CeTypeModel,
  }
})

global.beforeAll(() => {
  // Disallow any external HTTP requests in our unit tests
  nock.disableNetConnect()
  // Allow localhost connections so we can test local routes and mock servers.
  nock.enableNetConnect('127.0.0.1')
})

global.afterAll(() => {
  nock.cleanAll()
  nock.enableNetConnect()
})
