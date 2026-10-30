"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/website/layout/ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Current path detect karne ke liye hook
  const pathname = usePathname();

  // Scrolled state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu open ho to background scroll band
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Helper function: check karega ke link active hai ya nahi
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          
          {/* LEFT SIDE: Logo */}
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logo} aria-label="OSS Consulting home">
              <Image
                src="/logo/logo.webp"
                alt="OSS Consulting"
                width={180}
                height={40}
                className={styles.logoImage}
                priority
              />
            </Link>
          </div>

          {/* CENTER: Nav Links */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive(link.href) ? styles.navLinkActive : ""
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE: Theme Toggle + CTA + Mobile Toggle */}
          <div className={styles.headerRight}>
            <div className={styles.themeToggleWrapper}>
              <ThemeToggle />
            </div>

            <Link href="/contact" className={styles.ctaButton}>
              Let&apos;s Talk <ArrowUpRight size={14} strokeWidth={2.4} />
            </Link>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}>
        <div className={styles.mobileNavHeader}>
          <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
            <Image
              src="/logo/logo.webp"
              alt="OSS Consulting"
              width={160}
              height={36}
              className={styles.logoImage}
            />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.mobileNavLinksWrapper}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                isActive(link.href) ? styles.mobileNavLinkActive : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link href="/contact" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
          Let&apos;s Talk
        </Link>
      </div>
    </>
  );
}