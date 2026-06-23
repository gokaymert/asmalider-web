"use client";

import { useEffect } from "react";

export function useScrollReveal(selector: string = ".scroll-animate-card", trigger?: unknown) {
  useEffect(() => {
    let delayCounter = 0;
    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        let intersected = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersected = true;
            // Ekrana aynı anda giren kartlar için artan bir gecikme süresi
            setTimeout(() => {
              if (entry.target instanceof HTMLElement) {
                entry.target.classList.remove("opacity-0", "translate-y-12");
                entry.target.classList.add("opacity-100", "translate-y-0");
              }
            }, delayCounter * 150);

            delayCounter++;
            observer.unobserve(entry.target);
          }
        });

        // Aynı anda ekrana girenlerin batch işlemi bittikten kısa süre sonra sayacı sıfırla
        if (intersected) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            delayCounter = 0;
          }, 100);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Aşağıdan 50px kala tetikle
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [selector, trigger]);
}
