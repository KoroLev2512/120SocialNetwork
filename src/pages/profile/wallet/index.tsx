import { Button } from "@/shared/ui/button";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfileWallet() {
    const earnings = [
        {earned: 123, post: {previewimage: "https://i.pinimg.com/564x/fe/87/c7/fe87c7e92448487771c46a0727036fb0.jpg", description: "Lifestyle, chill, graffity"}},
        {earned: 456, post: {previewimage: "https://i.pinimg.com/564x/58/1e/0e/581e0e73228169539c0063c8cff8b57a.jpg", description: "Graffity, skateboarding"}},
        {earned: 789, post: {previewimage: "https://i.pinimg.com/564x/dd/d6/85/ddd68572bb7ecd995ee53826291905e4.jpg", description: "Music, hip-hop"}}
    ]
    const router = useRouter();
  return (
    <main className="mx-auto flex h-screen w-full max-w-[420px] pt-6 px-10 flex-col items-center bg-[#F7F9FB]">
        <BackButton onClick={() => router.back()} />
        <div className="flex flex-col items-center">
            <p className="text-hugetitle">139 Block</p>
            <p className="text-secondarybody text-black/40">≈0,00178 TON</p>
        </div>
        <Button className="text-body text-white py-4 w-full rounded-[16px] mt-[28px]">Connect Wallet To Withdraw</Button>
        <div className="rounded-[10px] bg-white w-full flex flex-col gap-y-4 p-4 mt-6">
            {earnings.map((i, index) => {
                return(
                    <>
                        <div className="inline-flex items-center gap-x-2.5">
                            <Image src={i.post.previewimage} className="size-10 rounded-[6px]" alt="Image" quality={100} width={40} height={40} />
                            <div className="flex flex-col">
                                <p className="text-secondarybody font-semibold">+{i.earned} Blocks</p>
                                <p className="text-[14px] text-black/40 font-regular tracking-[-0.04em]">{i.post.description}</p>
                            </div>
                        </div>
                        {index < earnings.length - 1 && (
                            <div className="w-full h-[1px] bg-[#C8C7CB]" />
                        )}
                    </>
                )
            })}
        </div>
    </main>
  );
}