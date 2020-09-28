import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "47abf291-5646-442e-a8b1-279217d07bf7"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const usersAPI = {
    getUsers(currentPage=1, pageSize=10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    auth() {
        return instance.get(`auth/me`)
    },
    profile(userId: number) {
        return instance.get(`profile/`+userId)
    }

}
