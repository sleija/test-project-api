import Mixpanel from 'mixpanel'
import config from '../config'

const mixpanel = Mixpanel.init(config.mixpanel.token, {
  debug: config.mixpanel.debugMode,
  api_host: config.mixpanel.apiHost,
})

export default mixpanel
