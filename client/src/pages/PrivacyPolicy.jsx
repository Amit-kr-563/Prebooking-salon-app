import React from "react";
import Navbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      <main className="pt-20 bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-12 text-gray-800">
          <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">
            Privacy Policy
          </h1>

          <section className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
            <p>
              We are committed to protecting your personal information. This
              Privacy Policy explains how we collect, use, and safeguard your
              data while using our salon booking platform.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <strong>Personal Info:</strong> Name, mobile number, gender,
                  etc. (during registration)
                </li>
                <li>
                  <strong>Salon Info:</strong> Shop name, address, services,
                  etc. (for salon owners)
                </li>
                <li>
                  <strong>Booking Data:</strong> Selected service, time slot,
                  salon details
                </li>
                <li>
                  <strong>Device Info:</strong> IP address, browser type, etc.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                2. How We Use Your Data
              </h2>
              <p>We use your data to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Provide and improve booking services</li>
                <li>Send appointment confirmations and alerts</li>
                <li>Display personalized content</li>
                <li>Ensure account security and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                3. Data Sharing
              </h2>
              <p>
                We do <strong>not sell</strong> your personal data. We only
                share your details with:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Salon owners (for confirmed bookings)</li>
                <li>Service providers (for technical or analytical support)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                4. Data Security
              </h2>
              <p>
                We use encryption, secure servers, and strong password practices
                to protect your data from unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                5. Your Choices
              </h2>
              <p>
                You can update or delete your account data at any time by
                logging in. If you face issues, contact our support team.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                6. Children's Privacy
              </h2>
              <p>
                Our platform is not intended for users under the age of 13. We
                do not knowingly collect data from children.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this policy as needed. Please check this page
                periodically. Continued use of the platform means you accept the
                changes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                8. Contact Us
              </h2>
              <p>
                For any questions regarding this privacy policy, contact us at:
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

export default PrivacyPolicy;
