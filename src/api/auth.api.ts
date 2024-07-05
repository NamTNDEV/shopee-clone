import { AuthResponse } from 'src/types/auth.type'
import { http } from 'src/utils/http'

const AuthApi = {
  register(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}

export default AuthApi
