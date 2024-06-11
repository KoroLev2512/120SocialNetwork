import {useRouter} from "next/router";
import {SettingsGroup} from "..";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {BackButton} from "@zakarliuka/react-telegram-web-tools";
import Action from "@/shared/ui/action";
import {SecondaryInput} from "@/shared/ui/input";
import {AvatarIcon} from "@/app/lib/icons/AvatarIcon";

export default function SettingsProfile() {
    const router = useRouter();

    return (
        <main
            className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 max-w-[420px] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
            <BackButton onClick={() => router.back()}/>
            <h1 className="text-largetitle text-center">Profile Settings</h1>
            <div className="flex flex-col gap-y-3 items-center">
                <AvatarIcon height={96} width={96} rotation={0}/>
                <div className="px-4 py-1.5 inline-flex gap-x-1 items-center rounded-full bg-app_ton">
                    <p className="text-secondarybody font-semibold text-white">
                        0xd75Evn534f...
                    </p>
                    <svg
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.35875 1.00382C1.91043 0.556018 1.18357 0.556018 0.735257 1.00382C0.286942 1.45162 0.286942 2.17765 0.735257 2.62545L6.47517 8.35878C6.92348 8.80659 7.65034 8.80659 8.09866 8.35878L13.8386 2.62545C14.2869 2.17765 14.2869 1.45162 13.8386 1.00382C13.3903 0.556018 12.6634 0.556018 12.2151 1.00382L7.28691 5.92634L2.35875 1.00382Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
            <SettingsGroup>
                <Action title="Change Profile Picture"
                        leftElement={<PhotoIcon className="size-[28px] text-app_blue"/>}/>
                <SecondaryInput label="Username" placeholder="@shawnwx"/>
            </SettingsGroup>
        </main>
    );
}
