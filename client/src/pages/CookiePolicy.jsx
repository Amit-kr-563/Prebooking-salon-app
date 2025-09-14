import React from "react";
import Navbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const CookiePolicy = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      <main className="pt-20 bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-12 text-gray-800">
          <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">
            Cookie Policy
          </h1>

          <section className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
            <p>
              This Cookie Policy explains how our salon booking platform uses
              cookies and similar technologies to improve your experience and
              ensure secure interactions.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your device when
                you visit a website. They help us remember your preferences and
                improve how the site works.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                2. Types of Cookies We Use
              </h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <strong>Essential Cookies:</strong> Required for core
                  functionality like logging in or booking slots.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand user
                  behavior using analytics.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Save your preferences
                  (e.g., language, gender selection).
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> May be used for embedded
                  content (like maps or payment gateways).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                3. How We Use Cookies
              </h2>
              <p>We use cookies to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Authenticate users and manage sessions</li>
                <li>Save search filters and form inputs</li>
                <li>Analyze site usage for performance improvements</li>
                <li>Provide a smoother, more personalized experience</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                4. Managing Cookies
              </h2>
              <p>
                Most browsers allow you to control cookie settings. You can
                choose to block or delete cookies through your browser settings.
                However, disabling cookies may affect site functionality.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                5. Changes to This Policy
              </h2>
              <p>
                We may update this Cookie Policy occasionally. Any changes will
                be posted on this page with an updated date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                6. Contact Us
              </h2>
              <p>
                For questions about our use of cookies, contact us:
                <br />
                📧{" "}
                <span className="text-teal-600">
                  kumaramitbxr2004@gmail.com
                </span>
                <br />
                📞 <span className="text-teal-600">+91-9523599608</span>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CookiePolicy;
