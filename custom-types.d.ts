declare global {
  interface Window {
    Telegram: {
      WebApp: {
        expand: () => void;
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
          setParams: (params: { text?: string, color?: string, text_color?: string, is_active?: boolean, is_visible?: boolean }) => void;
        };
      };
    };
  }
}

export {};
