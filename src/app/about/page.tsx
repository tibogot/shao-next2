import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
            We're passionate about creating exceptional digital experiences that
            connect people and transform businesses.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="mb-4 text-gray-600">
                Founded with a vision to bridge the gap between innovative
                technology and meaningful user experiences, we've been dedicated
                to crafting digital solutions that make a real difference.
              </p>
              <p className="mb-4 text-gray-600">
                Our journey began with a simple belief: that great design and
                cutting-edge technology should work together to solve real-world
                problems and create value for businesses and their customers.
              </p>
              <p className="text-gray-600">
                Today, we continue to push the boundaries of what's possible,
                always keeping our users at the heart of everything we do.
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 p-8">
              <div className="text-center">
                <div className="mb-4 text-4xl">🚀</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Innovation First
                </h3>
                <p className="text-gray-600">
                  We embrace new technologies and methodologies to deliver
                  cutting-edge solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">💡</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly explore new technologies and approaches to deliver
                exceptional results that exceed expectations.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">🤝</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and open communication to
                achieve remarkable outcomes together.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 text-3xl">⚡</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Excellence
              </h3>
              <p className="text-gray-600">
                We're committed to delivering the highest quality in every
                project, paying attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The talented individuals behind our success
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Alex Johnson
              </h3>
              <p className="mb-2 text-blue-600">Founder & CEO</p>
              <p className="text-gray-600">
                Passionate about creating digital experiences that make a
                difference in people's lives.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Sarah Chen
              </h3>
              <p className="mb-2 text-blue-600">Head of Design</p>
              <p className="text-gray-600">
                Believes that great design is the perfect balance between beauty
                and functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            To empower businesses and individuals through innovative digital
            solutions that are beautiful, functional, and accessible to
            everyone.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Ready to Work Together?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Let's create something amazing together. Get in touch with us today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700">
              Get In Touch
            </button>
            <Link
              href="/flip-test2"
              className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
            >
              View GSAP Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
