import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'
import { path } from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      // timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const { url } = res.config
        if (url === path.login || url === path.register) {
          const data = res.data as AuthResponse
          this.accessToken = data.data.access_token
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return res
      },
      function (error: AxiosError) {
        let message
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          message = data.message || error.message
          toast.error(message, {
            position: 'bottom-left'
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

export const http = new Http().instance
