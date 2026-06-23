/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { EXPERIENCES } from "../data";
import { Clock, Landmark, ArrowRight, Check, Compass, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import SmartImage from "./SmartImage";

interface ExperiencesProps {
  onSelectExperience: (expId: string) => void;
  selectedExperiences: string[];
  previewOnly?: boolean;
  onViewAll?: () => void;
}

export default function Experiences({ onSelectExperience, selectedExperiences, previewOnly = false, onViewAll }: ExperiencesProps) {
  const [filter, setFilter] = useState<"all" | "adventure" | "relaxation" | "nature">("all");

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (filter === "all") return true;
    return exp.category === filter;
  });

  const displayedExperiences = previewOnly ? filteredExperiences.slice(0, 3) : filteredExperiences;

  return (
    <section id="experiences" className="py-28 bg-[#F5F5F5] relative border-b border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header in HERITAGE style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center space-x-1.5 text-[#4C248C] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              <Compass className="h-3.5 w-3.5 text-[#6D4EB3]" />
              <span>THE ADVENTURE & EXPERIENCE PLATFORM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
              Curated Local <span className="text-[#4C248C] italic">Excursions</span>.
            </h2>
          </div>
          <div className="max-w-md text-left">
            <p className="text-[#5F5E6B] font-sans text-xs sm:text-sm leading-relaxed font-light">
              Victoria Falls represents the apex of raw African nature. We coordinate private helicopter flights, sunset river cruises, and Botswana safaris directly, ensuring absolute comfort.
            </p>
          </div>
        </div>

        {/* Filters and Navigation Ribbon - Styled as a majestic architectural pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E5E5E7]">
          {/* Filters Ribbon */}
          <div className="bg-[#F8F7F9] border border-[#E5E5E7] p-1.5 rounded-full flex flex-wrap gap-1 font-mono text-[9.5px] tracking-widest uppercase">
            {(["all", "adventure", "nature", "relaxation"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                }}
                className={`px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? "bg-[#4C248C] text-white font-bold shadow-sm"
                    : "text-[#5F5E6B] hover:text-black hover:bg-neutral-100"
                }`}
              >
                {cat === "all" ? "All Safaris" : cat}
              </button>
            ))}
          </div>
          
          <div className="font-mono text-[9px] tracking-widest text-[#4C248C] uppercase font-black">
            {filteredExperiences.length} CURATED OPTIONS
          </div>
        </div>

        {/* Premium Asynchronous Bento Grid Layout (12 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {displayedExperiences.map((exp, index) => {
            const isAdded = selectedExperiences.includes(exp.id);
            
            // Strategic Bento Layout spacing rhythm
            const getBentoSpan = (idx: number) => {
              if (previewOnly) {
                if (idx === 0) return "md:col-span-2 lg:col-span-8";
                if (idx === 1) return "md:col-span-1 lg:col-span-4";
                return "md:col-span-2 lg:col-span-12";
              }
              // Full View (all)
              const pattern = idx % 4;
              if (pattern === 0) return "md:col-span-2 lg:col-span-8";
              if (pattern === 1) return "md:col-span-1 lg:col-span-4";
              if (pattern === 2) return "md:col-span-2 lg:col-span-8";
              return "md:col-span-1 lg:col-span-4";
            };

            const colSpanClass = getBentoSpan(index);
            const isWide = colSpanClass.includes("col-span-8") || colSpanClass.includes("col-span-12");
            
            return (
              <div
                key={exp.id}
                className={`bg-white rounded-[28px] overflow-hidden border transition-all duration-500 flex flex-col justify-between h-[510px] group ${colSpanClass} ${
                  isAdded ? "border-[#4C248C] shadow-md ring-1 ring-[#4C248C]/20" : "border-[#E5E5E7] hover:border-[#4C248C]/40 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Photo Frame */}
                  <div className={`relative ${isWide ? "h-72" : "h-64"} overflow-hidden bg-[#F8F7F9]`}>
                    <SmartImage
                      src={exp.image}
                      alt={exp.name}
                      className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E5E5E7] px-3.5 py-1.5 rounded-full text-[8.5px] font-mono text-[#4C248C] font-bold tracking-widest uppercase">
                      {exp.category}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-[#4C248C] border border-[#FAF9FD]/30 text-white px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest font-bold">
                      ${exp.priceUSD}
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-black font-mono text-[9px] tracking-wider border border-[#E5E5E7]">
                      <Clock className="w-3.5 h-3.5 text-[#4C248C]" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-3.5 text-left">
                    <h3 className="font-serif font-black text-lg text-black group-hover:text-[#4C248C] group-hover:underline decoration-1 underline-offset-4 transition-all leading-snug">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-[#5F5E6B] font-sans leading-relaxed line-clamp-2 font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Footer and interactive add triggers with delicate styling */}
                <div className="p-8 pt-0">
                  <div className="flex items-center justify-between text-[8px] font-mono border-t border-[#E5E5E7]/80 pt-4 tracking-widest">
                    <span className="text-[#6D4EB3] font-bold uppercase">ADVENTURE PROFILE:</span>
                    <span className="font-bold text-[#4C248C] uppercase">{exp.adventureLevel}</span>
                  </div>

                  {/* Magnetic look action button */}
                  <button
                    onClick={() => onSelectExperience(exp.id)}
                    className={`w-full mt-5 py-3 rounded-full font-mono text-[9.5px] font-bold tracking-widest transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 ${
                      isAdded
                        ? "bg-[#4C248C] text-white border border-[#4C248C] shadow-inner"
                        : "bg-[#F8F7F9] hover:bg-[#4C248C] hover:text-white text-[#4C248C] border border-[#E5E5E7] hover:border-[#4C248C] shadow-sm"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 shrink-0" />
                        <span>ADDED TO PLAN</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO ITINERARY</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bento Grid Dynamic Expansion Controls */}
        {previewOnly && (
          <div className="mt-12 mb-20 text-center font-mono">
            <button
              onClick={onViewAll}
              className="px-8 py-4 bg-white hover:bg-[#4C248C] text-[#4C248C] hover:text-white border border-[#4C248C]/40 hover:border-[#4C248C] rounded-full font-mono text-[9.5px] tracking-[0.25em] font-bold uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center space-x-3.5 mx-auto cursor-pointer"
            >
              <span>DISCOVER ALL LOCAL JOURNEYS</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Artisans Crafts Location highlight */}
        <div className="bg-[#F8F7F9] rounded-[28px] border border-[#E5E5E7] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 text-left">
            <div className="h-11 w-11 shrink-0 bg-white border border-[#E5E5E7] rounded-full flex items-center justify-center shadow-sm">
              <Landmark className="h-5 w-5 text-[#4C248C]" />
            </div>
            <div>
              <h4 className="font-serif text-black font-black text-sm uppercase tracking-wide">Artisanal Craft Markets</h4>
              <p className="text-xs text-[#5F5E6B] font-sans mt-1.5 leading-relaxed font-light max-w-2xl font-sans">
                We advocate for local master carvers. Enjoy a brief four-minute bike ride down from the lobby to access the famous Elephant's Walk Artist Village.
              </p>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto text-center md:text-right">
            <span className="inline-block text-[9px] font-mono text-[#4C248C] tracking-widest border border-[#E5E5E7] bg-white px-4 py-2 rounded-full uppercase font-bold">
              🚲 COMPLIMENTARY BIKES ON REQUEST
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
