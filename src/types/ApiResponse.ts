export interface AuthApiResponse<T = any> {
  success: boolean
  message: string
  data: T | null
  timestamp?: string
}

export interface AuthResponse {
  token: string
  username: string
  expiresAt: string
  issuedAt: string
  issuer: string
}
