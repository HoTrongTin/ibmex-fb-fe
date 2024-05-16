import api from "@/api";
import { ISession } from "@/model/user";
import LocalStore, { LOCAL_STORAGE } from "@/service/localStore";
import useAuthStore from "@/store/useAuthStore";

const useAuth = () => {
    const { update } = useAuthStore();
    const { userInfo } = useAuthStore()

    const fetUserData = async () => {
        const session = LocalStore.getItem<ISession>(LOCAL_STORAGE.SESSION);
        if (!session?.access_token) return;

        const whoamiData = await api.whoami();
        update(whoamiData);
        LocalStore.setItem(LOCAL_STORAGE.USER_INFO, whoamiData);
    };

    return { fetUserData, userInfo }
}

export default useAuth