// TypeScript declarations for GSAP ScrollTrigger
declare global {
  interface Window {
    gsap?: {
      ScrollTrigger?: {
        refresh(): void;
        create(config: any): any;
        batch(targets: any, config: any): any;
        getAll(): any[];
        killAll(): void;
      };
    };
  }
}

export {};
