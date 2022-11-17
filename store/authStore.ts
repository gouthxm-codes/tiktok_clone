import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const url = 'http://localhost:3000'

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],

    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),

    fetchUsers: async () => {
        const res = await axios.get(`${url}/api/users`)

        set({ allUsers: res.data })
    }

})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;