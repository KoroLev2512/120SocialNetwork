import { cn } from "@/app/lib/utils";
import IconCamera from "@/shared/assets/icons/IconCamera";
import IconSettings from "@/shared/assets/icons/IconSettings";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavigationBar = () => {
  const router = useRouter();

  return router.pathname != "/" ? (
    <nav className="w-full bg-white border-t border-black/15 py-2.5 px-[54px] justify-between inline-flex items-center sticky bottom-0 max-w-[420px] mx-auto max-h-screen">
      <Link href={"/profile"} className={cn("flex flex-col items-center gap-y-1", router.pathname.startsWith("/profile") ? "text-[#007AFF]" : "text-black/40")}>
        <div className="rounded-full size-[25px] bg-black/40" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">
          Profile
        </p>
      </Link>
      <Link href={"/feed"} className={cn("flex flex-col items-center gap-y-1", router.pathname === "/feed" ? "text-[#007AFF]" : "text-black/40")}>
        <IconCamera className="size-[25px] h-auto" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">
          Feed
        </p>
      </Link>
      <Link href={"/settings"} className={cn("flex flex-col items-center gap-y-1", router.pathname.startsWith("/settings") ? "text-[#007AFF]" : "text-black/40")}>
        <IconSettings className="size-[25px] h-auto" />
        <p className="text-[10px] font-medium tracking-[-0.04em]">
          Settings
        </p>
      </Link>
    </nav>
  ) : null;
};