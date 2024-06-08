import { Switch } from "@/shared/ui/switch";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <Switch onClick={toggleTheme} checked={resolvedTheme === "dark"} />
    );
}

export default ThemeSwitch;