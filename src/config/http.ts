import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export type HttpResponse = AxiosPromise
export default { get: ({ url, config }: { url: string, config?: AxiosRequestConfig }): AxiosPromise => axios.get(url, config) };
