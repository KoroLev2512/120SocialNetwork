import { cn } from "@/app/lib/utils";
import { CogIcon, CameraIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavigationBar = () => {
  const router = useRouter();

  return router.pathname != "/" && router.pathname != "/feed/addPost" ? (
    <nav className="w-full bg-white border-t dark:bg-app_gray_dark-300 dark:border-app_gray_dark-100 border-black/15 py-2.5 px-[54px] justify-between inline-flex items-center fixed left-0 bottom-0 max-w-[420px] mx-auto">
      <Link
        href={"/profile"}
        className={cn(
          "flex flex-col items-center gap-y-1",
          router.pathname.startsWith("/profile")
            ? "text-app_blue"
            : "text-app_gray_light-300",
        )}
      >
        {/* позже сделать чтобы иконка менялась в случае если у юзера есть аватарка */}
        <UserCircleIcon className="size-8" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">Profile</p>
      </Link>
      <Link
        href={"/feed"}
        className={cn(
          "flex flex-col items-center gap-y-1",
          router.pathname === "/feed" ? "text-app_blue" : "text-app_gray_light-300",
        )}
      >
        <CameraIcon className="size-8" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">Feed</p>
      </Link>
      <Link
        href={"/settings"}
        className={cn(
          "flex flex-col items-center gap-y-1",
          router.pathname.startsWith("/settings")
            ? "text-app_blue"
            : "text-app_gray_light-300",
        )}
      >
        <CogIcon className="size-8" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">Settings</p>
      </Link>
    </nav>
  ) : null;
};
