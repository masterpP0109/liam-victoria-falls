/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, ChevronLeft, ChevronRight, Award, Trophy, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  // Custom counting states
  const [scoreCount, setScoreCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [studiosCount, setStudiosCount] = useState(0);
  const [distanceCount, setDistanceCount] = useState(5);

  const activeReview = TESTIMONIALS[activeIdx];

  // Stat counting triggers with ScrollTrigger
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#stats-metric-trigger",
      start: "top 85%",
      onEnter: () => {
        // Count score up to 5.0
        let scoreVal = 0;
        const scoreInterval = setInterval(() => {
          scoreVal += 0.5;
          if (scoreVal >= 5.0) {
            setScoreCount(5.0);
            clearInterval(scoreInterval);
          } else {
            setScoreCount(scoreVal);
          }
        }, 80);

        // Count satisfaction to 100%
        let satVal = 0;
        const satInterval = setInterval(() => {
          satVal += 10;
          if (satVal >= 100) {
            setSatisfactionCount(100);
            clearInterval(satInterval);
          } else {
            setSatisfactionCount(satVal);
          }
        }, 50);

        // Count studios to 8
        let stdVal = 0;
        const stdInterval = setInterval(() => {
          stdVal += 1;
          if (stdVal >= 8) {
            setStudiosCount(8);
            clearInterval(stdInterval);
          } else {
            setStudiosCount(stdVal);
          }
        }, 100);
      }
    });
  }, []);

  // Animating transition between reviews
  const handleReviewChange = (newIdx: number) => {
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        opacity: 0,
        x: -15,
        duration: 0.25,
        onComplete: () => {
          setActiveIdx(newIdx);
          gsap.fromTo(quoteRef.current, 
            { opacity: 0, x: 15 },
            { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
          );
        }
      });
    } else {
      setActiveIdx(newIdx);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % TESTIMONIALS.length;
    handleReviewChange(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    handleReviewChange(prevIdx);
  };

  return (
    <section id="testimonials" className="py-28 bg-[#F8F7F9] text-[#111111] relative border-t border-b border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header in Heritage Style */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-block text-[#6D4EB3] font-mono text-[9px] tracking-[0.25em] uppercase mb-4 font-bold flex items-center gap-1.5 font-mono">
            <Trophy className="h-3.5 w-3.5" /> GUEST TESTIMONIALS & TRUSTED METRICS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight leading-none font-serif">
            The Liam Legacy in <span className="text-[#4C248C] italic">Words</span>.
          </h2>
        </div>

        {/* Master Single-Card Spotlight Carousel Layout */}
        <div className="bg-white border border-[#E5E5E7] rounded-[36px] p-8 sm:p-12 md:p-16 relative shadow-md min-h-[420px] flex flex-col justify-between">
          {/* Accent decoration Quote mark */}
          <div className="absolute top-10 right-10 text-[#E5E5E7] opacity-30 select-none">
            <Quote className="h-24 w-24 stroke-1" />
          </div>

          <div ref={quoteRef} className="space-y-6 max-w-4xl text-left">
            {/* Stars Rating Row */}
            <div className="flex items-center space-x-1.5" id="testimonial-aspect-stars">
              <div className="flex -space-x-0.5">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 text-[#6D4EB3] fill-[#6D4EB3] shrink-0" />
                ))}
              </div>
              <span className="text-[8.5px] font-mono text-[#4C248C] bg-[#FAF9FD] border border-[#E5E5E7] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                ASPECT: {activeReview.aspect}
              </span>
            </div>

            {/* Content Quotation with Massive elegance */}
            <p className="font-serif text-xl sm:text-2xl md:text-3.5xl text-[#111111] leading-relaxed tracking-tight italic">
              "{activeReview.content}"
            </p>

            {/* Review Author Frame */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-[#FAF9FD] gap-4">
              <div className="font-mono text-xs">
                <strong className="text-[#111111] block text-base font-black font-mono">{activeReview.author}</strong>
                <span className="text-[#5F5E6B] text-[10px] block mt-1 tracking-wider uppercase font-mono">{activeReview.country}</span>
              </div>
              
              <div className="font-mono text-xs text-left sm:text-right flex items-center sm:justify-end space-x-3">
                <div>
                  <span className="text-[#111111] font-semibold block text-[10px] tracking-wider uppercase font-mono">{activeReview.date}</span>
                  <div className="text-[8.5px] text-[#00C853] font-bold uppercase tracking-widest flex items-center mt-1">
                    <ShieldCheck className="h-4 w-4 text-[#00C853] mr-1 shrink-0" />
                    <span>VERIFIED GUEST STAY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Interactive Controls (Arrow navigators) */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#F5F5F5]">
            <div className="hidden sm:flex items-center space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleReviewChange(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? "w-6 bg-[#00C853]" : "w-1.5 bg-[#E5E5E7] hover:bg-[#00C853]"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrev}
                className="p-3 bg-white border border-[#E5E5E7] hover:border-[#00C853] text-[#00C853] hover:bg-[#F5F5F5] rounded-full transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white border border-[#E5E5E7] hover:border-[#00C853] text-[#00C853] hover:bg-[#F5F5F5] rounded-full transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Counters Metric Trigger Section */}
        <div 
          id="stats-metric-trigger"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-[#E5E5E7] text-center font-serif"
        >
          <div className="space-y-2">
            <span className="font-serif text-4xl sm:text-5xl font-black text-[#F5B800] block tracking-tight">
              {scoreCount.toFixed(1)}
            </span>
            <span className="text-[8.5px] font-mono text-[#5F5E6B] tracking-[0.2em] block uppercase font-bold">
              CONDE NAST AGGREGATE
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-4xl sm:text-5xl font-black text-[#F5B800] block tracking-tight">
              {satisfactionCount}%
            </span>
            <span className="text-[8.5px] font-mono text-[#5F5E6B] tracking-[0.2em] block uppercase font-bold">
              SATISFACTION RATING
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-4xl sm:text-5xl font-black text-[#F5B800] block tracking-tight">
              {studiosCount}
            </span>
            <span className="text-[8.5px] font-mono text-[#5F5E6B] tracking-[0.2em] block uppercase font-bold">
              INDIVIDUAL RESIDENCES
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-4xl sm:text-5xl font-black text-[#F5B800] block tracking-tight">
              {distanceCount}
            </span>
            <span className="text-[8.5px] font-mono text-[#5F5E6B] tracking-[0.2em] block uppercase font-bold">
              MINS TO WATERFALL GATE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
