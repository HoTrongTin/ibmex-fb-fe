import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import useFappyBird from "./useFlappyBird";
import useAuthStore from "@/store/useAuthStore";

const useScore = () => {
    const { setMaxScore } = useFappyBird(true);
    const { userInfo } = useAuthStore()

    const scoreQuery = useQuery({
        queryKey: ["getScore", userInfo?.user?.id],
        queryFn: async () => {
            const score = await api.getScore();
            if (score.maxScore) {
                setMaxScore(score.maxScore);
            }
            return score;
        },
    });

    return scoreQuery
}

export default useScore