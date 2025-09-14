import React from "react";
import Navbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      <main className="pt-20 bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-12 text-gray-800">
          <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">
            Terms of Service
          </h1>

          <section className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
            <p>
              Welcome to our Salon Booking Platform. By using our services, you
              agree to abide by the terms and conditions outlined below. Please
              read them carefully.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                1. Account Responsibility
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                login credentials. You agree not to share your account with
                others and to notify us immediately of any unauthorized use.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                2. Booking Policy
              </h2>
              <p>
                Users must arrive on time for booked appointments. Failure to
                show up or cancel in time may result in penalties or temporary
                suspension of booking privileges.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                3. Salon Owner Guidelines
              </h2>
              <p>
                Salon owners must provide accurate details about their shop,
                services, and pricing. Misleading information may lead to
                removal from the platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                4. Prohibited Activities
              </h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Using the platform for illegal or harmful purposes</li>
                <li>Harassing or abusing other users or owners</li>
                <li>Attempting to interfere with system security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                5. Data & Privacy
              </h2>
              <p>
                We respect your privacy. Personal data is collected only to
                enhance your experience and will not be sold to third parties.
                For more, read our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                6. Changes to Terms
              </h2>
              <p>
                We reserve the right to update these terms at any time.
                Continued use of the platform after changes implies your
                acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                7. Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding these terms,
                feel free to contact us at:
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

export default TermsOfService;
