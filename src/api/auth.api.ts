import { AuthResponse } from 'src/types/auth.type'
import { http } from 'src/utils/httpp'

export const registerUser = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
