import appConfigs from '../configs'
import Request from './request'

/**
 * 创建项目前生成id
 */
export const post_base_getids = (params) => Request(appConfigs.urlWebHttp + "/base/getids", params, 'GET');