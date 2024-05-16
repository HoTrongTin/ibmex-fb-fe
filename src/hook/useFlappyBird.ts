import api from "@/api";
import { IGameOver } from "@/model/game";
import useConfirmStore from "@/store/useConfirmStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useAuth from "./useAuth";

const useFappyBird = (notListen = false) => {
    const confirmStore = useConfirmStore();
    const queryClient = useQueryClient();
    const { fetUserData } = useAuth()

    const logScoreMutation = useMutation({
        mutationFn: async (payload: number) => {
            try {
                const res = await api.logScore({ score: payload });
                return res;
            } catch (error) {
                console.log("error: ", error);
            }
        },
    });

    const redeemGiftMutation = useMutation({
        mutationFn: () => {
            return api.redeemGift()
                .then(res => {
                    fetUserData()
                    return res
                })
                .catch(err => {
                    if (err?.response?.data?.message) {
                        alert(err?.response?.data?.message)
                    }
                })
        }
    });

    useEffect(() => {
        if (notListen) return
        window.addEventListener("message", async function (e) {
            const data = e.data as IGameOver;

            if (data.message.includes('flappy_')) {
                console.log('data.message: ', data);
            }

            if (data?.message === "flappy_game_over") {
                await logScoreMutation.mutate(data.curr);
                queryClient.invalidateQueries({ queryKey: ["getRanking"] });
                queryClient.invalidateQueries({ queryKey: ["getScore"] });
                confirmStore.update(true);
            }

            if (data?.message === "flappy_playing") {
                confirmStore.update(false);
            }
        });

        return () => {
            document.body.removeEventListener("keydown", () => { });
            window.removeEventListener("message", () => { });
        };
    }, []);

    const setMaxScore = (value: number) => {
        const elm: any = document.getElementById("flappy_bird_iframe");
        elm.contentWindow.postMessage({ message: "set_best", best: value }, "*");
    };

    const continuePlay = () => {
        const elm: any = document.getElementById("flappy_bird_iframe");
        elm.contentWindow.postMessage({ message: "continue_play", }, "*");
    }

    return { setMaxScore, showConfirm: confirmStore.open, redeemGiftMutation, continuePlay };
};

export default useFappyBird;
