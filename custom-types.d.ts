interface WebAppInitData {
    query_id: string;
    user: {
        id: number;
        is_bot: boolean;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        photo_url?: string;
    };
    receiver: {
        id: number;
    };
    start_param?: string;
    auth_date: number;
    hash: string;
}

interface WebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

interface WebAppChat {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;
    username?: string;
    all_members_are_administrators?: boolean;
}

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                expand: () => void;
                initData: string;
                initDataUnsafe: WebAppInitData;
                setHeaderColor: (string) => void;
                BackButton: {
                    isVisible: boolean;
                    onClick: (callback: () => void) => void;
                    offClick: (callback: () => void) => void;
                    show: () => void;
                    hide: () => void;
                };
                MainButton: {
                    text: string = 'CONTINUE',
                    color: string = themeParams.button_color,
                    textColor: string = themeParams.button_text_color,
                    isVisible: boolean = false,
                    isActive: boolean = true,
                    isProgressVisible: boolean,
                    setText: (text: string) => void,
                    onClick: (callback: () => void) => void,
                    offClick: (callback: () => void) => void,
                    show: () => void,
                    hide: () => void,
                    enable: () => void,
                    disable: () => void,
                    showProgress: (leaveActive?: boolean) => void,
                    hideProgress: () => void,
                    setParams: (params: {
                        text?: string,
                        color?: string,
                        text_color?: string,
                        is_active?: boolean,
                        is_visible?: boolean
                    }) => void;
                };
            };
        };
    }
}

export {};