import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Img1 from "../assets/profile.jpg";
import Img2 from "../assets/Img2.jpg";
import Img3 from "../assets/Img3.jpg";
import Img4 from "../assets/img4.jpg";
import Img5 from "../assets/img5.jpg";
import Img6 from "../assets/img6.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <UserNavbar />
      </div>

      <main className="pt-20 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          About Our Salon Booking Platform
        </h1>

        <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-10">
          We are revolutionizing the way people find and book salon services
          near them. Our goal is to connect customers with high-quality salons
          offering trusted services, all with the convenience of real-time
          booking.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-teal-600">
              For Customers
            </h2>
            <p className="text-gray-700">
              Say goodbye to waiting in long lines or calling salons for
              appointments. With our platform, you can:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Search salons by location, service, and gender</li>
              <li>View salon profiles, ratings, and available time slots</li>
              <li>Book appointments instantly</li>
              <li>Track booking history</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-teal-600">
              For Salon Owners
            </h2>
            <p className="text-gray-700">
              We help salon owners grow their business by:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Getting listed on a trusted platform</li>
              <li>Receiving online bookings without hassle</li>
              <li>Managing schedules and customer info efficiently</li>
              <li>Increasing visibility and customer base</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-600 mb-8">
          Meet the Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-4xl mx-auto mb-10">
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img2}
              alt="Amit Kumar"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">Amit Kumar</h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech CSE | Full Stack Developer
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Passionate about building tech that solves real problems. Lead
              developer of this project.
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="https://www.linkedin.com/in/amit-kumar-ab24602a4"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Amit-kr-563"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img1}
              alt="Aj"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Ajay Kumar Singh
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech CSE | Frontend Developer
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Designed smooth and clean user interfaces to ensure the best user
              experience.
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img3}
              alt="Sneha Verma"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">Ujjwal Kumar</h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech CSE | Backend Developer
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Worked on secure APIs and database design to power the booking
              engine.
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-4xl mx-auto mb-10">
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img4}
              alt="Sanjeev Kumar"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">Sanjeev Kumar</h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech EE | Team Leader
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Passionate team leader who motivates and supports the team to
              achieve goals, solve challenges, and deliver high-quality results
              through effective communication and collaboration.{" "}
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="https://www.linkedin.com/in/amit-kumar-ab24602a4"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Amit-kr-563"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img5}
              alt="Aj"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">Zainab Firdous</h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech CSE | Frontend Developer
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Designed smooth and clean user interfaces to ensure the best user
              experience.
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <img
              src={Img6}
              alt="Sneha Verma"
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-600 shadow-md mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800">Sumit Kumar</h3>
            <p className="text-sm text-gray-600 mb-2">
              B.Tech CSE | Data Analyst
            </p>
            <p className="text-gray-700 text-sm mb-3">
              Driven data analyst and team leader who helps the team uncover
              insights, solve problems, and make data-driven decisions through
              collaboration, accurate analysis, and effective communication.{" "}
            </p>
            <div className="text-teal-600 space-x-3 text-lg">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-800"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="text-center bg-white p-6 rounded-xl shadow-md border-t border-gray-200 max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-bold text-teal-600 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            📞 Phone: <span className="font-medium">+91-9523599608</span>
          </p>
          <p className="text-gray-700">
            📧 Email:{" "}
            <span className="font-medium">kumaramitbxr2004@gmail.com</span>
          </p>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-teal-600">
            Built for comfort. Powered by technology.
          </h3>
          <p className="text-gray-600 mt-2">
            Join us and experience salon booking like never before.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
