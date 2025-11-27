import axios from 'axios'

const baseUrl = '/api'

//axios二次封装核心
class HttpRequest {

    //构造函数初始化
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 获取内部配置
    getInsideConfig() {
        // 定义配置对象
        const config = {
            baseURL: this.baseUrl, // 设置基础URL
            headers: {} // 设置请求头
        }
        return config // 返回配置对象
    }


    interception(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }



    request(options) {  //外部传给axios实例的参数，要和内部的参数合并
        options = { ...this.getInsideConfig(), ...options } // 合并配置对象
        const instance = axios.create()//创建axios实例
        this.interception(instance) //给这个实例绑定拦截器
        return instance(options)  //返回一个配置好的实例
    }

}

const httpRequest = new HttpRequest(baseUrl)
export default httpRequest