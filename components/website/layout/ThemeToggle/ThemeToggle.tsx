"use client";

import { useTheme } from "@/app/providers/ThemeProvider"; // Path apne project ke hisab se adjust karein
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={18} className={styles.icon} />
      ) : (
        <Sun size={18} className={styles.icon} />
      )}
    </button>
  );
}
