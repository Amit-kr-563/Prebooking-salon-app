import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
        About Our Salon Booking Platform
      </h1>

      <p className="text-lg text-center max-w-3xl mx-auto mb-10">
        We are revolutionizing the way people find and book salon services near them. Our goal is to connect customers with high-quality salons offering trusted services, all with the convenience of real-time booking.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">For Customers</h2>
          <p className="text-gray-700">
            Say goodbye to waiting in long lines or calling salons for appointments. With our platform, you can:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>Search salons by location, service, and gender</li>
            <li>View salon profiles, ratings, and available time slots</li>
            <li>Book appointments instantly</li>
            <li>Track booking history</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">For Salon Owners</h2>
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

      <div className="text-center mt-12">
      



{/* Team Section */}
<div className="mt-16">
  <h2 className="text-2xl font-semibold text-center text-purple-700 mb-10">Meet the Team</h2>
  <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    
    {/* Member 1 */}
    <div className="bg-purple-50 p-6 rounded-xl shadow-md text-center">
      <img
        src="/amit.jpg"
        alt="Amit Kumar"
        className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-purple-600 shadow-md mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800">Amit Kumar</h3>
      <p className="text-sm text-gray-600">B.Tech CSE | Full Stack Developer</p>
      <p className="mt-2 text-gray-700">
        Passionate about building tech that solves real problems. Lead developer of this project.
      </p>
      <div className="mt-3 text-purple-700 space-x-3 text-xl">
        <a href="https://www.linkedin.com/in/amit-kumar-ab24602a4" target="_blank" rel="noreferrer" className="hover:text-purple-900">LinkedIn</a>
        <a href="https://github.com/Amit-kr-563" target="_blank" rel="noreferrer" className="hover:text-purple-900">GitHub</a>
      </div>
    </div>

    {/* Member 2 */}
    <div className="bg-purple-50 p-6 rounded-xl shadow-md text-center">
      <img
        src="/member2.jpg"
        alt="Rahul Singh"
        className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-purple-600 shadow-md mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800">Rahul Singh</h3>
      <p className="text-sm text-gray-600">B.Tech CSE | UI/UX Designer</p>
      <p className="mt-2 text-gray-700">
        Designed smooth and clean user interfaces to ensure the best user experience.
      </p>
      <div className="mt-3 text-purple-700 space-x-3 text-xl">
        <a href="#" target="_blank" rel="noreferrer" className="hover:text-purple-900">LinkedIn</a>
        <a href="#" target="_blank" rel="noreferrer" className="hover:text-purple-900">GitHub</a>
      </div>
    </div>

    {/* Member 3 */}
    <div className="bg-purple-50 p-6 rounded-xl shadow-md text-center">
      <img
        src="/member3.jpg"
        alt="Sneha Verma"
        className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-purple-600 shadow-md mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800">Sneha Verma</h3>
      <p className="text-sm text-gray-600">B.Tech CSE | Backend Engineer</p>
      <p className="mt-2 text-gray-700">
        Worked on secure APIs and database design to power the booking engine.
      </p>
      <div className="mt-3 text-purple-700 space-x-3 text-xl">
        <a href="#" target="_blank" rel="noreferrer" className="hover:text-purple-900">LinkedIn</a>
        <a href="#" target="_blank" rel="noreferrer" className="hover:text-purple-900">GitHub</a>
      </div>
    </div>

  </div>
</div>

{/* Contact Us Section */}
<div className="mt-20 text-center bg-white py-10 border-t border-gray-200">
  <h2 className="text-2xl font-bold text-purple-700 mb-4">Contact Us</h2>
  <p className="text-gray-700 mb-2">📞 Phone: <span className="font-medium">+91-9523599608</span></p>
  <p className="text-gray-700">📧 Email: <span className="font-medium">kumaramitbxr2004@gmail.com</span></p>
</div>





        <h3 className="text-xl font-semibold text-purple-600">Built for comfort. Powered by technology.</h3>
        <p className="text-gray-600 mt-2">Join us and experience salon booking like never before.</p>
      </div>
    </div>
  );
};

export default AboutUs;
