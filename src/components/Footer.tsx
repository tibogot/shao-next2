"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FBFBFB] px-4 pt-12 pb-6 md:px-8 md:pt-16 md:pb-8">
      <div>
        {/* Main footer content */}
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:justify-between">
          {/* Links Block - Left Side */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {/* SHOP Section */}
            <div>
              <h3 className="font-neue-montreal-mono mb-4 text-xs font-medium tracking-wider text-black uppercase md:mb-6 md:text-sm">
                SHOP
              </h3>
              <ul className="space-y-2 md:space-y-1">
                <li>
                  <a
                    href="/products"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* LEARN Section */}
            <div>
              <h3 className="font-neue-montreal-mono mb-4 text-xs font-medium tracking-wider text-black uppercase md:mb-6 md:text-sm">
                LEARN
              </h3>
              <ul className="space-y-2 md:space-y-1">
                <li>
                  <a
                    href="/shop"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/results"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Results
                  </a>
                </li>
                <li>
                  <a
                    href="/journal"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Journal
                  </a>
                </li>
              </ul>
            </div>

            {/* SOCIAL MEDIA Section */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-neue-montreal-mono mb-4 text-xs font-medium tracking-wider text-black uppercase md:mb-6 md:text-sm">
                SOCIAL MEDIA
              </h3>
              <ul className="space-y-2 md:space-y-1">
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@shao.com"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    info@shao.com
                  </a>
                </li>
              </ul>
            </div>

            {/* DEMOS Section */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-neue-montreal-mono mb-4 text-xs font-medium tracking-wider text-black uppercase md:mb-6 md:text-sm">
                DEMOS
              </h3>
              <ul className="space-y-2 md:space-y-1">
                {/* REMOVED: Flip Test pages */}
                <li>
                  <a
                    href="/demo"
                    className="font-neue-montreal text-xs text-black/70 transition-colors hover:text-black md:text-sm"
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section - Right Side */}
          <div className="mt-4 flex-shrink-0 md:mt-0 lg:max-w-md">
            <h3 className="font-neue-montreal-mono mb-4 text-xs font-medium tracking-wider text-black uppercase md:mb-6 md:text-sm">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="font-neue-montreal mb-4 max-w-md text-xs text-black/70 md:mb-6 md:text-sm">
              Stay updated with our latest product launches, skincare tips, and
              exclusive offers. Join our community of conscious beauty
              enthusiasts.
            </p>
            <form className="max-w-md space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="font-neue-montreal w-full border-b border-black/20 bg-transparent pb-2 text-xs text-black placeholder-black/50 focus:border-black focus:outline-none md:text-sm"
              />
              <button
                type="submit"
                className="font-neue-montreal w-full bg-black px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black/80 md:px-6 md:py-3 md:text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-black/10 md:my-12"></div>

        {/* Bottom section with logo and copyright */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:items-end md:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Shao"
              width={116}
              height={39}
              className="h-16 w-auto object-contain brightness-0 md:h-20 lg:h-24"
            />
          </div>

          {/* Copyright */}
          <p className="font-neue-montreal text-xs text-black/60 md:text-sm">
            © 2025 | Shao.
          </p>
        </div>
      </div>
    </footer>
  );
}
