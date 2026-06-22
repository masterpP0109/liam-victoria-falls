/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { STUDIOS } from "../data";
import { RoomStudio } from "../types";
import { Bed, Users, Square, Check, ArrowRight, Eye, Sparkles, X, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StudiosProps {
  onSelectRoom: (roomId: string) => void;
  previewOnly?: boolean;
  onViewAll?: () => void;
}

export default function Studios({ onSelectRoom, previewOnly = false, onViewAll }: StudiosProps) {
  const [selectedRoom, setSelectedRoom] = useState<RoomStudio | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridContainerRef.current?.querySelectorAll(".studio-animate-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [previewOnly]);

  const handleBookSelect = (roomId: string) => {
    setSelectedRoom(null);
    onSelectRoom(roomId);
  };

  const displayedStudios = previewOnly ? STUDIOS.slice(0, 3) : STUDIOS;

  // Dynamic columns for genuine Bento-Grid orchestration
  const getBentoClasses = (index: number) => {
    if (previewOnly) {
      if (index === 0) return "md:col-span-2 lg:col-span-8";
      if (index === 1) return "md:col-span-1 lg:col-span-4";
      return "md:col-span-2 lg:col-span-12";
    }
    // Full Page Layout (all 8 cards)
    const pattern = index % 5;
    if (pattern === 0) return "md:col-span-2 lg:col-span-8";
    if (pattern === 1) return "md:col-span-1 lg:col-span-4";
    if (pattern === 2) return "md:col-span-1 lg:col-span-4";
    if (pattern === 3) return "md:col-span-1 lg:col-span-4";
    return "md:col-span-1 lg:col-span-4";
  };

  return (
    <section id="studios" className="py-28 bg-[#F5F5F5] relative border-t border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header in HERITAGE style */}
        <div className="max-w-3xl mb-24 text-left">
          <div className="inline-flex items-center space-x-1.5 text-[#00C853] font-mono text-[9px] tracking-[0.25em] uppercase mb-4 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#00C853]" />
            <span>EXQUISITE STUDIO SPECIFICATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
            The Eight Studio <span className="text-[#00C853] italic">Residences</span>.
          </h2>
          <p className="mt-5 text-[#5F5E6B] font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Each sanctuary is individually crafted with local teak and rosewood hardwoods, fully integrated dual-zone whisper climate portals, cast-concrete ensuite wetrooms, and deep-set private decks looking out to the forest canopy.
          </p>
        </div>

        {/* List of 8 Studios Bento Grid with true asymmetrical rhythm */}
        <div ref={gridContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {displayedStudios.map((studio, idx) => {
            const bentoSpan = getBentoClasses(idx);

            return (
              <article
                key={studio.id}
                className={`studio-animate-card bg-white rounded-[28px] overflow-hidden border border-[#E5E5E7] group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:border-[#00C853]/40 flex flex-col h-full ${bentoSpan}`}
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={studio.images[0]}
                    alt={studio.name}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#E5E5E7] px-4 py-1.5 rounded-full shadow-sm font-mono text-xs font-bold text-[#00C853]">
                    ${studio.basePriceNightUSD} <span className="text-[#5F5E6B] font-normal text-[9px]">/ night</span>
                  </div>

                  {/* Capacity Overlays */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] font-mono text-black flex items-center space-x-2.5 border border-[#E5E5E7]">
                    <span className="flex items-center space-x-1">
                      <Users className="h-3.5 w-3.5 text-[#00C853]" />
                      <span>{studio.capacity.adults} Guests</span>
                    </span>
                    <span className="text-[#E5E5E7]">|</span>
                    <span className="flex items-center space-x-1">
                      <Bed className="h-3.5 w-3.5 text-[#00C853]" />
                      <span>{studio.capacity.children > 0 ? "Extended Suite" : "King Setup"}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <header className="space-y-2">
                      <h3 className="font-serif font-black text-xl text-[#111111] group-hover:text-[#00C853] group-hover:underline decoration-1 underline-offset-4 transition-all">
                        {studio.name}
                      </h3>
                      <p className="text-[10px] font-mono text-[#00C853] uppercase tracking-widest font-semibold">{studio.tagline}</p>
                    </header>
                    
                    <p className="text-xs text-[#5F5E6B] font-sans leading-relaxed line-clamp-3 font-light">
                      {studio.description}
                    </p>

                    {/* Highlights section with bullet points */}
                    <div className="py-4 border-t border-b border-[#E5E5E7]/80 grid grid-cols-1 gap-2.5 text-[9.5px] font-mono text-[#5F5E6B] uppercase tracking-widest">
                      {studio.highlights.map((hlt, i) => (
                        <div key={i} className="flex items-center space-x-2">
                           <span className="h-1.5 w-1.5 bg-[#00C853] rounded-full shrink-0"></span>
                          <span>{hlt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="mt-8 flex items-center justify-between space-x-4 pt-4 border-t border-[#F5F5F5]">
                    <button
                      onClick={() => setSelectedRoom(studio)}
                      className="px-5 py-2.5 rounded-full bg-white border border-[#E5E5E7] hover:border-[#00C853]/50 text-black hover:text-[#00C853] hover:bg-[#F5F5F5] transition-all text-[9.5px] font-mono tracking-widest flex items-center space-x-1.5 cursor-pointer shrink-0 font-bold"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#00C853]" />
                      <span>SPECS</span>
                    </button>

                    <button
                      onClick={() => handleBookSelect(studio.id)}
                      className="flex-1 py-2.5 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-mono text-[9.5px] tracking-widest font-bold rounded-full transition-all active:scale-95 flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                    >
                      <span>PLAN STAY</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Exclusive Studio Specifications Overlay Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white border border-[#E5E5E7] rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl">
              {/* Modal header */}
              <div className="relative h-64 bg-[#F5F5F5]">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedRoom(null)}
                   className="absolute top-5 right-5 p-2.5 bg-white hover:bg-neutral-100 text-black rounded-full border border-[#E5E5E7] shadow-md flex items-center justify-center z-10 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                <div className="absolute bottom-5 left-8 text-left">
                  <h3 className="font-serif text-2xl font-black text-[#111111] leading-none">{selectedRoom.name}</h3>
                  <p className="text-[10px] font-mono text-[#00C853] tracking-wider uppercase mt-1.5 font-bold">{selectedRoom.tagline}</p>
                </div>
              </div>

              {/* Modal details */}
              <div className="p-8 md:p-10 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar text-[#111111] text-left">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 px-5 bg-[#F5F5F5] rounded-[18px] border border-[#E5E5E7] font-mono text-[10px] text-[#5F5E6B]">
                  <div>
                    <span className="text-[#00C853] block mb-0.5 uppercase tracking-wider font-bold">ESTIMATED RATE</span>
                    <strong className="text-[#00C853] font-bold text-xs">${selectedRoom.basePriceNightUSD} / night</strong>
                  </div>
                  <div>
                    <span className="text-[#00C853] block mb-0.5 uppercase tracking-wider font-bold">SIZE FOOTPRINT</span>
                    <strong className="text-[#111111] font-semibold text-xs">{selectedRoom.sizeSquareMeters} m²</strong>
                  </div>
                  <div>
                    <span className="text-[#00C853] block mb-0.5 uppercase tracking-wider font-bold">BEDDING TYPE</span>
                    <strong className="text-[#111111] font-semibold text-xs">King Custom Ortho</strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-xs font-bold text-black tracking-widest uppercase">
                    Residence characteristics
                  </h4>
                  <p className="text-xs text-[#5F5E6B] font-sans leading-relaxed font-light">
                    {selectedRoom.description}
                  </p>
                </div>

                {/* Full Premium Amenity list for the Room */}
                <div className="space-y-3">
                  <h4 className="font-serif text-[#00C853] text-xs font-bold tracking-widest uppercase">
                    Included Amenities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans text-[#5F5E6B]">
                    {selectedRoom.amenities.map((am, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-white border border-[#E5E5E7] p-2 rounded-xl">
                        <Check className="h-3.5 w-3.5 text-[#00C853] shrink-0" />
                        <span className="font-light">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Guarantee banner */}
                <div className="p-3.5 bg-[#F5F5F5] border border-[#E5E5E7] rounded-xl text-[9px] font-mono text-[#00C853] tracking-widest uppercase flex items-center space-x-3 font-bold">
                  <Shield className="h-4 w-4 text-[#00C853] shrink-0" />
                  <span>PRE-ENTRY SANITIZED • BIOMETRIC DOOR ACCESS • PRIVATE MINI-BAR</span>
                </div>
              </div>

              {/* Modal footer CTA */}
              <div className="p-5 bg-[#F5F5F5] border-t border-[#E5E5E7] flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-5 py-2 text-[10px] font-mono tracking-widest text-[#5F5E6B] hover:text-[#111111] uppercase cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleBookSelect(selectedRoom.id)}
                  className="px-6 py-2.5 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-mono text-[9.5px] tracking-widest font-bold rounded-full shadow-sm cursor-pointer"
                >
                  PLAN THIS STUDIO
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive View More trigger under Bento layout */}
        {previewOnly && (
          <div className="mt-24 text-center relative z-20 font-mono">
            <button
              onClick={onViewAll}
              className="px-8 py-4 bg-white hover:bg-[#00C853] text-[#00C853] hover:text-white border border-[#00C853]/40 hover:border-[#00C853] rounded-full font-mono text-[9.5px] tracking-[0.25em] font-bold uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center space-x-3.5 mx-auto cursor-pointer"
            >
              <span>DISCOVER ALL 8 RESIDENCES</span>
              <ArrowRight className="h-4 w-4 shrink-0 animate-pulse" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
