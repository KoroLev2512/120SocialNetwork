import { Switch } from "@/shared/ui/switch";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        const Theme = resolvedTheme === "light" ? "dark" : "light"
        const HeaderColor = Theme === "light" ? "#F7F9FB" : "#111111";
        
        setTheme(Theme)
        window.Telegram.WebApp.setHeaderColor(HeaderColor)
    };

    return (
        <Switch onClick={toggleTheme} checked={resolvedTheme === "dark"} />
    );
}

export default ThemeSwitch;