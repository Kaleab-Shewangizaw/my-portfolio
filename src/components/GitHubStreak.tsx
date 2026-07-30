"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LIGHT =
  "background=F5F0E8&stroke=D5CCBF&ring=A8652E&fire=A8652E" +
  "&currStreakNum=1A1410&sideNums=1A1410" +
  "&currStreakLabel=6B5F55&sideLabels=6B5F55&dates=6B5F55";

const DARK =
  "background=080808&stroke=1E1915&ring=D97E3A&fire=D97E3A" +
  "&currStreakNum=EDE9E1&sideNums=EDE9E1" +
  "&currStreakLabel=8A7F76&sideLabels=8A7F76&dates=8A7F76";

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
