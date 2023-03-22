import axios from 'axios'
import qs from 'qs'


const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8'
const contentTypeJson = 'application/json'
const contentTypeFile = 'multipart/form-data'

// 封装axios请求
const request = (config) => {
  let { url, params, dataType } = config
  params = params || {}
  dataType = dataType == undefined ? 'form' : dataType
  let contentType = contentTypeForm

  if (dataType == 'form') {
    //表单
    params = qs.stringify(params);
  } else if (dataType == 'json') {
      //json
      contentType = contentTypeJson;
  } else if (dataType == 'file') {
      //上传文件
      contentType = contentTypeFile;
      let param = new FormData();// 创建form对象
      /*  param.append('file', params.file);
      param.append(); */
      for (let key in params) {
          param.append(key, params[key]);
      }
      params = param;
  }

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',       /* ajax请求 */
    'contentType': contentType
  }
  
  // 创建axios实例
  const service = axios.create({
    baseURL: '/api',      /* 请求地址 */
    timeout: 10000,
    headers: headers
  })
  
  // 请求拦截器
  service.interceptors.request.use((config) => {
    return config
  }, (error) => {
    console.log(error);
    return Promise.reject(error)
  })

  // 响应拦截器
  service.interceptors.response.use((response) => {
    // 响应状态码2xx  处理响应数据
    // console.log(response.data);
    const responseData = response.data
    if(responseData.code == 200) {
      return responseData
    }

  }, (error) => {

    return Promise.reject('网络异常')

  })

  // 发送post请求
  return service.post(url, params).catch((error) => {
    return null
  })
}


export default request