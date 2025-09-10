import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="bg-[#f4f1fb] text-gray-700 px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-3">
            <div className="bg-purple-800 text-white w-10 h-10 flex items-center justify-center rounded-md font-bold text-lg">
              M
            </div>
            <h1 className="text-xl font-semibold">Project</h1>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Seamlessly navigate through our services. Your journey starts here.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h2 className="font-semibold mb-3">Important Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>

            <li><a href="#" className="hover:underline">My Booking</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
           <li><Link to="/help" className="hover:underline">Help</Link></li>

          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>

           <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>

            <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>

          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="font-semibold mb-3">Connect</h2>
          <div className="flex space-x-4 text-purple-800 text-xl">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-300 pt-5 text-center text-sm text-gray-500">
        © 2025 Project. All rights reserved.
      </div>
    </footer>
  );
}
