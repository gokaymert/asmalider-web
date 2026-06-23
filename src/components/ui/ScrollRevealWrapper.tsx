"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealWrapperProps {
  children: ReactNode;
  selector?: string;
  trigger?: unknown;
}

export default function ScrollRevealWrapper({ children, selector = ".scroll-animate-card", trigger }: ScrollRevealWrapperProps) {
  // Hook'u kullanarak animasyon mantığını bu wrapper içinde çalıştırıyoruz
  useScrollReveal(selector, trigger);

  return <>{children}</>;
}
