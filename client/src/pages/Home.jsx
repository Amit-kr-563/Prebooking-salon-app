import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";
import support1 from "../assets/24s.jpg";
import support2 from "../assets/cs.jpg";
import support3 from "../assets/stylish.jpg";
import service1 from "../assets/haircut.jpg";
import service2 from "../assets/shaving.jpg";
import service3 from "../assets/color.jpg";
import service4 from "../assets/massage.jpg";
import service5 from "../assets/spa.jpg";
import service6 from "../assets/facial.jpg";
import wservice1 from "../assets/w-cut.jpg";
import wservice2 from "../assets/mehndi.jpg";
import wservice3 from "../assets/wface.jpg";
import wservice4 from "../assets/wpedi.jpg";
import wservice5 from "../assets/wspa.jpg";
import wservice6 from "../assets/wcolor.jpg";
import oservice1 from "../assets/tatto.jpg";
import oservice2 from "../assets/ob.jpg";
import oservice3 from "../assets/gm.jpg";
import about from "../assets/ab.jpg";
import Footer from "../components/Footer";

const Home = () => {
  const scrollRef = useRef(null);
  const images = [hero1, hero2, hero3, hero4, hero5];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1;
    const delay = 20;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Nav />
      <section
        id="hero"
        className="w-full h-[92vh] relative flex flex-col justify-center items-center overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 w-[200%] flex animate-scroll-slow"
          style={{ filter: "blur(0.7px)" }}
        >
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`hero${index + 1}`}
              className="w-1/5 h-screen object-cover flex-shrink-0"
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

        <div className="relative z-20 text-center px-4 ">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Welcome to SalonEase
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl mx-auto text-white font-bold">
            Experience the best haircutting, shaving, massage, and styling
            services in town.
          </p>
          <Link to="/login">
            {" "}
            <button
              type="button"
              class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            >
              Book Now
            </button>
          </Link>{" "}
        </div>
      </section>
      <div className="w-full bg-red-600 text-white text-sm sm:text-base py-2 overflow-hidden relative">
        <div className="whitespace-nowrap animate-scroll text-center font-bold">
          <span className="mx-6">50% OFF on first booking!</span>
          <span className="mx-6">Get free beard trimming this weekend!</span>
          <span className="mx-6">Book a package & enjoy spa benefits!</span>
          <span className="mx-6">Refer a friend and earn discounts!</span>
          <span className="mx-6">Special grooming offers available now!</span>
        </div>
      </div>

      <section id="services" className="w-full py-12 sm:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12">
            Our Services
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Men's Services</h3>
            <div className="flex justify-center gap-4 flex-wrap ">
              {[
                { name: "Haircutting", img: service1 },
                { name: "Shaving", img: service2 },
                { name: "Hair-color", img: service3 },
                { name: "Hair-Spa", img: service5 },
                { name: "Facial", img: service6 },
                { name: "Massages", img: service4 },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300 flex flex-col"
                >
                  <div className="w-full h-40 sm:h-48 overflow-hidden rounded mb-2">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-md sm:text-lg font-semibold text-center">
                    {service.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Women's Services</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { name: "Haircutting", img: wservice1 },
                { name: "Mehndi", img: wservice2 },
                { name: "Hair-color", img: wservice6 },
                { name: "Hair-spa", img: wservice5 },
                { name: "Facial", img: wservice3 },
                { name: "Pedicure", img: wservice4 },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300 flex flex-col"
                >
                  <div className="w-full h-40 sm:h-48 overflow-hidden rounded mb-2">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-md sm:text-lg font-semibold text-center">
                    {service.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Other Services</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { name: "Bridal-Makeup", img: oservice2 },
                { name: "Groom-Makeup", img: oservice3 },
                { name: "Tattoo", img: oservice1 },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300 flex flex-col"
                >
                  <div className="w-full h-40 sm:h-48 overflow-hidden rounded mb-2">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-md sm:text-lg font-semibold text-center">
                    {service.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 px-4">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              About Us
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-semibold">
              “Welcome to <strong className="text-red-600">SalonEase</strong>,
              your one-stop destination for connecting customers with the best
              salons and beauty services nearby. Our platform is designed to
              make booking salon services quick, simple, and hassle-free. For
              users, we offer an easy way to browse through trusted salons, view
              available services, and schedule appointments at their
              convenience. For salon owners, we provide tools to manage
              bookings, showcase services, and grow their business with a wider
              customer base. We believe beauty and self-care should be
              accessible to everyone. With{" "}
              <strong className="text-red-600">SalonEase</strong>, you can find
              the right service, at the right time, with the best professionals
              — all in one place.”
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={about}
              alt="Salon"
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 sm:py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-10">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "24/7 Availability",
                desc: "Now you can book salon services anytime, anywhere. Our platform is available 24/7 to make sure you never miss out on looking and feeling your best.",
                img: support1,
              },
              {
                title: "Customer Support",
                desc: "Our dedicated customer support team is always ready to help you. Whether you have a question or need assistance, we’re here to ensure a smooth and hassle-free experience.",
                img: support2,
              },
              {
                title: "Professional Stylists",
                desc: "Work with expert stylists who are trained, certified, and passionate about delivering the best beauty services tailored to your style and needs.",
                img: support3,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded shadow hover:scale-105 transition transform duration-300"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-48 mb-4 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
