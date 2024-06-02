declare global {
  interface Window {
    Telegram: {
      WebApp: {
        expand: () => void;
        setHeaderColor: (string) => void;
      };
    };
  }
}

export {};
