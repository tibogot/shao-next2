import { useEffect } from "react";

/**
 * Hook to refresh ScrollTrigger when content loads
 * Call this after async content has loaded to recalculate positions
 */
export function useScrollTriggerRefresh(dependencies: any[] = []) {
  useEffect(() => {
    // Check if ScrollTrigger is available (in case GSAP is loaded)
    if (typeof window !== "undefined" && window.gsap?.ScrollTrigger) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        window.gsap?.ScrollTrigger?.refresh();
      }, 100);
    }
  }, dependencies);
}

// Alternative: Manual refresh function you can call anytime
export function refreshScrollTrigger() {
  if (typeof window !== "undefined" && window.gsap?.ScrollTrigger) {
    window.gsap?.ScrollTrigger?.refresh();
  }
}
