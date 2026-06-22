/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { ArrowRight, Compass, Shield, Award, MapPin, Sparkles, CheckCircle } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  onStartPlanner: () => void;
  onExploreRooms: () => void;
}

export default function Hero({ onStartPlanner, onExploreRooms }: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      );
    }
    
    if (paragraphRef.current) {
      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    
    if (actionsRef.current) {
      tl.fromTo(
        actionsRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item");
      tl.fromTo(
        items,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: "back.out(1.2)" },
        "-=0.8"
      );
    }
  }, []);

  const marqueePartners = [
    "RELAIS & CHATEAUX",
    "THE LEADING HOTELS OF THE WORLD",
    "CONDE NAST JOHANSENS",
    "NATIONAL GEOGRAPHIC TRAVEL",
    "FORBES TRAVEL GUIDE",
    "VIRTUOSO LUXURY",
    "ZIMBABWE TOURISM BOARD"
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white text-black flex flex-col justify-center overflow-hidden pt-32 pb-12"
    >
      {/* Decorative Custom Light Premium Ambient Backlighting */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5F5F5] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#FAF9F5] rounded-full blur-[120px] opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        
        {/* Left Side: Copy and CTAs */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          {/* Subtle rating block */}
          <div className="inline-flex items-center space-x-2 bg-[#F5F5F5] border border-[#E5E5E7] px-4 py-2 rounded-full" id="star-accreditation">
            <div className="flex -space-x-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-3.5 h-3.5 text-[#F5B800] fill-[#F5B800]"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] text-black/80 uppercase font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00C853]" /> 9.0/10 WONDERFUL - EXPEDIA TOP RATING
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1
            ref={headlineRef}
            className="font-serif font-black tracking-tight text-[#111111] text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] leading-[1.05] max-w-xl"
          >
            Serenity by the <span className="text-[#00C853] italic">Smoke That Thunders</span>.
          </h1>

          {/* Elegant supporting paragraph */}
          <p
            ref={paragraphRef}
            className="text-[#5F5E6B] font-sans text-sm sm:text-base leading-relaxed max-w-lg font-light"
          >
            Imagine waking up in an elegantly appointed suite with silky 300-thread-count linens and stepping onto your private balcony as the jungle air drifts through. Liam Guesthouse is a quiet garden oasis—an exclusive five-star collection of eight boutique residences situated in a tranquil residential area, just minutes from the majestic falls.
          </p>

          {/* Primary CTA and Secondary CTA Row */}
          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-planner-cta"
              onClick={onStartPlanner}
              className="px-8 py-4 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-mono text-[10.5px] font-bold tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2.5 active:scale-95 shadow-md hover:shadow-lg border border-[#00C853]/20 cursor-pointer"
            >
              <span>BUILD MY STAY</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>

            <button
              id="hero-explore-cta"
              onClick={onExploreRooms}
              className="px-8 py-4 text-black hover:text-[#00C853] border border-[#E5E5E7] hover:border-[#00C853]/40 bg-white hover:bg-white rounded-full font-mono text-[10px] font-bold tracking-widest flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer"
            >
              <span>EXPLORE STUDIOS</span>
            </button>
          </div>

          {/* Key Metrics row */}
          <div
            ref={infoRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E5E5E7] max-w-xl font-mono text-[9px] text-[#5F5E6B] tracking-widest uppercase"
          >
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-[#00C853] shrink-0" />
              <div>
                <span className="text-black font-bold block">5-MIN RIDE</span>
                <span className="text-[7.5px] text-[#888888] tracking-normal">Direct Access</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <Award className="h-4 w-4 text-[#00C853] shrink-0" />
              <div>
                <span className="text-black font-bold block">8 SANCTUARIES</span>
                <span className="text-[7.5px] text-[#888888] tracking-normal">Exclusive privacy</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <Shield className="h-4 w-4 text-[#00C853] shrink-0" />
              <div>
                <span className="text-black font-bold block">24/7 SERVICE</span>
                <span className="text-[7.5px] text-[#888888] tracking-normal">Peace of Mind</span>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <Compass className="h-4 w-4 text-[#00C853] shrink-0" />
              <div>
                <span className="text-black font-bold block">OASIS DECK</span>
                <span className="text-[7.5px] text-[#888888] tracking-normal">Slate plunge pool</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Immersive Asymmetric Bento Gallery Showcase of images */}
        <div ref={galleryRef} className="lg:col-span-6 relative w-full h-[550px] flex items-center justify-center">
          
          {/* Main Hero Background Decorative Frame */}
          <div className="absolute inset-0 bg-[#F5F5F5] rounded-[36px] -rotate-1 border border-[#E5E5E7] -z-10"></div>

          {/* Image 1: Main central image - Pool deck & loungers at dusk */}
          <div className="gallery-item absolute top-4 left-6 w-[70%] h-[56%] rounded-[24px] overflow-hidden shadow-xl border border-white z-20 group transition-all duration-500 hover:scale-[1.02] hover:z-30 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
              alt="Liam Pool Deck Dusk"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-serif text-sm italic">Sunset composite poolside deck</p>
            </div>
          </div>

          {/* Image 2: Deluxe Sanctuary Bedroom with zebra luxury layout */}
          <div className="gallery-item absolute bottom-4 right-6 w-[68%] h-[50%] rounded-[24px] overflow-hidden shadow-xl border border-white z-10 group transition-all duration-500 hover:scale-[1.02] hover:z-30 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
              alt="Premium Bedroom Zebra Art"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-serif text-sm italic">The Zambezi Sanctuary Bedroom</p>
            </div>
          </div>

          {/* Floating Card 3: Bathroom concrete hand-cast vanity & round sink */}
          <div className="gallery-item absolute top-10 right-4 w-[36%] h-[32%] rounded-[20px] overflow-hidden shadow-lg border border-white z-25 group transition-all duration-500 hover:scale-[1.02] hover:z-30 cursor-pointer hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
              alt="Concrete Vanity Bath"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating Badge: Breakfast poolside details */}
          <div className="gallery-item absolute bottom-16 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-[20px] shadow-lg border border-[#E5E5E7] z-30 max-w-[200px] hover:translate-y-[-4px] transition-transform duration-300">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#FAF9F5] p-1.5 rounded-full border border-black/10">
                <CheckCircle className="w-4 h-4 text-[#00C853]" />
              </div>
              <div>
                <p className="font-serif text-[11px] font-black leading-tight text-[#111111]">Complimentary Breakfast</p>
                <p className="text-[8px] font-sans text-[#5F5E6B] mt-0.5">Poolside English buffet daily</p>
              </div>
            </div>
          </div>

          {/* Floating Badge: Watchtower Column height indicator */}
          <div className="gallery-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2.5 rounded-full shadow-lg border border-white/20 z-40 flex items-center space-x-2 uppercase font-mono text-[8px] tracking-[0.2em]">
            <Compass className="w-3.5 h-3.5 text-[#00C853]" />
            <span>ROOFTOP WATCHTOWER VIEW</span>
          </div>

        </div>

      </div>

      {/* Partner Logos infinite marquee */}
      <div className="w-full border-t border-b border-[#E5E5E7] bg-[#F5F5F5] py-6 mt-12 overflow-hidden relative select-none">
        <div className="flex w-[200%] md:w-[150%]">
          <div className="flex justify-around items-center min-w-full shrink-0 animate-marquee space-x-16 px-4">
            {marqueePartners.map((partner, idx) => (
              <span
                key={`p1-${idx}`}
                className="font-serif font-black tracking-[0.2em] text-[10.5px] text-[#5F5E6B]/50 hover:text-[#00C853] transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="flex justify-around items-center min-w-full shrink-0 animate-marquee space-x-16 px-4">
            {marqueePartners.map((partner, idx) => (
              <span
                key={`p2-${idx}`}
                className="font-serif font-black tracking-[0.2em] text-[10.5px] text-[#5F5E6B]/50 hover:text-[#00C853] transition-colors"
               >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
