import React, { useRef, useEffect } from "react";
import Nav from "../components/Nav";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";
import support1 from "../assets/24s.jpg"
import support2 from "../assets/cs.jpg"
import support3 from "../assets/stylish.jpg"
import Footer from "../components/Footer"

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

            {/* Hero Section */}
            <section id="hero" className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute top-0 left-0 w-[200%] flex animate-scroll-slow"
                    style={{ filter: "blur(0.7px)" }}>
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

                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">Welcome to Salonease</h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl mx-auto text-white">
                        Experience the best haircutting, shaving, massage, and styling services in town.
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded hover:bg-blue-600 transition">
                        Book Now
                    </button>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="w-full py-12 sm:py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-12">Our Services</h2>

                    {/* Men's Services */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-6">Men's Services</h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {[
                                { name: "Haircutting", img: "https://images.unsplash.com/photo-1596464716121-0c8df54ff1eb?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Shaving", img: "https://images.unsplash.com/photo-1611095967902-0f7d52dabe4f?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Styling", img: "https://images.unsplash.com/photo-1600180758895-3f4854aa15c5?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Haircutting", img: "https://images.unsplash.com/photo-1596464716121-0c8df54ff1eb?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Shaving", img: "https://images.unsplash.com/photo-1611095967902-0f7d52dabe4f?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Styling", img: "https://images.unsplash.com/photo-1600180758895-3f4854aa15c5?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                            ].map((service, index) => (
                                <div key={index} className="p-4 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300">
                                    <img src={service.img} alt={service.name} className="w-full h-24 object-cover rounded mb-2" />
                                    <h4 className="text-md sm:text-lg font-semibold">{service.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Women's Services */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-6">Women's Services</h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {[
                                { name: "Haircutting", img: "https://images.unsplash.com/photo-1600180759026-7cf7681f2a1d?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Styling", img: "https://images.unsplash.com/photo-1588776814546-8a8f8b0f8bfc?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Makeup", img: "https://images.unsplash.com/photo-1596464716118-1f0c8cfed9db?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                            ].map((service, index) => (
                                <div key={index} className="p-4 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300">
                                    <img src={service.img} alt={service.name} className="w-full h-24 object-cover rounded mb-2" />
                                    <h4 className="text-md sm:text-lg font-semibold">{service.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Spa & Other Services */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Spa & Other Services</h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {[
                                { name: "Massage", img: "https://images.unsplash.com/photo-1596464716071-fd3a0e38b2e0?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Facial", img: "https://images.unsplash.com/photo-1600180759151-77d072f21b72?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                                { name: "Spa", img: "https://images.unsplash.com/photo-1600180759124-5b8c1d1b5e2b?crop=entropy&cs=tinysrgb&fit=max&h=200&w=300" },
                            ].map((service, index) => (
                                <div key={index} className="p-4 bg-white rounded shadow w-36 sm:w-40 hover:scale-105 transition transform duration-300">
                                    <img src={service.img} alt={service.name} className="w-full h-24 object-cover rounded mb-2" />
                                    <h4 className="text-md sm:text-lg font-semibold">{service.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-12 sm:py-20 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 px-4">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6">About Us</h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            At Salonease, we combine style and comfort to give you the perfect grooming experience.
                            Our team of professionals ensures you leave looking and feeling your best. We focus on quality services,
                            hygiene, and a relaxing ambience for all our customers.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1600180758895-3f4854aa15c5?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600"
                            alt="Salon"
                            className="w-full h-auto rounded shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
<section id="features" className="w-full py-12 sm:py-20 bg-gray-100">
    <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
                {
                    title: "24/7 Availability",
                    desc: "Book appointments anytime, we are always open.",
                    img: support1
                },
                {
                    title: "Customer Support",
                    desc: "Our friendly staff is here to assist you.",
                    img: support2
                },
                {
                    title: "Professional Stylists",
                    desc: "Skilled experts to give you the best style.",
                    img: support3
                },
            ].map((feature, index) => (
                <div key={index} className="p-4 bg-white rounded shadow hover:scale-105 transition transform duration-300">
                    <img src={feature.img} alt={feature.title} className="w-full h-48 mb-4 object-cover rounded-md" />
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
