import axios from 'axios'
import useAuthStore from '@/store/authStore'

const baseURL = '/api'

const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshRes = await axios.get(`${baseURL}/refreshToken`, {
          withCredentials: true,
        })

        const newAccessToken = refreshRes.data.accessToken

        useAuthStore.getState().actionSetToken(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().actionClearAuth()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
