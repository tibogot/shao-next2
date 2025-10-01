"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function LogoFlipAnimation() {
  useGSAP(() => {
    let flipCtx: gsap.Context | undefined;

    const createAnimations = () => {
      flipCtx && flipCtx.revert();

      flipCtx = gsap.context(() => {
        const logoElement = document.querySelector(".floating-logo");
        const navLogoElement = document.querySelector(".navlogo");

        if (!logoElement) return;

        // 1. Create the beautiful floating animation (like Bourii)
        const floatingTimeline = gsap.timeline({ repeat: -1, yoyo: true });

        floatingTimeline
          .to(logoElement, {
            y: -15,
            duration: 2.5,
            ease: "power2.inOut",
          })
          .to(
            logoElement,
            {
              rotation: 0.5,
              duration: 1.8,
              ease: "power2.inOut",
            },
            "<0.3",
          )
          .to(
            logoElement,
            {
              scale: 1.02,
              duration: 2,
              ease: "power2.inOut",
            },
            "<0.5",
          );

        // 2. Add subtle breathing effect
        gsap.to(logoElement, {
          opacity: 0.9,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        // 3. Logo flip animation to navbar (existing functionality improved)
        if (navLogoElement) {
          const logoRect = logoElement.getBoundingClientRect();
          const navRect = navLogoElement.getBoundingClientRect();

          const deltaX =
            navRect.left +
            navRect.width / 2 -
            (logoRect.left + logoRect.width / 2);
          const deltaY =
            navRect.top +
            navRect.height / 2 -
            (logoRect.top + logoRect.height / 2);
          const scaleX = navRect.width / logoRect.width;
          const scaleY = navRect.height / logoRect.height;

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top 20%",
              end: "bottom 40%",
              scrub: 1,
              onEnter: () => {
                // Pause floating animation during scroll
                floatingTimeline.pause();
              },
              onLeaveBack: () => {
                // Resume floating animation when back to top
                floatingTimeline.play();
              },
            },
          });

          scrollTimeline.to(logoElement, {
            x: deltaX,
            y: deltaY,
            scaleX: scaleX,
            scaleY: scaleY,
            rotation: 0,
            opacity: 1,
            ease: "power2.inOut",
          });
        }

        // 4. Add mouse interaction (subtle hover effect)
        const logoContainer = document.querySelector(
          ".floating-logo-container",
        );
        if (logoContainer) {
          logoContainer.addEventListener("mouseenter", () => {
            gsap.to(logoElement, {
              scale: 1.05,
              rotation: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          });

          logoContainer.addEventListener("mouseleave", () => {
            gsap.to(logoElement, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          });
        }
      });
    };

    createAnimations();

    // Handle resize
    const handleResize = () => createAnimations();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      flipCtx && flipCtx.revert();
    };
  }, []);

  return null;
}
