import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AppState} from "../types/dto/app.dto";
import {setCookie} from "nookies";

export const useAppStore = create<AppState>()(devtools(immer((set) => {
    return ({
        backendIsAvailable: null,
        isLoading: false,
        notificationsVisible: true,
        isDarkMode: false,
        toggleNotifications: () => {
            set((state) => ({toggleNotifications: !state.toggleNotifications}));
        },
        toggleDarkMode: (value: boolean) => {
            setCookie(null, "theme", value ? "dark" : "light", {
                path: "/"
            });
            set({isDarkMode: value});
        },
    });
})));
