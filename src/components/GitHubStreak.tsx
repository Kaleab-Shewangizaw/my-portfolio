"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LIGHT =
  "background=F4F1EC&stroke=E0DDD8&ring=2D6A65&fire=2D6A65" +
  "&currStreakNum=1A1A1A&sideNums=1A1A1A" +
  "&currStreakLabel=6B6B6B&sideLabels=6B6B6B&dates=6B6B6B";

const DARK =
  "background=0D0D0D&stroke=2A2A2A&ring=5AAAA4&fire=5AAAA4" +
  "&currStreakNum=F0F0F0&sideNums=F0F0F0" +
  "&currStreakLabel=888888&sideLabels=888888&dates=888888";

const BASE = "https://github-readme-streak-stats.herokuapp.com/?user=Kaleab-Shewangizaw&hide_border=true&border_radius=8";

export default function GitHubStreak() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ height: "112px" }} />;

  const src = `${BASE}&${resolvedTheme === "light" ? LIGHT : DARK}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="GitHub contribution streak"
      style={{ width: "100%", display: "block" }}
    />
  );
}
