import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';
import FAQSection from './Faq';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Slider from 'react-slick'; // Importing react-slick

const SpiritFestival = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { number: '30+', label: 'Events' },
    { number: '2000+', label: 'Participants' },
    { number: '100+', label: 'Colleges' },
    { number: '40K+', label: 'Footfall' },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const carouselImages = ['Image1.png', 'Image2.png', 'Image.jpg', 'Image2.jpg']; // List of carousel images

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    pauseOnHover: true,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[#141414] p-4 rounded-lg">
          <section
            className="overflow-hidden bg-center bg-no-repeat text-white p-16 md:p-126 lg:p-44 rounded-2xl flex flex-col items-center justify-center relative"
            style={{
              backgroundImage: `url('Landing.png')`,
              backgroundSize: 'cover', // Ensure full cover
              backgroundPosition: 'center',
              backgroundColor: 'transparent',
              filter: 'brightness(1) contrast(1) saturate(1.1)', // Adjust values to increase vibrancy
            }}
          >
 <div className="text-center z-10 px-4">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-fireSans uppercase my-8">
    Participate in <br />
    the Largest Sports Festival of <br />
    <span className="">North - East India</span>
  </h1>

  <div className="flex gap-4 justify-center mt-4">
    <a
      href="/login"
      className="bg-transparent border-2 border-white px-6 py-2 rounded-2xl text-white font-semibold text-lg hover:bg-white hover:text-[#141414] transition duration-300 md:px-4 md:py:2 md:text-sm"
    >
      Login
    </a>
  </div>
</div>


          </section>
        </div>

        {/* Statistics */}
        <div className="bg-[#141414] text-white p-4 md:p-8">
          {/* Image Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative rounded-lg overflow-hidden">
              <img src="Image1.png" alt="Swimming" className="w-full h-auto object-cover" />
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img src="Image2.png" alt="Running" className="w-full h-auto object-cover" />
            </div>
            <div className="bg-[#141414] border border-white rounded-lg flex items-center justify-center p-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center leading-tight">
                Meet the<br />Mascot
              </h2>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-[#141414] border font-leagueGothic border-white rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-6xl md:text-8xl font-bold">{stat.number}</div>
                  <div className="text-sm md:text-base lg:text-xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FAQSection />

        {/* Carousel Section */}
        <section className="p-4 relative rounded-lg overflow-hidden max-w-screen-md mx-auto">
          <Slider {...settings}>
            {carouselImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Event ${index}`}
                  className="w-full h-64 md:h-80 lg:h-96 rounded-lg object-cover"
                />
              </div>
            ))}
          </Slider>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default SpiritFestival;
