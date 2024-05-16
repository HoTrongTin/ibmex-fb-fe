import { IGift, IMyScore } from "@/model/game";
import { IRedemGift } from "@/model/gift";
import { IRanking } from "@/model/ranking";
import { ISession, IWhoAmI } from "@/model/user";
import LocalStore, { LOCAL_STORAGE } from "@/service/localStore";
import axios from "axios";
const apiBase = axios.create();

apiBase.interceptors.request.use((config) => {
    const session = LocalStore.getItem<ISession>(LOCAL_STORAGE.SESSION);

    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session?.access_token}`;
    }

    return config;
});

apiBase.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error);
    }
);

const login = async (data: any) => {
    const res = await apiBase.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, data);
    return res.data as {
        access_token: string;
    };
};

const whoami = async () => {
    const res = await apiBase.get(`${process.env.NEXT_PUBLIC_SERVER}/auth/whoami`);
    return res.data as IWhoAmI;
};

const logScore = async (data: { score: number }) => {
    const res = await apiBase.post(`${process.env.NEXT_PUBLIC_SERVER}/game/score`, data);
    return res.data;
};

const getScore = async () => {
    const res = await apiBase.get(`${process.env.NEXT_PUBLIC_SERVER}/game/score`);
    return res.data as IMyScore;
};

const getGift = async () => {
    const res = await apiBase.get(`${process.env.NEXT_PUBLIC_SERVER}/game/gift`);
    return res.data as IGift[];
};

const getRanking = async (params: any) => {
    const res = await apiBase.get(`${process.env.NEXT_PUBLIC_SERVER}/game/leaderboard`, { params });
    return res.data as IRanking[];
};

const redeemGift = async () => {
    const res = await apiBase.post(`${process.env.NEXT_PUBLIC_SERVER}/game/gift/redeem`);
    return res.data as IRedemGift
};

const api = {
    login,
    whoami,
    logScore,
    getScore,
    getGift,
    getRanking,
    redeemGift
};

export default api;
