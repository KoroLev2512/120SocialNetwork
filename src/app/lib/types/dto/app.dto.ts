export type AppState = {
    backendIsAvailable: boolean | null;
    isLoading: boolean;
    notificationsVisible: boolean;
    isDarkMode: boolean;
    toggleNotifications: () => void;
    toggleDarkMode: (value: boolean) => void;
}
