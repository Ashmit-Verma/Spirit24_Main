import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './navbar';
import FAQSection from './Faq';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { cover } from 'three/src/extras/TextureUtils.js';

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

  const faqData = [
    { question: "When is the Spirit happening?", answer: "The Spirit will take place from the 24th to the 27th of October" },
    { question: "Who can participate?", answer: "The fest is open to students from colleges and universities." },
    { question: "Can I participate in more than one event?", answer: "Yes, you can participate in multiple events, provided their schedules do not overlap. If the events overlap, managing your participation will be your responsibility." },
    { question: "Are there any eligibility criteria for participation?", answer: "Participants must be currently enrolled in a recognised college or university." },
    { question: "What events are being held?", answer: "Answer to fifth question..." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
        <Navbar/>
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-black p-4 rounded-lg">
  <section
    className="bg-cover overflow-hidden bg-center bg-no-repeat bg-black text-white p-8 rounded-lg flex flex-col items-center justify-center relative"
    style={{ backgroundImage: `url('backgroundBlue.png')`,backgroundSize:cover }}
  >
    <div className="text-center z-10">
      {/* Logo */}
      <img src="logo.png" alt="Spirit Logo" className="mx-auto w-48 md:w-56 lg:w-64" />
      
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase my-16">
        Participate in <br />
        the Largest Sports Festival of <br />
        <span className="text-red-500">North - East India</span>
      </h1>
      
      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-4">
        <a href="/login" className="bg-transparent border-2 border-white px-6 py-2 rounded-full text-white font-semibold text-lg">
          Login
        </a>
      </div>
    </div>
    
    {/* Date Info */}
    <div className="absolute bottom-0 right-0 bg-black text-white rounded-tl-3xl px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
  <h2 className="text-xl md:text-2xl lg:text-4xl leading-tight md:leading-snug lg:leading-normal">
    24th to 27th <br />October
  </h2>
</div>

    
    {/* Dark overlay for better text visibility */}
    <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
  </section>
</div>


        {/* Statistics */}
        <div className="bg-black text-white p-4 md:p-8">
  {/* Image Grid Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    {/* Swimming Image */}
    <div className="relative rounded-lg overflow-hidden">
      <img src="Image1.png" alt="Swimming" className="w-full h-full object-cover" />
    </div>

    {/* Running Image */}
    <div className="relative rounded-lg overflow-hidden">
      <img src="Image2.png" alt="Running" className="w-full h-full object-cover" />
    </div>

    {/* Meet the Mascot */}
    <div className="bg-black border border-white rounded-lg flex items-center justify-center p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center leading-tight">
        Meet the<br />Mascot
      </h2>
    </div>
  </div>

  {/* Statistics Section */}
  <div className="bg-black border border-white rounded-lg p-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-2">
          {/* Number */}
          <div className="text-4xl md:text-5xl font-bold">
            {stat.number}
          </div>
          {/* Label */}
          <div className="text-sm md:text-base">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* FAQ Section */}
        {/* <section className="p-4 md:p-8 bg-white">
  <div className="text-center mb-8">
    <h2 className="text-3xl md:text-5xl font-bold text-white bg-indigo-900 py-4">
      FAQs
    </h2>
  </div>
  {faqData.map((faq, index) => (
    <div
      key={index}
      className={`border ${openFaq === index ? 'text-black' : 'border-gray-300'} border-indigo-900 border-2 text-xl md:text-2xl mb-4 overflow-hidden transition-all duration-300`}
    >
      <button
        className="flex justify-between items-center w-full text-left px-2 py-3 md:px-4 focus:outline-none"
        onClick={() => toggleFaq(index)}
      >
        <span className="font-semibold text-lg md:text-3xl p-2 md:p-5">
          {faq.question}
        </span>
        <span className="text-xl md:text-3xl">
          {openFaq === index ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      {openFaq === index && (
        <p className="bg-indigo-900 px-2 md:px-4 pb-4 text-white text-base md:text-lg">
          {faq.answer}
        </p>
      )}
    </div>
  ))}
</section> */}
<FAQSection/>


        {/* Image Section */}
        <section className="p-4 relative rounded-lg overflow-hidde">
          <img src="Frame.png" alt="Event" className="w-full rounded-lg object-cover" />
        </section>
      </main>

      {/* Footer */}
    <footer className="bg-red-500 text-white p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-sm mb-2 md:mb-0">
            The Annual Sports Fest of IIT Guwahati
          </p>
          <p className="text-sm">
            Copyright © 2023 Spirit, Sports Board, IIT Guwahati<br />
            All rights reserved
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/spirit_iitguwahati/" className="hover:text-gray-200">
            <Instagram size={24} />
          </a>
          <a href="https://www.facebook.com/spiritiitg?sfnsn=wiwspwa&mibextid=RUbZ1f" className="hover:text-gray-200">
            <Facebook size={24} />
          </a>
          <a href="https://www.youtube.com/@spiritiitguwahati2541" className="hover:text-gray-200">
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default SpiritFestival;