import { createEffect } from "effector";
import { ICreateCost, IBaseEffectArgs, IRefreshToken, IDeleteCost } from "../types";
import api from '../api/axiosClient';
import { removeUser } from "../utils/auth";
import { handleAxiosError } from "../utils/errors";

export const createCostFx = createEffect(async ({ url, cost, token}: ICreateCost)=>{
    try {
        const {data} = await api.post(url, { ...cost }, { headers: { 'Authorization': `Bearer ${token}`}});
        return data;
    } catch (e) {
        console.log(e);
    }
});

export const getCostsFx = createEffect(async ({ url, token}: IBaseEffectArgs)=>{
    try {
        const {data} = await api.get(url, { headers: { 'Authorization': `Bearer ${token}`}});
        return data;
    } catch (error) {
       handleAxiosError(error, {type: 'get'})
    }
});

export const refreshTokenFx = createEffect(async ({
    url,
    token,
    username
}: IRefreshToken) => {
    try {
        const result = await api.post(url, {refresh_token: token, username});
        if (result.status === 200) {
            localStorage.setItem('auth', JSON.stringify({
                ...result.data,
                username
            }));
            return result.data.access_token;
        } else {
            removeUser();
        }
    } catch (error) {
        console.log(error);
    }
});

export const deleteCostFx = createEffect(async ({ url, token, costId }: IDeleteCost)=>{
    try {
        await api.delete(`${url}/${costId}`, { headers: { 'Authorization': `Bearer ${token}` }});
    } catch (error) {
        handleAxiosError(error, {type: 'delete', deleteCost: {costId}})
    }
});