"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export const TOAST_DURATION = 5000;

export default function AppToaster() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;

    const read = () => {
      const isDark =
        root.getAttribute("data-theme") === "dark" ||
        root.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      position="bottom-right"
      theme={theme}
      richColors
      closeButton
      duration={TOAST_DURATION}
      toastOptions={{ classNames: { toast: "oss-toast" } }}
    />
  );
}