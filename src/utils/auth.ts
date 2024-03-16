import { setCosts } from "../context";
import { setAlert } from "../context/alert";
import { setAuth, setUsername } from "../context/auth";
import { IAlert } from "../types";

export const handleAlertMessage = (alert: IAlert) => {
    setAlert(alert);
    setTimeout(() => setAlert({
        alertText: '',
        alertStatus: '',
    }), 5000)
}

export const removeUser = () => {
    localStorage.removeItem('auth');
    setAuth(false);
    setUsername('');
    setCosts([]);
}

export const getAuthDataFromLs = () => {
    try {
        const lsData = JSON.parse(localStorage.getItem('auth') as string);
        if (!lsData) {
            removeUser();
            return;
        }
        return lsData;
    } catch (e) {
        console.log(e);
        removeUser();
    }
}