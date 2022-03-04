import Axios, { Axios as AxiosClass } from 'axios'
import { Service } from 'typedi'


const axiosInstance = Axios.create({
  baseURL: process.env.API_SERVER,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
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
