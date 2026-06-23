/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { STUDIOS } from "../data";
import { RoomStudio } from "../types";
import { Bed, Users, Square, Check, ArrowRight, Eye, Sparkles, X, Shield, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartImage from "./SmartImage";

gsap.registerPlugin(ScrollTrigger);

interface StudiosProps {
  onSelectRoom: (roomId: string) => void;
  previewOnly?: boolean;
  onViewAll?: () => void;
}

export default function Studios({ onSelectRoom, previewOnly = false, onViewAll }: StudiosProps) {
  const [selectedRoom, setSelectedRoom] = useState<RoomStudio | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const displayedStudios = previewOnly ? STUDIOS.slice(0, 3) : STUDIOS;

  useEffect(() => {
    // Reset active image index when active studio changes
    setActiveImageIdx(0);
  }, [activeIdx]);

  useEffect(() => {
    // Animate the main gallery panel on scroll/enter
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleBookSelect = (roomId: string) => {
    setSelectedRoom(null);
    onSelectRoom(roomId);
  };

  const handlePrevStudio = () => {
    setActiveIdx((prev) => (prev === 0 ? displayedStudios.length - 1 : prev - 1));
  };

  const handleNextStudio = () => {
    setActiveIdx((prev) => (prev === displayedStudios.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent, maxImages: number) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? maxImages - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent, maxImages: number) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === maxImages - 1 ? 0 : prev + 1));
  };

  const currentStudio = displayedStudios[activeIdx] || displayedStudios[0];
  const imagesCount = currentStudio.images.length;

  return (
    <section id="studios" className="py-28 bg-[#F5F5F5] relative border-t border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header in HERITAGE style */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center space-x-1.5 text-[#7B52EE] font-mono text-[9px] tracking-[0.25em] uppercase mb-4 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#7B52EE]" />
            <span>INTERACTIVE RESIDENCES GALLERY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
            The Eight Studio <span className="text-[#7B52EE] italic font-normal">Residences</span>.
          </h2>
          <p className="mt-5 text-[#5F5E6B] font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            An exquisite visual lookbook of our premium guest suites. Explore architecture crafted from local teak hardwoods, integrated climate portals, cast-concrete wetrooms, and deep private observation decks.
          </p>
        </div>

        {/* Master Interactive Gallery Block */}
        <div ref={galleryRef} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LARGE MEDIA VIEWPORT (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E5E5E7] p-4 flex flex-col justify-between shadow-xl min-h-[480px] relative overflow-hidden group">
              <div className="relative flex-1 rounded-[24px] overflow-hidden bg-[#F5F5F5] shadow-inner font-mono">
                {/* Main Active Image */}
                <SmartImage
                  src={currentStudio.images[activeImageIdx]}
                  alt={currentStudio.name}
                  className="w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105"
                />

                {/* Sub-image Dot Navigation Overlays */}
                {imagesCount > 1 && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center space-x-2 z-20 border border-white/10 transition-all">
                    {currentStudio.images.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx(dotIdx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === activeImageIdx ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white"
                        }`}
                        aria-label={`Photo slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Left/Right Inner Image Navigation triggers */}
                {imagesCount > 1 && (
                  <>
                    <button
                      onClick={(e) => handlePrevImage(e, imagesCount)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 hover:bg-[#7B52EE] text-black hover:text-white border border-[#E5E5E7] flex items-center justify-center shadow-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-20 hover:scale-105 active:scale-95"
                      aria-label="Previous room photo"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => handleNextImage(e, imagesCount)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 hover:bg-[#7B52EE] text-black hover:text-white border border-[#E5E5E7] flex items-center justify-center shadow-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-20 hover:scale-105 active:scale-95"
                      aria-label="Next room photo"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image counter and index pill */}
                <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md px-4 py-2 rounded-full font-mono text-[9px] text-[#E5E5E7] tracking-widest uppercase font-bold border border-white/10 flex items-center space-x-2">
                  <ImageIcon className="h-3.5 w-3.5 text-[#7B52EE]" />
                  <span>STUDIO 0{activeIdx + 1} &bull; COMPILATION {activeImageIdx + 1} OF {imagesCount}</span>
                </div>

                {/* Corner Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#E5E5E7] px-4.5 py-2 rounded-full shadow-lg font-mono text-xs font-bold text-[#7B52EE]">
                  ${currentStudio.basePriceNightUSD} <span className="text-[#5F5E6B] font-normal text-[9px]">/ night</span>
                </div>
              </div>
            </div>

            {/* INTEGRATED SPECIFICATIONS SIDE PANEL (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-[32px] border border-[#E5E5E7] p-8 flex flex-col justify-between shadow-xl text-left">
              <div className="space-y-6">
                
                {/* Category indicator & Selector paging triggers */}
                <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-4">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#7B52EE] uppercase font-semibold">
                    RESIDENCE INVENTORY SPECIFICATION
                  </span>
                  
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={handlePrevStudio}
                      className="h-8 w-8 rounded-full border border-[#E5E5E7] bg-white hover:bg-[#F5F5F5] flex items-center justify-center text-[#5F5E6B] hover:text-[#7B52EE] transition-all cursor-pointer hover:border-[#7B52EE]"
                      title="Previous suite"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-[10px] text-black font-semibold">
                      0{activeIdx + 1} / 0{displayedStudios.length}
                    </span>
                    <button
                      onClick={handleNextStudio}
                      className="h-8 w-8 rounded-full border border-[#E5E5E7] bg-white hover:bg-[#F5F5F5] flex items-center justify-center text-[#5F5E6B] hover:text-[#7B52EE] transition-all cursor-pointer hover:border-[#7B52EE]"
                      title="Next suite"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Primary room naming header */}
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-[#111111] tracking-tight">
                    {currentStudio.name}
                  </h3>
                  <p className="text-[10px] font-mono text-[#7B52EE] uppercase tracking-widest font-semibold">
                    {currentStudio.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5F5E6B] font-sans leading-relaxed font-light">
                  {currentStudio.description}
                </p>

                {/* Room specifications Grid metrics */}
                <div className="grid grid-cols-2 gap-3.5 py-4 px-4 bg-[#F5F5F5] border border-[#E5E5E7] rounded-2xl">
                  <div className="text-left">
                    <span className="text-[#5F5E6B] font-mono text-[8px] uppercase tracking-widest block font-bold">Footprint Size</span>
                    <span className="text-[11px] font-mono text-black font-semibold mt-0.5 block">{currentStudio.sizeSquareMeters} Sq Meters</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#5F5E6B] font-mono text-[8px] uppercase tracking-widest block font-bold">Standard Bedding</span>
                    <span className="text-[11px] font-sans text-black font-light mt-0.5 block">{currentStudio.bedType || "King Bed Setup"}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#5F5E6B] font-mono text-[8px] uppercase tracking-widest block font-bold">Optimal Guest Max</span>
                    <span className="text-[11px] font-sans text-black font-light mt-0.5 block">{currentStudio.capacity.adults} Adults {currentStudio.capacity.children > 0 ? `& ${currentStudio.capacity.children} Child` : ""}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#5F5E6B] font-mono text-[8px] uppercase tracking-widest block font-bold">Estimated Rate</span>
                    <span className="text-[11px] font-mono text-[#7B52EE] font-bold mt-0.5 block">${currentStudio.basePriceNightUSD} / night</span>
                  </div>
                </div>

                {/* Bullet attributes */}
                <div className="space-y-2 pt-2 border-t border-[#F5F5F5]">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#5F5E6B] font-bold block">
                    SANCTUARY HIGHLIGHTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9.5px] font-mono text-[#5F5E6B] uppercase tracking-widest">
                    {currentStudio.highlights.map((hlt, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 bg-[#7B52EE] rounded-full shrink-0"></span>
                        <span className="truncate">{hlt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Operations Tray */}
              <div className="mt-8 pt-6 border-t border-[#F5F5F5] flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedRoom(currentStudio)}
                  className="px-5 py-3 rounded-full bg-white border border-[#E5E5E7] hover:border-[#7B52EE]/40 text-black hover:text-[#7B52EE] hover:bg-[#F5F2FF] transition-all text-[9.5px] font-mono tracking-widest flex items-center space-x-1.5 cursor-pointer shrink-0 font-bold"
                >
                  <Eye className="h-3.5 w-3.5 text-[#7B52EE]" />
                  <span>SPECS & AMENITIES</span>
                </button>

                <button
                  onClick={() => handleBookSelect(currentStudio.id)}
                  className="flex-1 py-3 bg-[#7B52EE] hover:bg-[#5E27EA] text-white font-mono text-[9.5px] tracking-widest font-bold rounded-full transition-all active:scale-95 flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <span>PLAN THIS STUDIO</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </button>
              </div>

            </div>

          </div>

          {/* HORIZONTAL CAROUSEL FILMSTRIP (All 8 Studios) */}
          <div className="bg-white border border-[#E5E5E7] rounded-[24px] p-4 shadow-inner">
            <span className="font-mono text-[8px] tracking-[0.2em] text-[#5F5E6B] uppercase font-bold block mb-3.5 text-left border-b border-[#F5F5F5] pb-2 px-1">
              SELECT FROM THE PORTFOLIO &bull; ALL RESIDENCES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {displayedStudios.map((studio, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={studio.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative text-left rounded-xl overflow-hidden border p-2 transition-all cursor-pointer h-24 sm:h-28 flex flex-col justify-between ${
                      isActive 
                        ? "border-[#7B52EE] bg-[#F5F2FF]/80 shadow-md ring-1 ring-[#7B52EE]/30" 
                        : "border-[#E5E5E7] bg-white hover:border-[#7B52EE]/50 hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {/* Micro Thumbnail */}
                    <div className="relative h-12 w-full rounded-md overflow-hidden bg-neutral-100 shadow-sm col-span-2">
                      <SmartImage
                        src={studio.images[0]}
                        alt={studio.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/60 text-white font-mono text-[8px] font-bold px-1 rounded">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Micro Header title */}
                    <div className="space-y-0.5 truncate w-full">
                      <span className={`block font-serif text-[10px] truncate leading-tight font-black ${
                        isActive ? "text-[#7B52EE]" : "text-black"
                      }`}>
                        {studio.name.replace("The ", "").replace(" Sanctuary", "").replace(" Premium", " Premium Suite").replace(" Studio", " Room")}
                      </span>
                      <span className="block font-mono text-[8px] text-[#5F5E6B] uppercase">
                        ${studio.basePriceNightUSD} / nt
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Exclusive Studio Specifications Overlay Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in text-black font-sans">
            <div className="bg-white border border-[#E5E5E7] rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl relative">
              {/* Modal header */}
              <div className="relative h-64 bg-[#F5F5F5] font-mono">
                <SmartImage
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-5 right-5 p-2.5 bg-white hover:bg-[#F5F2FF] text-black hover:text-[#7B52EE] rounded-full border border-[#E5E5E7] shadow-md flex items-center justify-center z-10 cursor-pointer transition-all active:scale-95 duration-150"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent"></div>
                <div className="absolute bottom-5 left-8 text-left">
                  <h3 className="font-serif text-2xl font-black text-[#111111] leading-none">{selectedRoom.name}</h3>
                  <p className="text-[10px] font-mono text-[#7B52EE] tracking-wider uppercase mt-1.5 font-bold">{selectedRoom.tagline}</p>
                </div>
              </div>

              {/* Modal details */}
              <div className="p-8 md:p-10 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar text-[#111111] text-left">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 px-5 bg-[#F5F5F5] rounded-[18px] border border-[#E5E5E7] font-mono text-[10px] text-[#5F5E6B]">
                  <div>
                    <span className="text-[#7B52EE] block mb-0.5 uppercase tracking-wider font-bold">ESTIMATED RATE</span>
                    <strong className="text-[#7B52EE] font-bold text-xs">${selectedRoom.basePriceNightUSD} / night</strong>
                  </div>
                  <div>
                    <span className="text-[#7B52EE] block mb-0.5 uppercase tracking-wider font-bold">SIZE FOOTPRINT</span>
                    <strong className="text-[#111111] font-semibold text-xs">{selectedRoom.sizeSquareMeters} m²</strong>
                  </div>
                  <div>
                    <span className="text-[#7B52EE] block mb-0.5 uppercase tracking-wider font-bold">BEDDING TYPE</span>
                    <strong className="text-[#111111] font-semibold text-xs">{selectedRoom.bedType || "King Bed Setup"}</strong>
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
                  <h4 className="font-serif text-[#7B52EE] text-xs font-bold tracking-widest uppercase">
                    Included Amenities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans text-[#5F5E6B]">
                    {selectedRoom.amenities.map((am, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-white border border-[#E5E5E7] p-2 rounded-xl">
                        <Check className="h-3.5 w-3.5 text-[#7B52EE] shrink-0" />
                        <span className="font-light">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Guarantee banner */}
                <div className="p-3.5 bg-[#F5F5F5] border border-[#E5E5E7] rounded-xl text-[9px] font-mono text-[#7B52EE] tracking-widest uppercase flex items-center space-x-3 font-bold">
                  <Shield className="h-4 w-4 text-[#7B52EE] shrink-0" />
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
                  className="px-6 py-2.5 bg-[#7B52EE] hover:bg-[#5E27EA] text-white font-mono text-[9.5px] tracking-widest font-bold rounded-full shadow-sm cursor-pointer"
                >
                  PLAN THIS STUDIO
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive View More trigger under Bento layout */}
        {previewOnly && (
          <div className="mt-16 text-center relative z-20 font-mono">
            <button
              onClick={onViewAll}
              className="px-8 py-4 bg-white hover:bg-[#7B52EE] text-[#7B52EE] hover:text-white border border-[#7B52EE]/40 hover:border-[#7B52EE] rounded-full font-mono text-[9.5px] tracking-[0.25em] font-bold uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center space-x-3.5 mx-auto cursor-pointer"
            >
              <span>DISCOVER ALL 8 RESIDENCES</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
