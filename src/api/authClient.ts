import { setAuth } from '../context/auth';
import api from './axiosClient';

export class AuthClient {
    static async login(username: string, password: string) {
        try {
            const result = await api.post('/auth/login', {username, password})
            console.log(result);
            if (result.status === 200) {
                setAuth(true);
                localStorage.setItem('auth', JSON.stringify(result.data));
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    }
}