/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { AMENITIES } from "../data";
import {
  Coffee,
  Laptop,
  Wifi,
  ShieldCheck,
  TreePine,
  Wine,
  Compass,
  Sparkles,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case "Pool":
      return <span className="text-xl font-mono font-bold text-[#7B52EE] select-none">🏊</span>;
    case "Compass":
      return <Compass className="h-5 w-5 text-[#7B52EE]" />;
    case "Coffee":
      return <Coffee className="h-5 w-5 text-[#7B52EE]" />;
    case "Wine":
      return <Wine className="h-5 w-5 text-[#7B52EE]" />;
    case "Laptop":
      return <Laptop className="h-5 w-5 text-[#7B52EE]" />;
    case "TreePine":
      return <TreePine className="h-5 w-5 text-[#7B52EE]" />;
    case "Wifi":
      return <Wifi className="h-5 w-5 text-[#7B52EE]" />;
    case "ShieldCheck":
      return <ShieldCheck className="h-5 w-5 text-[#7B52EE]" />;
    default:
      return <Sparkles className="h-5 w-5 text-[#7B52EE]" />;
  }
};

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".amenity-bento-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [showAll]);

  // We split or render uniquely according to Bento styling
  const displayedAmenities = showAll ? AMENITIES : AMENITIES.slice(0, 4);

  return (
    <section id="amenities" ref={containerRef} className="py-28 bg-white text-black relative border-t border-b border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header styled in the epic HERITAGE style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-[#7B52EE] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#7B52EE]" />
              <span>THE FIVE-STAR PROVISIONS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
              A Refined Standard of <span className="text-[#7B52EE] italic">Comfort</span>.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[#5F5E6B] font-sans text-xs sm:text-sm leading-relaxed font-light font-sans">
              At Liam Victoria Falls, we transcend traditional accommodations. Every structural provision is backed by personalized private butler coordination, certified security safeguards, and handcrafted luxuries.
            </p>
          </div>
        </div>

        {/* Custom Bento Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {displayedAmenities.map((am, idx) => {
            // Apply different Bento shapes to different indexes to make a beautiful collage
            let bentoStyles = "md:col-span-4 min-h-[300px]"; // Default size
            
            if (idx === 0) {
              // Plunge pool: large double horizontal card
              bentoStyles = "md:col-span-8 bg-white border border-[#E5E5E7] flex flex-col md:flex-row justify-between p-8 md:p-10";
            } else if (idx === 1) {
              // Rooftop watchtower: tall, distinct background card in deep matte black
              bentoStyles = "md:col-span-4 bg-black text-white border border-black p-8 md:p-10";
            } else if (idx === 2) {
              // English Breakfast: medium sized ivory highlight
              bentoStyles = "md:col-span-6 bg-white border border-[#E5E5E7] p-8 md:p-10";
            } else if (idx === 3) {
              // Sunset reception: medium sized ivory highlight
              bentoStyles = "md:col-span-6 bg-[#F5F5F5] border border-[#E5E5E7] p-8 md:p-10";
            } else if (idx === 4) {
              // High-spec workspace
              bentoStyles = "md:col-span-4 bg-white border border-[#E5E5E7] p-8 md:p-10";
            } else if (idx === 5) {
              // Garden Picnic
              bentoStyles = "md:col-span-4 bg-[#F5F5F5] border border-[#E5E5E7] p-8 md:p-10";
            } else if (idx === 6) {
              // Wi-Fi
              bentoStyles = "md:col-span-4 bg-white border border-[#E5E5E7] p-8 md:p-10";
            } else if (idx === 7) {
              // Parking
              bentoStyles = "md:col-span-12 bg-white border border-[#E5E5E7] flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 md:p-10";
            }

            const isDarkCard = idx === 1;

            return (
              <div
                key={idx}
                className={`amenity-bento-card rounded-[28px] overflow-hidden transition-all duration-500 hover:scale-[1.012] hover:shadow-lg flex flex-col justify-between group cursor-pointer ${bentoStyles}`}
              >
                {/* Bento Layout structure for Pool (Horizontal Card style) */}
                {idx === 0 ? (
                  <>
                    <div className="flex-1 flex flex-col justify-between pr-4 space-y-6">
                      <div className="space-y-4">
                        <div className="h-11 w-11 rounded-full bg-[#F5F5F5] border border-[#E5E5E7] flex items-center justify-center group-hover:bg-[#7B52EE]/10 group-hover:text-[#7B52EE] duration-300">
                          <span className="group-hover:scale-110 duration-300">{getAmenityIcon(am.icon)}</span>
                        </div>
                        <div>
                          <h3 className="font-serif font-black text-xl text-[#111111]">{am.name}</h3>
                          <p className="text-[#5F5E6B] text-xs font-sans mt-3 leading-relaxed max-w-sm font-light font-sans">
                            {am.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-[8.5px] font-mono tracking-widest text-[#5F5E6B] uppercase mt-4">
                        FEATURED DECK • pool dimensions 6m x 3.5m
                      </div>
                    </div>
                    {/* Visual element on the right of horizontal block */}
                    <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto mt-6 md:mt-0 rounded-[20px] overflow-hidden bg-[#F5F5F5] border border-[#E5E5E7]">
                      <img
                        src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80"
                        alt="Liam Luxury plunge pool"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 duration-700"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-6 flex-grow text-left">
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center duration-300 ${isDarkCard ? 'bg-white/10 border border-white/20 group-hover:bg-[#7B52EE] group-hover:border-[#7B52EE]' : 'bg-[#F5F5F5] border border-[#E5E5E7] group-hover:bg-[#7B52EE]/10'}`}>
                        <span className="group-hover:scale-110 duration-300">
                          {isDarkCard ? <Compass className="h-5 w-5 text-white" /> : getAmenityIcon(am.icon)}
                        </span>
                      </div>
                      <div>
                        <h3 className={`font-serif font-black text-lg ${isDarkCard ? 'text-white' : 'text-[#111111]'} group-hover:underline decoration-1 underline-offset-4 duration-300`}>
                          {am.name}
                        </h3>
                        <p className={`text-xs font-sans mt-3 leading-relaxed font-light ${isDarkCard ? 'text-white/80' : 'text-[#5F5E6B]'}`}>
                          {am.description}
                        </p>
                      </div>
                    </div>
                    {/* Foot Tag */}
                    <div className={`mt-8 pt-4 border-t text-[8.5px] font-mono tracking-widest uppercase flex items-center justify-between ${isDarkCard ? 'border-white/10 text-white/50' : 'border-[#E5E5E7]/50 text-[#5F5E6B]'}`}>
                      <span>VERIFIED COMFORT</span>
                      <span className={isDarkCard ? 'text-white font-bold' : 'text-[#7B52EE] font-bold'}>{am.category}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
          
        </div>

        {/* See More Amenities Control */}
        <div className="mt-14 text-center font-mono">
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) {
                document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3.5 bg-white text-black hover:text-white hover:bg-[#7B52EE] border border-[#E5E5E7] hover:border-[#7B52EE] rounded-full font-mono text-[9.5px] tracking-widest font-bold uppercase transition-all duration-300 transform active:scale-95 shadow-sm flex items-center space-x-2.5 mx-auto cursor-pointer"
          >
            <span>{showAll ? "SEE FEWER FEATURES" : "EXPLORE ALL 8 SERVICE PROVISIONS"}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B52EE] animate-pulse"></span>
          </button>
        </div>

        {/* Scenic Viewing Deck Feature Showcase card inside a clean white container with border */}
        <div className="amenity-bento-card mt-24 bg-white rounded-[32px] border border-[#E5E5E7] p-8 md:p-12 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#7B52EE] font-mono text-[9px] tracking-[0.25em] uppercase block font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#7B52EE]" /> ESTATE HIGHLIGHT FEATURE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-black tracking-tight leading-none">
                The Rooftop Viewing Platform & Sky Deck.
              </h3>
              <p className="text-[#5F5E6B] font-sans text-xs sm:text-sm leading-relaxed font-light font-sans">
                Exclusive to Liam is our secure scenic viewing deck. Guests wake up to stunning panoramic views from the rooftop terrace over the Zambezi canopy and experience "The Smoke That Thunders" rising into the morning sky.
              </p>
              
              <div className="flex flex-wrap gap-3 text-[9px] font-mono text-black uppercase tracking-wider">
                <div className="flex items-center space-x-2 bg-[#F5F5F5] px-4 py-2 rounded-full border border-[#E5E5E7]">
                  <span className="w-1.5 h-1.5 bg-[#7B52EE] rounded-full"></span>
                  <span>Sunset optics & lounges</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#F5F5F5] px-4 py-2 rounded-full border border-[#E5E5E7]">
                  <span className="w-1.5 h-1.5 bg-[#7B52EE] rounded-full"></span>
                  <span>Gorge spotters scope</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[16/10] bg-[#F8F7F9] rounded-2xl overflow-hidden border border-[#E5E5E7] shadow-sm group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
                alt="Scenic Viewing Deck safari layout"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 duration-700"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
