"use client";

import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Cpu, Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList className="h-7">
        <TabsTrigger value="system" className="size-6 p-0">
          <Cpu className="size-4" />
        </TabsTrigger>
        <TabsTrigger value="light" className="size-6 p-0">
          <Sun className="size-4" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="size-6 p-0">
          <Moon className="size-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
