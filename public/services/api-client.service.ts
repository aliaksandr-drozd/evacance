import Axios, { Axios as AxiosClass } from 'axios'
import { Service } from 'typedi'


const axiosInstance = Axios.create({
  url: process.env.API_SERVER,
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
