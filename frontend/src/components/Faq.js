import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openFaq, setOpenFaq] = useState({});

  const faqData = [
    {
      category: "General Information",
      questions: [
        {
          question: "When is the Spirit happening?",
          answer: "The Spirit will take place from the 24th to the 27th of October."
        },
        {
          question: "Who can participate?",
          answer: "The fest is open to students from colleges and universities."
        },
        {
          question: "Can I participate in more than one event?",
          answer: "Yes, you can participate in multiple events, provided their schedules do not overlap. If the events overlap, managing your participation will be your responsibility."
        },
        {
          question: "Are there any eligibility criteria for participation?",
          answer: "Participants must be currently enrolled in a recognised college or university."
        }
      ]
    },
    {
      category: "Registration & Confirmation",
      questions: [
        {
          question: "How can I register?",
          answer: "Before registering, please review the Rulebook. Once you have done so, you can proceed to the \"Registration\" section of the website."
        },
        {
          question: "What is the last date for registration?",
          answer: "The deadline for registration is the 15th of October."
        },
        {
          question: "How will I know if my registration is confirmed?",
          answer: "After successfully completing the registration process, you will receive a confirmation via email."
        }
      ]
    },
    {
      category: "Events & Schedule",
      questions: [
        {
          question: "What sports are included in the fest?",
          answer: "The fest will feature a variety of sports, including football, basketball, volleyball, cricket, athletics, and more. The full list can be found on the \"Events\" page."
        },
        {
          question: "Where can I find the schedule of events?",
          answer: "The event schedule will be available on the \"Event Schedule\" page of the app and will be updated regularly."
        },
        {
          question: "Will there be both team-based and individual events?",
          answer: "Yes, the fest will include both team-based and individual events. Details for each can be found on the \"Events\" page."
        },
        {
          question: "Are there any prizes for winners?",
          answer: "Yes, winners in various categories will be awarded trophies, medals, Goodies and cash prizes."
        }
      ]
    },
    {
      category: "Rules & Conduct",
      questions: [
        {
          question: "What are the rules for each sport?",
          answer: "Rules for each sport are available on the respective event pages. We adhere to the standard rules of each sport, with modifications if necessary."
        },
        {
          question: "What are the code of conduct and behaviour guidelines?",
          answer: "All participants and attendees are expected to demonstrate sportsmanship, discipline, and respect toward referees and fellow participants. Misconduct may result in disqualification."
        }
      ]
    },
    {
      category: "Facilities & Accommodation",
      questions: [
        {
          question: "Are there accommodations for out-of-town participants?",
          answer: "Yes, limited accommodations are available. For more details, please contact the Public Relations team."
        }
      ]
    },
    {
      category: "Contact Information",
      questions: [
        {
          question: "Whom should I contact for more information?",
          answer: "For general inquiries, feel free to contact us at: publicrelation.spirit@gmail.com"
        }
      ]
    }
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenFaq({});
  };

  const toggleFaq = (categoryIndex, questionIndex) => {
    setOpenFaq(prev => ({
      ...prev,
      [categoryIndex]: prev[categoryIndex] === questionIndex ? null : questionIndex
    }));
  };

  return (
    <section className="p-4 md:p-8 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white bg-indigo-900 py-4">
          FAQs
        </h2>
      </div>
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <button
            className="w-full text-left px-4 py-3 bg-indigo-900 text-white text-xl md:text-2xl font-semibold focus:outline-none flex justify-between items-center"
            onClick={() => toggleCategory(categoryIndex)}
          >
            <span>{category.category}</span>
            <span>{openCategory === categoryIndex ? <ChevronUp /> : <ChevronDown />}</span>
          </button>
          {openCategory === categoryIndex && (
            <div className="border border-indigo-900 border-t-0">
              {category.questions.map((faq, questionIndex) => (
                <div key={questionIndex} className="border-t border-indigo-900">
                  <button
                    className="flex justify-between items-center w-full text-left px-4 py-3 focus:outline-none"
                    onClick={() => toggleFaq(categoryIndex, questionIndex)}
                  >
                    <span className="font-semibold text-lg md:text-xl">{faq.question}</span>
                    <span>{openFaq[categoryIndex] === questionIndex ? <ChevronUp /> : <ChevronDown />}</span>
                  </button>
                  {openFaq[categoryIndex] === questionIndex && (
                    <p className="px-4 pb-4 text-base md:text-lg">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;