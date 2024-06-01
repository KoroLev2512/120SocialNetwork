"use client";

import dynamic from "next/dynamic";

export const WebAppProvider = dynamic(
  () =>
    import("@zakarliuka/react-telegram-web-tools").then(
      (v) => v.WebAppProvider,
    ),
  {
    ssr: false,
  },
);
