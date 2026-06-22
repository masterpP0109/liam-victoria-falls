/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { Compass, Award, Shield, Hotel, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".about-animate-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="py-28 bg-white text-black relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Intro Tag & Editorial Header */}
        <div className="mb-16 md:mb-24 text-left max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 text-[#00C853] font-mono text-[9px] tracking-[0.25em] uppercase mb-4 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#00C853]" />
            <span>THE SANCTUARY HERITAGE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-none tracking-tight">
            Zimbabwean Craftsmanship, <span className="text-[#00C853] italic">Uncompromised</span> Living.
          </h2>
          <p className="mt-6 text-[#5F5E6B] font-sans text-sm leading-relaxed max-w-2xl font-light">
            We designed Liam Victoria Falls to transcend the ordinary. Our estate balances the meticulous standards of a custom luxury retreat with the pure, slow pace of private boutique hospitality. 
          </p>
        </div>

        {/* Asymmetrical 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block - Asymmetrical Column Span: 5/12 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 text-left">
            
            {/* Elegant Image Card */}
            <div className="about-animate-card group rounded-[24px] overflow-hidden bg-[#F5F5F5] border border-[#E5E5E7] aspect-[4/3] relative flex items-center justify-center transition-all duration-500 hover:scale-[1.015] hover:shadow-md cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Studio Interior Layout"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E5E5E7]">
                <span className="font-mono text-[8.5px] tracking-widest text-[#00C853] font-bold uppercase">Suite 01 Residence</span>
              </div>
            </div>

            {/* Solid Minimal Text highlight */}
            <div className="about-animate-card bg-white border border-[#E5E5E7] p-10 rounded-[28px] hover:shadow-md duration-300">
              <span className="font-serif text-5xl font-black text-[#00C853] leading-none block">8</span>
              <h4 className="font-serif text-black font-semibold text-sm mt-3 uppercase tracking-wider">Independent Apartments</h4>
              <p className="text-xs font-sans text-[#5F5E6B] mt-3 leading-relaxed font-light">
                By intentionally limiting our estate capacity, we completely preserve your peacefulness. Enjoy slow mornings on a calm pool deck, entirely void of crowded public hotel lobbies.
              </p>
            </div>

          </div>

          {/* Right Block - Asymmetrical Column Span: 7/12 */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10 text-left">
            
            {/* Editorial Content Text and Pillars */}
            <div className="about-animate-card space-y-8 bg-white border border-[#E5E5E7] p-10 md:p-12 rounded-[28px] h-full flex flex-col justify-center">
              
              <blockquote className="border-l-2 border-[#00C853] pl-5 italic text-[#5F5E6B] font-serif text-base sm:text-lg leading-relaxed">
                "We provide an elite private haven of only eight fully climate-controlled suites, combining rigorous five-star services, high-spec work spaces, and personal itinerary curation."
              </blockquote>
              
              <p className="text-xs text-[#5F5E6B] leading-relaxed font-sans font-light">
                Every material is handpicked. From high-thread Egyptian linens to custom-finished stone rain bathrooms, automatic espresso bars and private butler coordinates in each apartment. In the quiet gold of the afternoon, relax inside our plunge pool or mount our watchtower to view the misty columns of the great Victoria Falls.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#E5E5E7]/60 font-mono text-[10px] tracking-widest uppercase">
                <div className="flex items-start space-x-3.5">
                  <div className="h-5 w-5 mt-0.5 rounded-full border border-[#00C853] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]"></span>
                  </div>
                  <div>
                    <h5 className="font-bold text-black">Private Butler Service</h5>
                    <p className="text-[8.5px] text-[#5F5E6B] font-sans mt-1 tracking-normal lowercase font-light">Comprehensive stay assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-5 w-5 mt-0.5 rounded-full border border-[#00C853] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]"></span>
                  </div>
                  <div>
                    <h5 className="font-bold text-black">5-Min Falls Access</h5>
                    <p className="text-[8.5px] text-[#5F5E6B] font-sans mt-1 tracking-normal lowercase font-light">closer than standard lodges</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Secondary Asymmetrical Image */}
            <div className="about-animate-card group rounded-[24px] overflow-hidden bg-[#F5F5F5] border border-[#E5E5E7] aspect-[21/9] relative flex items-center justify-center transition-all duration-500 hover:scale-[1.01] hover:shadow-md cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury pool water surface at Liam Victoria Falls"
                className="w-full h-full object-cover opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E5E5E7]">
                <span className="font-mono text-[8.5px] tracking-widest text-[#00C853] font-bold uppercase">The Pool Oasis</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
