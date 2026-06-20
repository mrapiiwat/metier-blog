import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from '@/lib/axios/admin'
import { AxiosResponse } from 'axios'

export interface userSchema {
  id: string
  username: string
  name: string
}

export interface formLogin {
  username: string
  password: string
}

export interface AuthStore {
  user: userSchema | null
  token: string | null
  actionSetUser: (user: userSchema | null) => void
  actionSetToken: (token: string) => void
  actionClearAuth: () => void
  actionLogin: (form: formLogin) => Promise<AxiosResponse>
  actionLogout: () => Promise<AxiosResponse>
}

const authStore: StateCreator<AuthStore> = (set) => ({
  user: null,
  token: null,
  actionSetUser: (user) => {
    set({ user })
  },
  actionSetToken: (token) => {
    set({ token })
  },

  actionClearAuth: () => {
    set({ user: null, token: null })
    useAuthStore.persist.clearStorage()
  },
  actionLogin: async (form: formLogin) => {
    const res = await axios.post('/login', form)
    const token = res.data.accessToken
    set({ token })
    const userRes = await axios.get('/me')
    set({ user: userRes.data })
    return res
  },
  actionLogout: async () => {
    const res = await axios.post('/logout')
    set({
      user: null,
      token: null,
    })
    useAuthStore.persist.clearStorage()
    return res
  },
})

const usePersist = {
  name: 'auth',
  getStorage: () => createJSONStorage(() => sessionStorage),
}

const useAuthStore = create(persist(authStore, usePersist))

export default useAuthStore
