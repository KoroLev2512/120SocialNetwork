import React, {useMemo} from "react";

export const NavigationBar = () => {
    return (
        <main className="flex flex-col fixed items-end min-w-[50px] bg-amber-300">
            Profile
            Feed
            Settings
        </main>
    );
}
