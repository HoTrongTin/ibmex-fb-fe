"use client";

import GameDesktop from "@/component/GameDesktop";
import GameMobile from "@/component/GameMobile";
import { isUsingMobile } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import { useEffect, useState } from "react";

export default function Home() {
  const [device, setDevice] = useState<"mobile" | "desktop">();

  useEffect(() => {
    setDevice(isUsingMobile() ? "mobile" : "desktop");
  }, []);

  if (!device) return "loading...";
  if (device === "desktop") return <GameDesktop />;

  return <GameMobile />;
}
