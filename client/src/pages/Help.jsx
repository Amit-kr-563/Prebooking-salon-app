import React, { useState } from "react";
import Navbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const faqs = [
  {
    category: "User",
    question: "How do I find salons near me?",
    answer:
      "Use our search feature to find salons based on your city, gender, and the service you're looking for.",
  },
  {
    category: "User",
    question: "How do I book a time slot?",
    answer:
      "After selecting a salon, choose an available date and time slot to confirm your booking.",
  },
  {
    category: "User",
    question: "Do I need an account to book?",
    answer:
      "Yes, creating an account lets you manage bookings, view history, and save preferences.",
  },
  {
    category: "Salon Owner",
    question: "How do I register my salon?",
    answer:
      "Click on 'Register as Shopkeeper', fill in your salon details, bank info, and upload required documents.",
  },
  {
    category: "Salon Owner",
    question: "How can I manage my bookings?",
    answer:
      "Once logged in, use your dashboard to view upcoming bookings and manage your available slots.",
  },
  {
    category: "Salon Owner",
    question: "Can I edit my salon profile?",
    answer:
      "Yes, you can update your services, photos, and contact details anytime from your profile page.",
  },
];

const Help = () => {
  const [query, setQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      <main className="pt-20 bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-12 text-gray-800">
          <h1 className="text-4xl font-bold text-teal-600 text-center mb-6">
            Help & FAQs
          </h1>

          <div className="mb-10 flex justify-center">
            <input
              type="text"
              placeholder="Search your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-6">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-gray-500">
                No matching FAQs found.
              </p>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-teal-600 mb-2">
                    {faq.category === "User" ? " User" : " Salon Owner"}:{" "}
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-20 text-center border-t pt-8">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-700 mb-2">
              📞 Phone: <span className="font-medium">+91-9523599608</span>
            </p>
            <p className="text-gray-700">
              📧 Email:{" "}
              <span className="font-medium">kumaramitbxr2004@gmail.com</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Help;
