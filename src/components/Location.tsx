/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MapPin, Compass, ShieldCheck, ChevronDown, ChevronUp, Info, ExternalLink } from "lucide-react";

interface TimelineMarker {
  name: string;
  distance: string;
  iconName: "falls" | "plane" | "town" | "park";
  duration: string;
  description: string;
}

const PLACES: TimelineMarker[] = [
  {
    name: "Victoria Falls National Park Rainforest Entrance",
    distance: "3.5 km",
    iconName: "falls",
    duration: "5-min drive",
    description: "Witness pristine rainforest lookouts, basalt gorges, and the breathtaking column spray of the Smoke That Thunders."
  },
  {
    name: "Elephant's Walk Artisans Village & Cafés",
    distance: "2.1 km",
    iconName: "town",
    duration: "4-min ride",
    description: "Premium local hand carvings, organic espresso cafes, and bespoke galleries featuring beautiful tapestries."
  },
  {
    name: "Zambezi National Park Wilderness Gates",
    distance: "6.2 km",
    iconName: "park",
    duration: "8-min drive",
    description: "Launch private game viewing drives for elephants, lions, buffaloes, and abundant local birdlife."
  },
  {
    name: "Victoria Falls International Airport (VFA)",
    distance: "19.5 km",
    iconName: "plane",
    duration: "20-min airport transfer",
    description: "Seamless door-to-door transfer in our private clean sedan directly from the airport arrival gates."
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Is there private parking and physical security on-site?",
    answer: "Yes, our estate sits in an upscale, gated perimeter. We provide complimentary secure parking with 24/7 private physical guards, biometric door access, and automated security monitoring for absolute peace of mind."
  },
  {
    question: "How close is the estate to Victoria Falls and can we walk?",
    answer: "We are located exactly 3.5 km (a 5-minute drive/ride) from the falls rainforest boundary. While walking is possible, we provide complimentary road bicycles on request, and our personal butler can arrange instant tuk-tuk or Mercedes dispatches."
  },
  {
    question: "Does each studio have private air-conditioning and digital workspaces?",
    answer: "Absolutely. Each of our eight residences features silent high-capacity split air-conditioning, complimentary ultra-fast Wi-Fi, premium designer desks, and multiple international power ports tailored for digital tasks."
  },
  {
    question: "How do we coordinate local safaris and helicopter bookings?",
    answer: "Our in-house digital planner and personal butler desk take complete care of this. You can pre-map your preferred adventures using our 'Build My Stay' interactive compiler or message our concierge to handle ticketing and transfers."
  }
];

export default function Location() {
  const [activePlace, setActivePlace] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (    <section id="location" className="py-28 bg-white text-black relative border-b border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header in HERITAGE style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-[#00C853] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              <MapPin className="h-4.5 w-4.5 text-[#00C853]" />
              <span>THE LOCATION ADVANTAGE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none font-black font-serif">
              A Secluded Haven. <span className="text-[#00C853] italic">Minutes Away</span>.
            </h2>
          </div>
          <div>
            <p className="text-[#5F5E6B] font-sans text-xs sm:text-sm leading-relaxed font-light max-w-lg">
              Liam Victoria Falls lies inside a serene luxury residential park. This keeps your sanctuary completely insulated from helicopter noises and tourist crowded corridors, while retaining an organic 5-minute runway travel format to the main waterfalls.
            </p>
          </div>
        </div>

        {/* Timeline Map & Location Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24 text-left">
          
          {/* Interactive schematic map runway (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E5E5E7] p-8 flex flex-col justify-between shadow-md">
            <div className="space-y-8">
              <span className="font-mono text-[9px] tracking-widest text-[#00C853] uppercase block font-bold">
                PROXIMITY SCHEMATIC TIMELINE
              </span>
              
              {/* Runway layout */}
              <div className="relative pt-6 pb-10 px-2">
                {/* Connecting Line */}
                <div className="absolute top-[44px] left-8 right-8 h-[2px] bg-[#E5E5E7] rounded"></div>
                
                {/* Highlight active trail line */}
                <div 
                  className="absolute top-[44px] left-8 h-[2px] bg-[#00C853] transition-all duration-500 rounded"
                  style={{ width: `${(activePlace / (PLACES.length - 1)) * 80}%` }}
                ></div>

                {/* Nodes row */}
                <div className="relative flex justify-between">
                  {PLACES.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePlace(idx)}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      <div 
                        className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all shadow-sm relative z-10 ${
                          activePlace === idx 
                            ? "bg-[#00C853] border-[#00C853] text-white scale-110" 
                            : "bg-[#F5F5F5] border-[#E5E5E7] text-[#5F5E6B] group-hover:border-[#00C853] group-hover:text-[#00C853]"
                        }`}
                      >
                        <span className="font-mono font-bold text-[10px]">{idx + 1}</span>
                      </div>
                      
                      <span className="text-[8.5px] font-mono mt-3 tracking-widest text-[#5F5E6B] uppercase hidden sm:block font-bold">
                        {p.duration.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display card for active place */}
              <div className="bg-[#F5F5F5] p-6 rounded-2xl border border-[#E5E5E7] space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#5F5E6B] font-mono text-[9px] uppercase tracking-wider font-bold">
                    <Compass className="h-4 w-4 text-[#00C853]" />
                    <span>TIMELINE NODE {activePlace + 1} • {PLACES[activePlace].distance}</span>
                  </div>
                  <span className="bg-[#00C853] border border-[#00C853]/35 text-white px-3.5 py-1 rounded-full text-[8.5px] font-mono uppercase font-bold tracking-widest">
                    {PLACES[activePlace].duration}
                  </span>
                </div>
                
                <h3 className="font-serif text-base font-black text-black">
                  {PLACES[activePlace].name}
                </h3>
                
                <p className="text-[#5F5E6B] text-xs font-sans leading-relaxed font-light">
                  {PLACES[activePlace].description}
                </p>
              </div>
            </div>

            {/* Travel instruction row */}
            <div className="mt-8 pt-6 border-t border-[#E5E5E7]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9.5px] font-mono text-[#5F5E6B] tracking-widest uppercase font-semibold">
              <span className="flex items-center space-x-1.5">
                <Info className="h-4 w-4 text-[#00C853] shrink-0" />
                <span>GPS coordinates: 17.9244° S, 25.8301° E</span>
              </span>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#00C853] font-bold hover:underline flex items-center space-x-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="h-3 w-3 text-[#00C853]" />
              </a>
            </div>
          </div>

          {/* Location Summary Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-white border border-[#E5E5E7] p-8 rounded-[32px] space-y-4 h-full flex flex-col justify-center shadow-md">
              <h4 className="font-serif text-sm font-black text-black tracking-wide uppercase">
                Mercedes-Benz Transfers
              </h4>
              <p className="text-[#5F5E6B] text-xs sm:text-sm font-sans leading-relaxed font-light">
                We believe travel fatigue must be resolved before greeting our estate. Add our <strong>Private VFA Airport Transfer</strong> when building your custom stay. Our driver handles your baggage and transports you in pristine luxury vehicles.
              </p>
              
              <div className="p-3.5 bg-[#F5F5F5] border border-[#E5E5E7] rounded-xl flex items-center space-x-2.5 font-mono text-[9px] text-[#00C853] uppercase tracking-widest font-bold">
                <ShieldCheck className="h-4 w-4 text-[#00C853] shrink-0" />
                <span>ALL AIRPORT LOGISTICS HANDLED</span>
              </div>
            </div>

            {/* Adjacent activities cards */}
            <div className="bg-[#F5F5F5] border border-[#E5E5E7] p-8 rounded-[32px] space-y-4 flex-1 flex flex-col justify-center shadow-inner">
              <h5 className="font-mono text-[9px] tracking-widest text-[#00C853] uppercase font-bold">
                ESTATE TRANSPORT OPTIONS
              </h5>
              
              <div className="space-y-3.5 font-sans text-xs text-[#5F5E6B]">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E7]/65">
                  <span className="font-light">Bespoke Road Bicycles</span>
                  <span className="text-[#00C853] font-mono uppercase text-[9px] font-bold">Complimentary</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E7]/65">
                  <span className="font-light">Local Tuk-Tuk Dispatches</span>
                  <span className="text-[#00C853] font-mono uppercase text-[9px] font-bold">On Demand</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-light">Private Guided Sedans</span>
                  <span className="text-[#00C853] font-mono uppercase text-[9px] font-bold">Pre-Schedules</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Zero-Jank Accordion FAQ Section */}
        <div className="max-w-3xl mx-auto pt-16 border-t border-[#E5E5E7]">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-black tracking-tight leading-none font-serif">
              Frequently Asked Questions.
            </h3>
            <p className="text-xs text-[#00C853] font-mono uppercase tracking-widest mt-3 font-semibold">
              Essential estate details for discerning travelers
            </p>
          </div>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-[#E5E5E7] rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F5F5] transition-colors cursor-pointer font-serif"
                  >
                    <span className="font-serif font-black text-sm text-black uppercase tracking-wide">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4.5 w-4.5 text-[#00C853] shrink-0 ml-3" />
                    ) : (
                      <ChevronDown className="h-4.5 w-4.5 text-[#00C853] shrink-0 ml-3" />
                    )}
                  </button>
                  
                  {/* Zero-jank accordion expansion */}
                  <div 
                    className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                      isOpen ? "max-h-44 pb-5 opacity-100 mt-2 border-t border-[#F5F5F5] pt-4" : "max-h-0 opacity-0 pb-0"
                    }`}
                  >
                    <p className="text-xs text-[#5F5E6B] font-sans leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
