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
    }

}

//сделать по аналогии follow unfollow (Users), auth/me(HeaderContainer), profileCont(?),