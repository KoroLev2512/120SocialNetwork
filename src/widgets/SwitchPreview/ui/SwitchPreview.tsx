import { Switch } from "@/shared/ui/switch";

export function SwitchPreview() {
  return (
    <section className="flex flex-col items-start gap-y-4">
      <h1 className="text-title">Switch</h1>
      <div className="inline-flex gap-x-2 items-center">
        <Switch />
        <Switch checked={false} />
        <Switch checked={true} />
      </div>
    </section>
  );
}