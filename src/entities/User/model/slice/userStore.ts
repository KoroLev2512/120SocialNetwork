import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import axios from "@/shared/api/axios";
import {UserStore} from "@/entities/User/types/userState";
import {UserApiPaths} from "@/entities/User/consts/apiPaths";

// type PostData = {
//     name: string;
//     email: string;
// };

export const useUserStore = create<UserStore>()(
    devtools(
        immer((set) => ({
            user: null,
            error: null,
            getUser: async () => {
                try {
                    const {data} = await axios.get(UserApiPaths.GET_ME);
                    set({user: data});
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    set({user: null, error: error?.response});
                }
            },
            // editUser: async (postData:PostData) => {
            //     try {
            //         await axios.put(UserApiPaths.UPDATE_USER, postData);
            //         set({user: null});
            //         getStore().getUser();
            //     } catch (error) {
            //         set({user: null, error: error as string});
            //     }
            // },
        })),
    ),
);
