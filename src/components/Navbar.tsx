"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "../store/cartStore";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Wishlist from "./Wishlist"; // DISABLED: Wishlist feature temporarily disabled
import { useAuth } from "../contexts/AuthContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const [isScrolled, setIsScrolled] = useState(false); // Always start with false to prevent flash
  const [isNavbarReady, setIsNavbarReady] = useState(false); // Track when navbar should be visible

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  // Handle scroll blocking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Block scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when menu closes
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Get authentication state
  const { session, isAuthenticated } = useAuth();

  // Reset states when navigating to home page
  useEffect(() => {
    if (isHomePage) {
      setIsScrolled(false);
    }
    // Always reset navbar ready state for clean initialization
    setIsNavbarReady(false);
  }, [isHomePage]);

  // Track scroll position
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only apply scroll behavior on home page
    if (isHomePage) {
      // Change navbar style when scrolled past hero section (100vh)
      const heroHeight =
        typeof window !== "undefined" ? window.innerHeight : 800;
      setIsScrolled(latest > heroHeight * 0.8); // Trigger at 80% of hero height
    }
  });

  // Set initial navbar state after mount to prevent flash
  useEffect(() => {
    if (!isHomePage) {
      // On non-home pages, set to scrolled state after a brief delay
      const timer = setTimeout(() => {
        setIsScrolled(true);
        setIsNavbarReady(true);
      }, 50); // Small delay to prevent flash
      return () => clearTimeout(timer);
    } else {
      // On home page, delay ready state to ensure logo animation sets up first
      const timer = setTimeout(() => {
        setIsNavbarReady(true);
      }, 300); // Longer delay to ensure GSAP sets up first
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  useEffect(() => {
    // Only apply GSAP animation on home page AND desktop
    if (!isHomePage) {
      // On non-home pages, show logo in normal navbar state
      if (logoRef.current) {
        gsap.set(logoRef.current, {
          y: 0,
          scale: 1,
          filter: "brightness(0)", // Black for navbar
          opacity: 1,
          visibility: "visible",
        });
      }
      return;
    }

    // Check if mobile - if so, show static logo and skip GSAP
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // On mobile, show logo in navbar position but make it responsive to scroll
      if (logoRef.current) {
        // Check if we're at the top of the page for mobile logo color
        const isAtTop = window.scrollY < window.innerHeight * 0.8;

        gsap.set(logoRef.current, {
          y: 0,
          scale: 1,
          filter: isAtTop ? "brightness(1)" : "brightness(0)", // White on hero, black when scrolled
          opacity: 1,
          visibility: "visible",
        });

        // Add scroll listener for mobile logo color changes
        const handleMobileScroll = () => {
          if (logoRef.current) {
            const isAtTop = window.scrollY < window.innerHeight * 0.8;
            gsap.set(logoRef.current, {
              filter: isAtTop ? "brightness(1)" : "brightness(0)",
            });
          }
        };

        window.addEventListener("scroll", handleMobileScroll);

        // Cleanup scroll listener
        return () => {
          window.removeEventListener("scroll", handleMobileScroll);
        };
      }
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const setupAnimation = () => {
      if (!logoRef.current) return;

      // Calculate hero position relative to navbar
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate how far to move logo to center of screen
      const heroY = viewportHeight / 2; // Center of viewport
      const navbarCenter =
        logoRef.current.getBoundingClientRect().top +
        logoRef.current.offsetHeight / 2;
      const distanceToHero = heroY - navbarCenter;

      // Calculate safe logo scale that never goes out of screen
      const logoElement = logoRef.current.querySelector("img");
      const logoNaturalWidth = logoElement ? logoElement.offsetWidth : 116; // Fallback to SVG width
      const logoNaturalHeight = logoElement ? logoElement.offsetHeight : 39; // Fallback to SVG height

      // Calculate maximum scale that fits within viewport with padding
      const horizontalPadding = 80; // 40px each side on desktop
      const verticalPadding = 160; // More padding for navbar and bottom

      const maxWidthScale =
        (viewportWidth - horizontalPadding) / logoNaturalWidth;
      const maxHeightScale =
        (viewportHeight - verticalPadding) / logoNaturalHeight;

      // Use the smaller scale to ensure logo fits completely within viewport
      const maxSafeScale = Math.min(maxWidthScale, maxHeightScale);

      // Set minimum scale and cap at safe maximum
      const heroScale = Math.max(2.5, Math.min(maxSafeScale, 6));

      // Kill existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Set initial state (logo at hero position)
      gsap.set(logoRef.current, {
        y: distanceToHero,
        scale: heroScale,
        filter: "brightness(1)", // White for hero
        opacity: 1,
        visibility: "visible",
      });

      // Create timeline to animate back to navbar position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: `top -${viewportHeight * 0.8}px`, // End at 80% of viewport
          scrub: 1.2,
          // @ts-ignore
          onComplete: () => {
            // Ensure final state
            gsap.set(logoRef.current, {
              y: 0,
              scale: 1,
              filter: "brightness(0)", // Black for navbar
            });
          },
        },
      });

      // Animate from hero back to navbar
      tl.to(logoRef.current, {
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        logoRef.current,
        {
          filter: "brightness(0)", // Change to black
          duration: 0.1,
          ease: "none",
        },
        0.9, // Near the end
      );
    };

    // Setup initial animation
    setupAnimation();

    // Handle window resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setupAnimation, 150);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isHomePage]);

  return (
    <motion.nav
      className="font-neue-montreal fixed top-0 right-0 left-0 z-40 flex w-full items-center justify-between overflow-visible px-4 py-4 md:px-8 md:py-6"
      data-nextjs-scroll-focus-boundary
      initial={{ opacity: 0 }} // Start completely hidden
      animate={{
        backgroundColor:
          isScrolled && isNavbarReady
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0)",
        backdropFilter:
          isScrolled && isNavbarReady ? "blur(10px)" : "blur(0px)",
        opacity: isNavbarReady ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        opacity: {
          duration: 0.6, // Longer, smoother fade-in
          ease: "easeOut",
        },
      }}
      style={{
        color: isScrolled ? "#000000" : "#ffffff",
      }}
    >
      {/* Mobile Hamburger - Left */}
      <motion.button
        className="flex cursor-pointer flex-col gap-1 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        animate={{
          color: isScrolled ? "#000000" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Desktop Left side - Navigation Links (hidden on mobile) */}
      <div className="hidden items-center gap-12 md:flex">
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/shop"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            SHOP
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/collection"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            COLLECTION
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/about"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            ABOUT US
          </Link>
        </motion.div>
      </div>

      {/* Center - Logo with GSAP animation */}
      <div
        ref={logoRef}
        className="pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 transform overflow-visible opacity-0"
        style={{ visibility: "hidden", width: "max-content" }}
      >
        <Link
          href="/"
          className="pointer-events-auto flex cursor-pointer items-center overflow-visible"
        >
          <div
            className="flex items-center justify-center overflow-visible"
            style={{ width: "116px", height: "39px" }}
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={116}
              height={39}
              className="h-6 w-auto object-cover md:h-8"
              // priority
              // style={{ maxWidth: "none" }}
            />
          </div>
        </Link>
      </div>

      {/* Right side - Cart (mobile), Search/Account/Cart (desktop) */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile - Only Cart */}
        <motion.button
          type="button"
          className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors md:hidden ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          onClick={openCart}
          aria-label="Open cart"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          CART({items.length})
        </motion.button>

        {/* Desktop - All actions */}
        <motion.button
          type="button"
          className={`font-neue-montreal-mono hidden cursor-pointer text-sm transition-colors md:block ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          aria-label="Search"
          onClick={() => setIsSearchOpen(true)}
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          SEARCH
        </motion.button>
        {/* DISABLED: Wishlist feature temporarily disabled */}
        {/* <motion.div
          className="hidden md:block"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Wishlist />
        </motion.div> */}
        {/* Account Section - Shows different content based on auth status */}
        <motion.div
          className="hidden md:block"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {isAuthenticated ? (
            <Link
              href="/account"
              className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
                isScrolled ? "hover:text-black/60" : "hover:text-white/60"
              }`}
              aria-label="Account"
            >
              Hi,{" "}
              {session?.user?.name ||
                session?.user?.email?.split("@")[0] ||
                "User"}
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
                isScrolled ? "hover:text-black/60" : "hover:text-white/60"
              }`}
              aria-label="Sign In"
            >
              SIGN IN
            </Link>
          )}
        </motion.div>
        <motion.button
          type="button"
          className={`font-neue-montreal-mono hidden cursor-pointer text-sm transition-colors md:block ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          onClick={openCart}
          aria-label="Open cart"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          CART({items.length})
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/30"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="fixed top-0 left-0 h-svh w-full bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-black">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <svg
                    className="h-6 w-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex flex-col p-6">
                {/* Navigation Links */}
                <div className="mb-8 space-y-6">
                  <Link
                    href="/shop"
                    className="font-neue-montreal-mono block text-lg text-black transition-colors hover:text-black/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    SHOP
                  </Link>
                  <Link
                    href="/collection"
                    className="font-neue-montreal-mono block text-lg text-black transition-colors hover:text-black/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    COLLECTION
                  </Link>
                  <Link
                    href="/about"
                    className="font-neue-montreal-mono block text-lg text-black transition-colors hover:text-black/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ABOUT US
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    className="font-neue-montreal-mono block w-full text-left text-base text-black/70 transition-colors hover:text-black"
                    aria-label="Search"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    SEARCH
                  </button>
                  <button
                    type="button"
                    className="font-neue-montreal-mono block w-full text-left text-base text-black/70 transition-colors hover:text-black"
                    onClick={() => {
                      openCart();
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Open cart"
                  >
                    CART({items.length})
                  </button>
                  {/* DISABLED: Wishlist feature temporarily disabled */}
                  {/* <button
                    type="button"
                    className="font-neue-montreal-mono block w-full text-left text-base text-black/70 transition-colors hover:text-black"
                    onClick={() => {
                      if ((window as any).openWishlist) {
                        (window as any).openWishlist();
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Open wishlist"
                  >
                    WISHLIST
                  </button> */}
                  {/* Mobile Account Section */}
                  {isAuthenticated ? (
                    <Link
                      href="/account"
                      className="font-neue-montreal-mono block text-base text-black/70 transition-colors hover:text-black"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hi,{" "}
                      {session?.user?.name ||
                        session?.user?.email?.split("@")[0] ||
                        "User"}
                    </Link>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="font-neue-montreal-mono block text-base text-black/70 transition-colors hover:text-black"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      SIGN IN
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.nav>
  );
}
