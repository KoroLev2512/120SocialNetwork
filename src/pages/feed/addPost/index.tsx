import { ChangeEvent, useState } from "react";
import AddIcon from "@/shared/assets/icons/AddIcon";
import { DefaultInput } from "@/shared/ui/input";
import BackButton from "@/shared/ui/backbutton";
import { useRouter } from "next/router";
import MainButton from "@/shared/ui/mainbutton";
import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { InputTags } from "@/shared/ui/taginput";

//todo: integrate shadcn forms

export default function WelcomePage() {
    const router = useRouter();
    const [image, addImage] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);

    const ImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return

        const reader = new FileReader();
    
        reader.onload = (e) => {
            const imageURL = e.target?.result as string | null;
            addImage(imageURL);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        addImage(null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const post = {
            tags,
            image
        };

        const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        allPosts.push(post);
        localStorage.setItem('posts', JSON.stringify(allPosts));
        router.push("/feed")
    }

    return (
        <main className="flex h-screen w-full flex-col items-center bg-app_gray_light-100 dark:bg-app_gray_dark-300">
            <BackButton onClick={() => router.back()} />
            <div className="flex flex-col items-center py-[24px]">
                <h1 className="text-title font-bold">Add up to 3 photos</h1>
            </div>
            <form className="w-full relative items-center flex flex-col" onSubmit={handleSubmit}>
                <div className="relative flex mx-auto justify-center w-full">
                {image ? (
                    <div className="relative">
                        <Image className="object-cover aspect-square max-w-[350px] rounded-[14px]" width={512} height={512} src={image} alt="test" />
                        <button type="button" onClick={removeImage} className="absolute bg-white top-3 right-3 rounded-full p-1.5">
                            <Cross2Icon className="text-app_gray_light-300" />
                        </button>
                    </div>
                ) : (
                    <label htmlFor="imageUpload" className="cursor-pointer w-full mx-auto max-w-[350px] min-h-[350px] flex flex-col">
                        <div className="flex w-full flex-col bg-app_gray_light-200 dark:bg-app_gray_dark-100 rounded-[14px] max-w-[350px] min-h-[350px]">
                            <div className="inline-flex w-full h-full items-center justify-center px-[40px] py-[14px]">
                                <AddIcon />
                                <input type="file" id="imageUpload" onChange={ImageUpload} accept="image/*" style={{ display: "none" }} />
                            </div>
                        </div>
                    </label>
                )}
                </div>
                <div className="w-full flex flex-col gap-y-4 mt-6">
                    <InputTags
                        label="Description"
                        max={3}
                        value={tags}
                        onChange={setTags}
                        placeholder="Add a tag"
                    />
                    <DefaultInput placeholder="https://" className="text-app_blue" label="URL to the post" />
                </div>
                <MainButton onClick={() => handleSubmit} text="Publish" color="#0098EA" />
                <button type="submit">test</button>
            </form>
        </main>
    );
};