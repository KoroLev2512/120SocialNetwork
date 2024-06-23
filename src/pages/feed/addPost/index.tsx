import { ChangeEvent, useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import AddIcon from "@/shared/assets/icons/AddIcon";

import BackButton from "@/shared/ui/backbutton";
import MainButton from "@/shared/ui/mainbutton";

import { useRouter } from "next/router";
import { DefaultInput } from "@/shared/ui/input";
import Image from "next/image";
import { InputTags } from "@/shared/ui/taginput";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl, FormField,
  FormItem, FormMessage
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { addPost } from "@/shared/api/posts/add";

const formSchema = z.object({
  image: z.string().min(1),
  description: z.array(z.string()).min(1),
  link: z.string().min(1),
});

export default function WelcomePage() {
  const router = useRouter();
  const [image, addImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      description: [],
      link: "",
    },
  });

  const ImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const imageURL = e.target?.result as string | null;
      addImage(imageURL);
      form.setValue('image', imageURL || "");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    addImage(null);
    form.setValue('image', "");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addPost(values)
  }

  return (
    <main className="flex h-screen w-full flex-col items-center bg-app_gray_light-100 dark:bg-app_gray_dark-300">
      <BackButton onClick={() => router.back()} />
      <div className="flex flex-col items-center py-[24px]">
        <h1 className="text-title font-bold">Add up to photo</h1>
      </div>
      <Form {...form}>
        <form
          className="w-full relative items-center flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative flex mx-auto justify-center w-full">
                    {image ? (
                      <div className="relative">
                        <Image
                          className="object-cover aspect-square max-w-[350px] rounded-[14px]"
                          width={512}
                          height={512}
                          src={image}
                          alt="Uploaded image"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute bg-white top-3 right-3 rounded-full p-1.5"
                        >
                          <Cross2Icon className="text-app_gray_light-300" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer w-full mx-auto max-w-[350px] min-h-[350px] flex flex-col"
                      >
                        <div className="flex w-full flex-col bg-app_gray_light-200 dark:bg-app_gray_dark-100 rounded-[14px] max-w-[350px] min-h-[350px]">
                          <div className="inline-flex w-full h-full items-center justify-center px-[40px] py-[14px]">
                            <AddIcon />
                            <input
                              {...field}
                              type="file"
                              id="imageUpload"
                              onChange={ImageUpload}
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col gap-y-4 mt-6">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputTags
                      label="Description"
                      max={3}
                      onChange={(newTagsString) => {
                        setTags(newTagsString);
                        field.onChange(newTagsString);
                      }}
                      value={tags}
                      placeholder="Add a tag"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DefaultInput
                      {...field}
                      placeholder="https://"
                      className="text-app_blue dark:text-app_blue"
                      label="URL to the post"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button type="submit">submit from pc</button>
          <MainButton
            onClick={form.handleSubmit(onSubmit)}
            text="Publish"
            color="#0098EA"
          />
        </form>
      </Form>
    </main>
  );
}