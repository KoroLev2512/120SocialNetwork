import { ExternalLinkIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";
import IconTon from "@/shared/assets/icons/IconTon";

export function ButtonsPreview() {
  return (
    <section className="flex flex-col items-start gap-y-4">
      <h1 className="text-title">Buttons</h1>
      <Button className="w-full">Large Button</Button>
      <Button className="w-full">
        <PlusIcon className="size-6" /> Large Button & Icon
      </Button>
      <Button size={"sm"}>
        <IconTon className="size-5" /> Connect Wallet
      </Button>
      <Button variant={"link"} size={"none"}>
        Link <ExternalLinkIcon className="size-4" />
      </Button>
      <Button variant={"underline"} size={"none"}>
        Idek hows that called, underline I guess
      </Button>
    </section>
  );
}
