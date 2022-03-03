import Axios, { Axios as AxiosClass } from 'axios'
import { Service } from 'typedi'


const axiosInstance = Axios.create({
  baseURL: '/api',
  withCredentials: true,
})

@Service<ApiClientService>()
export class ApiClientService extends AxiosClass {
  constructor() {
    super()

    this.defaults = {
      ...this.defaults,
      ...axiosInstance.defaults,
    }
  }
}
