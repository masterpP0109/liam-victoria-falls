/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { STUDIOS, EXPERIENCES } from "../data";
import { PlannerState, ItineraryFeedback, RoomStudio } from "../types";
import SmartImage from "./SmartImage";
import {
  Compass,
  Users,
  Calendar,
  BedDouble,
  DollarSign,
  Activity,
  Heart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  Plane,
  Plus,
  Minus,
  Sparkles,
  CheckCircle,
  HelpCircle,
  FileText
} from "lucide-react";
import gsap from "gsap";

interface StayPlannerProps {
  onPlanComplete: (plannerData: PlannerState, feedback: ItineraryFeedback) => void;
  preSelectedRoomId?: string;
}

const DEFAULT_STATE: PlannerState = {
  step: 1,
  originCountry: "United States",
  groupType: "couple",
  startDate: new Date().toISOString().split("T")[0],
  lengthOfStay: 3,
  budgetPreference: "premium-luxury",
  roomPreference: "zambezi-studio",
  experienceInterests: ["falls-tour", "sunset-cruise"],
  guestPreferences: ["breakfast", "airport-transfer"],
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  specialRequests: ""
};

const COUNTRIES = [
  "United States", "United Kingdom", "South Africa", "Germany", "Australia", 
  "Canada", "France", "Japan", "United Arab Emirates", "Zimbabwe", "Botswana", "Other"
];

export default function StayPlanner({ onPlanComplete, preSelectedRoomId }: StayPlannerProps) {
  const [state, setState] = useState<PlannerState>(DEFAULT_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const loaderMessages = [
    "Reaching Lead Butler Desk...",
    "Retrieving custom studio floorplans...",
    "Securing premium Zambezi safari slots...",
    "Formulating personalized 5-star digital itinerary...",
  ];

  useEffect(() => {
    if (preSelectedRoomId) {
      setState((prev) => ({
        ...prev,
        roomPreference: preSelectedRoomId,
        step: 2
      }));
    }
  }, [preSelectedRoomId]);

  // Handle dynamic loading message cycling
  useEffect(() => {
    let timer: any;
    if (isGenerating) {
      timer = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loaderMessages.length);
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isGenerating]);

  // Cost calculations
  const getSelectedStudio = (): RoomStudio | undefined => {
    return STUDIOS.find((s) => s.id === state.roomPreference);
  };

  const calculateCosts = () => {
    let nightlyRate = 280; // default baseline
    const studio = getSelectedStudio();
    
    if (state.roomPreference === "full-property") {
      nightlyRate = STUDIOS.reduce((acc, current) => acc + current.basePriceNightUSD, 0) * 0.85; // 15% discount for full buyout
    } else if (state.roomPreference === "multiple-studios") {
      nightlyRate = 280 * 2.5; // average price for 3 studios
    } else if (studio) {
      nightlyRate = studio.basePriceNightUSD;
    }

    const nightlySubtotal = nightlyRate * state.lengthOfStay;
    
    // Experience tickets subtotal
    const experienceSubtotal = state.experienceInterests.reduce((acc, expId) => {
      const expItem = EXPERIENCES.find((e) => e.id === expId);
      if (expItem) {
        const travelerCount = state.groupType === "solo" ? 1 : state.groupType === "family" ? 4 : 2;
        return acc + (expItem.priceUSD * travelerCount);
      }
      return acc;
    }, 0);

    // Guest preferences addons (like Mercedes airport transfer)
    let addonSubtotal = 0;
    if (state.guestPreferences.includes("airport-transfer")) {
      addonSubtotal += 75;
    }
    if (state.guestPreferences.includes("honeymoon-turndown")) {
      addonSubtotal += 120;
    }
    if (state.guestPreferences.includes("private-guide")) {
      addonSubtotal += 150 * state.lengthOfStay;
    }

    const totalEstimate = nightlySubtotal + experienceSubtotal + addonSubtotal;

    return {
      nightlyRate,
      nightlySubtotal,
      experienceSubtotal,
      addonSubtotal,
      totalEstimate
    };
  };

  const costs = calculateCosts();

  // Helper selectors
  const nextStep = () => {
    if (state.step < 9) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const toggleInterest = (id: string) => {
    setState((prev) => {
      const current = prev.experienceInterests;
      const updated = current.includes(id) 
        ? current.filter((x) => x !== id) 
        : [...current, id];
      return { ...prev, experienceInterests: updated };
    });
  };

  const togglePreference = (id: string) => {
    setState((prev) => {
      const current = prev.guestPreferences;
      const updated = current.includes(id) 
        ? current.filter((x) => x !== id) 
        : [...current, id];
      return { ...prev, guestPreferences: updated };
    });
  };

  // Submit and call server-side Gemini Live Concierge API
  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.guestName || !state.guestEmail || !state.guestPhone) {
      alert("Please provide name, email, and phone contact details to generate your customized plan.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plannerState: state })
      });
      
      const data = await response.json();
      
      const feedback: ItineraryFeedback = {
        suggestedStayType: state.groupType.toUpperCase(),
        estimatedNightlyCost: costs.nightlyRate,
        estimatedTotalCost: costs.totalEstimate,
        recommendedRoomIds: state.roomPreference === "full-property" ? STUDIOS.map(s => s.id) : [state.roomPreference],
        suggestedActivityIds: state.experienceInterests,
        conciergeNotes: `Your 5-star custom plan has been compiled. Includes the customized ${getSelectedStudio()?.name || "Studio selection"} and ${state.experienceInterests.length} luxury excursions.`,
        advisorAiOutput: data.advisorAiOutput
      };

      onPlanComplete(state, feedback);
    } catch (err) {
      console.error("Failed to compile custom plan via backend:", err);
      // Fallback
      const genericFeedback: ItineraryFeedback = {
        suggestedStayType: state.groupType.toUpperCase(),
        estimatedNightlyCost: costs.nightlyRate,
        estimatedTotalCost: costs.totalEstimate,
        recommendedRoomIds: [state.roomPreference],
        suggestedActivityIds: state.experienceInterests,
        conciergeNotes: "Stay plan formulated. Our lead butler will review your requests."
      };
      onPlanComplete(state, genericFeedback);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="planner-section" className="py-28 bg-[#FFFFFF] text-black min-h-[90vh] flex items-center relative border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        
        {isGenerating ? (
          /* High-end minimalist loading experience */
          <div className="max-w-md mx-auto text-center py-20 px-8 rounded-[32px] bg-[#F5F5F5] border border-[#E5E5E5] shadow-sm space-y-6 animate-pulse">
            <Loader2 className="h-8 w-8 text-black animate-spin mx-auto" />
            <h3 className="font-serif text-lg font-black text-black tracking-widest uppercase">
              Formulating Itinerary
            </h3>
            <p className="font-mono text-xs text-black font-semibold min-h-[1.5rem]">
              {loaderMessages[loadingMsgIdx]}
            </p>
            <p className="text-[11px] text-[#666666] font-sans leading-relaxed font-light">
              Our 5-star digital concierge is generating customized activity timings, local distance schedules, and dining logs based on your preferred adventure levels.
            </p>
          </div>
        ) : (
          /* Grid Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Box: Step Container */}
            <div className="lg:col-span-7 bg-[#F5F5F5] border border-[#E5E5E5] p-8 sm:p-12 rounded-[36px] shadow-sm space-y-8">
              
              {/* Progress counter & Single-Pixel line */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#666666] uppercase block font-bold">
                      COHORT ITINERARY COMPILER
                    </span>
                    <h3 className="font-serif text-black text-lg font-black">
                      {state.step === 9 ? "Review & Dispatch" : `Step 0${state.step} of 09`}
                    </h3>
                  </div>
                </div>
                
                {/* Horizontal progress bar */}
                <div className="w-full bg-[#E5E5E5] h-[2px] rounded-full overflow-hidden">
                  <div 
                    className="bg-black h-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (state.step / 9) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Forms */}
              {state.step === 1 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Where is your passport origin?</h3>
                  <p className="text-[#666666] text-xs font-light">Border controls at Victoria Falls (Zimbabwe/Botswana) differ based on passport holdings. This helps pre-verify your entry documentation.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country}
                        onClick={() => setState((prev) => ({ ...prev, originCountry: country }))}
                        className={`p-3.5 text-[10.5px] font-mono rounded-xl border text-center transition-all cursor-pointer ${
                          state.originCountry === country
                            ? "bg-black border-black text-white font-bold shadow-sm"
                            : "bg-white border-[#E5E5E5] text-[#666666] hover:border-black hover:text-black font-light"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {state.step === 2 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">What describes your cohort?</h3>
                  <p className="text-[#666666] text-xs font-light">Enables our executive kitchen and estate butlers to customize bedside configurations and special welcome gestures before you cross the gate.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "couple", label: "Romance Setup", desc: "Plush King bed, quiet corner allocation, priority twilight turn-downs." },
                      { id: "honeymoon", label: "Honeymoon Sanctuary", desc: "Complimentary setup champagne, private viewing platform priorities." },
                      { id: "solo", label: "Solo Wilderness Escape", desc: "Dedicated high-speed workspace desk, local bespoke reading amenities." },
                      { id: "family", label: "Family Gathering", desc: "Extended adjoined beds, lawn access pathways, customized safari guides." },
                      { id: "group", label: "Multi-Residence Group", desc: "Arranged adjoined suites, grouped reservations at breakfast." },
                      { id: "business", label: "Corporate Retreat", desc: "Workspace fiber access points, seamless checkout, secure transfers." }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setState((prev) => ({ ...prev, groupType: item.id as any }))}
                        className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-full cursor-pointer ${
                          state.groupType === item.id
                            ? "bg-white border-black text-black"
                            : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                        }`}
                      >
                        <span className="text-xs font-serif font-black text-black uppercase tracking-wide">
                          {item.label}
                        </span>
                        <p className="text-[10px] text-[#666666] font-sans mt-2.5 leading-relaxed font-light">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {state.step === 3 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Verify your target arrival date</h3>
                  <p className="text-[#666666] text-xs font-light">With only eight boutique residences, date parameters help lock individual suite availability in real time.</p>
                  
                  <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] max-w-sm mx-auto flex flex-col items-center shadow-sm">
                    <Calendar className="h-7 w-7 text-black mb-4" />
                    <label className="text-[8.5px] font-mono text-[#666666] uppercase tracking-widest block mb-2.5 font-bold">SELECT DATE</label>
                    <input 
                      type="date"
                      value={state.startDate}
                      onChange={(e) => setState((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-black font-mono text-xs text-center focus:outline-none focus:border-black font-bold"
                    />
                  </div>
                </div>
              )}

              {state.step === 4 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Length of your stay?</h3>
                  <p className="text-[#666666] text-xs font-light">Travelers average 3 to 4 nights to fully absorb rainforest treks, river safaris, and adjoining helicopter runs without feeling rushed.</p>
                  
                  <div className="bg-white p-8 rounded-[24px] border border-[#E5E5E5] flex items-center justify-center space-x-8 max-w-sm mx-auto shadow-sm">
                    <button
                      onClick={() => setState((prev) => ({ ...prev, lengthOfStay: Math.max(1, prev.lengthOfStay - 1) }))}
                      className="h-10 w-10 bg-[#F5F5F5] rounded-full flex items-center justify-center border border-[#E5E5E5] text-black hover:border-black cursor-pointer active:scale-90 duration-150"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <div className="text-center">
                      <span className="font-serif text-4xl font-black text-black block leading-none">{state.lengthOfStay}</span>
                      <span className="text-[9px] font-mono text-[#666666] uppercase tracking-widest block mt-2.5 font-bold">NIGHTS</span>
                    </div>

                    <button
                      onClick={() => setState((prev) => ({ ...prev, lengthOfStay: Math.min(14, prev.lengthOfStay + 1) }))}
                      className="h-10 w-10 bg-[#F5F5F5] rounded-full flex items-center justify-center border border-[#E5E5E5] text-black hover:border-black cursor-pointer active:scale-90 duration-150"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {state.step === 5 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Choose luxury positioning</h3>
                  <p className="text-[#666666] text-xs font-light">We customize packages across various luxury hospitality benchmarks to lock exclusive value rates.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "luxury", label: "Classic Luxury", desc: "Fine studio access, bedside setup, pool, and organic full breakfast. Estimated: $250 - $280/night." },
                      { id: "premium-luxury", label: "Elite Indulgence", desc: "Premier suites (Zambezi / Royal), Mercedes airport transfers, custom safaris included. Estimated: $350 - $480/night." },
                      { id: "group-booking", label: "Resort Buyout", desc: "Takeover booking of 3-8 suites, private manager sunset deck receptions. Estimated: $700 - $1800/night." },
                      { id: "flexible", label: "Keep It Flexible", desc: "Curate individual selections based on on-site guides advice." }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setState((prev) => ({ ...prev, budgetPreference: b.id as any }))}
                        className={`p-5 rounded-2xl border text-left h-full flex flex-col justify-between cursor-pointer ${
                          state.budgetPreference === b.id
                            ? "bg-white border-black text-black"
                            : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                        }`}
                      >
                        <span className="text-xs font-serif font-black text-black uppercase tracking-wide">
                          {b.label}
                        </span>
                        <p className="text-[10px] text-[#666666] font-sans mt-2.5 leading-relaxed font-light">{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {state.step === 6 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Select sanctuary residence</h3>
                  <p className="text-[#666666] text-xs font-light">Bespoke luxury suites individually configured with luxury concrete rainfall ensuite wetrooms.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                    {STUDIOS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setState((prev) => ({ ...prev, roomPreference: s.id }))}
                        className={`p-3.5 rounded-xl border text-left flex items-start space-x-3 cursor-pointer ${
                          state.roomPreference === s.id
                            ? "bg-white border-black text-black"
                            : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                        }`}
                      >
                        <div className="h-11 w-11 shrink-0 rounded-lg overflow-hidden bg-[#E5E5E5]">
                          <SmartImage src={s.images[0]} alt={s.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <strong className="text-xs font-serif font-bold text-black block">{s.name}</strong>
                          <span className="text-[9.5px] font-mono text-[#666666] block font-semibold">${s.basePriceNightUSD} / night</span>
                        </div>
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setState((prev) => ({ ...prev, roomPreference: "multiple-studios" }))}
                      className={`p-3.5 rounded-xl border text-left col-span-1 sm:col-span-2 cursor-pointer ${
                        state.roomPreference === "multiple-studios"
                          ? "bg-white border-black text-black"
                          : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                      }`}
                    >
                      <strong className="text-xs font-serif font-bold text-black block">Multiple Adjoined Suites</strong>
                      <span className="text-[10px] font-sans text-[#666666] block mt-1 leading-normal font-light">Excellent for groups or multi-couple tours looking for shared wings.</span>
                    </button>

                    <button
                      onClick={() => setState((prev) => ({ ...prev, roomPreference: "full-property" }))}
                      className={`p-3.5 rounded-xl border text-left col-span-1 sm:col-span-2 cursor-pointer ${
                        state.roomPreference === "full-property"
                          ? "bg-white border-black text-black"
                          : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                      }`}
                    >
                      <strong className="text-xs font-serif font-bold text-black block">👑 Full Resort Private Buyout (8 Studios)</strong>
                      <span className="text-[10px] font-sans text-[#666666] block mt-1 leading-normal font-light">Rent the complete estate exclusively. Private viewing tower deck butler service.</span>
                    </button>
                  </div>
                </div>
              )}

              {state.step === 7 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Curated local excursions</h3>
                  <p className="text-[#666666] text-xs font-light">Our concierge desk secures priority bookings, saving up to 15% off standard tourist entrance gate rates.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                    {EXPERIENCES.map((e) => {
                      const isChecked = state.experienceInterests.includes(e.id);
                      return (
                        <div
                          key={e.id}
                          onClick={() => toggleInterest(e.id)}
                          className={`p-4 rounded-xl border text-left flex items-start space-x-3 cursor-pointer select-none transition-all ${
                            isChecked
                              ? "bg-white border-black text-black"
                              : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="mt-0.5 accent-black"
                          />
                          <div>
                            <strong className="text-xs font-serif font-black text-black block">{e.name}</strong>
                            <span className="text-[9px] font-mono text-[#666666] block mt-1 font-semibold">{e.duration} • ${e.priceUSD}/person</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {state.step === 8 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Add luxury butler services</h3>
                  <p className="text-[#666666] text-xs font-light">Bespoke amenities to complete a seamless luxury operation under our 5-star standard.</p>
                  
                  <div className="space-y-3">
                    {[
                      { id: "breakfast", label: "Bedside Gourmet Breakfast Daily", desc: "Traditional elements served poolside with organic hot filter coffee.", price: "Included Free" },
                      { id: "airport-transfer", label: "Premium VFA Airport Mercedes Transfer", desc: "Private sedan transfer greeting straight beside the terminal arrival doors.", price: "+$75 Flat" },
                      { id: "honeymoon-turndown", label: "Bespoke Romance Turndown Setup", desc: "Organic champagne, fresh hand-picked roses, and luxury local chocolates.", price: "+$120 Setup" },
                      { id: "private-guide", label: "Dedicated Wilderness Game Naturalist Guide", desc: "Private open 4x4 cruiser and senior safari guide at your command.", price: "+$150 / day" }
                    ].map((addy) => {
                      const isChecked = state.guestPreferences.includes(addy.id);
                      return (
                        <div
                          key={addy.id}
                          onClick={() => togglePreference(addy.id)}
                          className={`p-4 rounded-2xl border text-left flex items-start justify-between space-x-4 cursor-pointer select-none ${
                            isChecked
                              ? "bg-white border-black text-black"
                              : "bg-white border-[#E5E5E5] text-[#666666] hover:border-[#888888]"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="mt-0.5 accent-black"
                            />
                            <div>
                              <strong className="text-xs font-serif font-black text-black block">{addy.label}</strong>
                              <p className="text-[10px] text-[#666666] font-sans mt-1 leading-relaxed font-light">{addy.desc}</p>
                            </div>
                          </div>
                          
                          <span className="font-mono text-[9px] bg-[#F5F5F5] border border-[#E5E5E5] px-2.5 py-1 rounded-full text-black font-bold shrink-0">
                            {addy.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {state.step === 9 && (
                <div className="space-y-6 animate-fade-in text-left">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">Register stay coordinates</h3>
                  <p className="text-[#666666] text-xs font-light">Submit contact coordinates. Our digital butler will compile your customized 5-star local safari itinerary plan instantly.</p>
                  
                  <form onSubmit={handleSubmitPlan} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-[#666666] uppercase tracking-widest block mb-1 font-bold">GUEST NAME *</label>
                        <input
                          type="text"
                          required
                          value={state.guestName}
                          onChange={(e) => setState((prev) => ({ ...prev, guestName: e.target.value }))}
                          placeholder="Elena Sterling"
                          className="w-full bg-white border border-[#E5E5E5] rounded-xl p-3.5 text-black font-serif text-sm focus:outline-none focus:border-black font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-[#666666] uppercase tracking-widest block mb-1 font-bold">GUEST EMAIL *</label>
                        <input
                          type="email"
                          required
                          value={state.guestEmail}
                          onChange={(e) => setState((prev) => ({ ...prev, guestEmail: e.target.value }))}
                          placeholder="elena@sterling.com"
                          className="w-full bg-white border border-[#E5E5E5] rounded-xl p-3.5 text-black font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-[#666666] uppercase tracking-widest block mb-1 font-bold">WHATSAPP CONTACT *</label>
                        <input
                          type="tel"
                          required
                          value={state.guestPhone}
                          onChange={(e) => setState((prev) => ({ ...prev, guestPhone: e.target.value }))}
                          placeholder="+44 7700 900077"
                          className="w-full bg-white border border-[#E5E5E5] rounded-xl p-3.5 text-black font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-[#666666] uppercase tracking-widest block mb-2 font-bold font-mono">SPECIAL CONCIERGE OR DIETARY REQUESTS</label>
                      <textarea
                        value={state.specialRequests}
                        onChange={(e) => setState((prev) => ({ ...prev, specialRequests: e.target.value }))}
                        rows={3}
                        placeholder="Dietary credentials (such as gluten-free) or late flight transfers details..."
                        className="w-full bg-white border border-[#E5E5E5] rounded-xl p-3.5 text-black focus:outline-none focus:border-black font-sans font-light"
                      />
                    </div>

                    {/* Submit Row */}
                    <div className="pt-4 border-t border-[#E5E5E7] text-right">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-[#7B52EE] hover:bg-[#7B52EE]/90 text-white font-mono font-bold tracking-widest text-[9.5px] rounded-full shadow-sm active:scale-95 transition-all flex items-center space-x-2 ml-auto cursor-pointer"
                      >
                        <Plane className="h-4 w-4 text-white" />
                        <span>COMPILE CUSTOM PLAN & DISPATCH AI</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Navigation Button Block */}
              {state.step < 9 && (
                <div className="pt-6 border-t border-[#E5E5E7] flex items-center justify-between">
                  {state.step > 1 ? (
                    <button
                      onClick={prevStep}
                      className="px-5 py-2.5 font-mono text-[9.5px] font-bold tracking-widest text-[#5F5E6B] hover:text-[#7B52EE] flex items-center space-x-1 border border-[#E5E5E7] rounded-full bg-white shadow-sm cursor-pointer active:scale-95 duration-150"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>PREVIOUS</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-[#7B52EE] hover:bg-[#7B52EE]/90 text-white font-mono font-bold text-[9.5px] tracking-widest rounded-full flex items-center space-x-1 shadow-sm cursor-pointer active:scale-95 transition-transform"
                  >
                    <span>NEXT PROCEDURES</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

            </div>

            {/* Right Box: Dynamic Paper-like Bill/Stay Summary ticket (5 cols) */}
            <aside className="lg:col-span-5 bg-[#F5F5F5] border border-[#E5E5E7] p-8 rounded-[36px] space-y-6 shadow-inner">
              <span className="font-mono text-[9px] tracking-widest text-[#7B52EE] uppercase block border-b border-[#E5E5E7] pb-3.5 font-bold">
                DYNAMIC RETREAT ESTIMATE
              </span>

              {/* Accommodation detail item */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#7B52EE] font-bold block uppercase tracking-wider">Accommodations</span>
                {state.roomPreference ? (
                  <div className="bg-white p-4 rounded-xl border border-[#E5E5E7] flex items-center justify-between shadow-sm">
                    <div>
                      <strong className="text-xs text-black font-black font-serif block leading-none">
                        {state.roomPreference === "full-property" 
                          ? "Entire Resort Private Takeover" 
                          : state.roomPreference === "multiple-studios" 
                          ? "Multiple Adjoined Suites" 
                          : getSelectedStudio()?.name || "Boutique Residence"}
                      </strong>
                      <span className="text-[10px] font-mono text-[#5F5E6B] block mt-1.5 font-medium">
                        {state.lengthOfStay} nights @ ${costs.nightlyRate} / night
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#7B52EE] shrink-0">
                      ${costs.nightlySubtotal}
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] italic text-[#5F5E6B] font-light">No room selected yet...</p>
                )}
              </div>

              {/* Excursions detail item */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#7B52EE] font-bold block uppercase tracking-wider">Safari Itineraries</span>
                {state.experienceInterests.length > 0 ? (
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                    {state.experienceInterests.map((expId) => {
                      const exp = EXPERIENCES.find((e) => e.id === expId);
                      if (!exp) return null;
                      const travellersCount = state.groupType === "solo" ? 1 : state.groupType === "family" ? 4 : 2;
                      return (
                        <div key={expId} className="bg-white p-3 rounded-lg border border-[#E5E5E7] flex items-center justify-between font-mono text-[10px] shadow-sm">
                          <div>
                            <span className="text-black font-bold font-sans block leading-none">{exp.name}</span>
                            <span className="text-[#5F5E6B] text-[9px] block mt-1">
                              {travellersCount} Guests @ ${exp.priceUSD}/ea
                            </span>
                          </div>
                          <span className="text-[#7B52EE] font-bold shrink-0">${exp.priceUSD * travellersCount}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] italic text-[#5F5E6B] font-light">No tours added yet. Use the Curated Journeys feed...</p>
                )}
              </div>

              {/* Addons summary */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#7B52EE] font-bold block uppercase tracking-wider">Services Custom</span>
                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#E5E5E7]">
                    <span className="text-[#5F5E6B]">Gourmet Bedroom Breakfast</span>
                    <span className="text-[#7B52EE] uppercase text-[9px] font-bold">Free Benefit</span>
                  </div>
                  {state.guestPreferences.includes("airport-transfer") && (
                    <div className="flex items-center justify-between py-1.5 border-b border-[#E5E5E7]">
                      <span className="text-[#5F5E6B]">VIP Airport Transfer Shuttle</span>
                      <span className="text-[#7B52EE] font-bold">+$75</span>
                    </div>
                  )}
                  {state.guestPreferences.includes("honeymoon-turndown") && (
                    <div className="flex items-center justify-between py-1.5 border-b border-[#E5E5E7]">
                      <span className="text-[#5F5E6B]">Champagne Romance turn-down</span>
                      <span className="text-[#7B52EE] font-bold">+$120</span>
                    </div>
                  )}
                  {state.guestPreferences.includes("private-guide") && (
                    <div className="flex items-center justify-between py-1.5 border-b border-[#E5E5E7]">
                      <span className="text-[#5F5E6B]">Private Naturalist Guide ({state.lengthOfStay} days)</span>
                      <span className="text-[#7B52EE] font-bold">+$ {150 * state.lengthOfStay}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Calculation panel */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E5E7] space-y-3.5 shadow-md">
                <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3.5">
                  <span className="font-serif text-sm font-black text-black">Estimated Quote</span>
                  <strong className="font-mono text-xl text-[#7B52EE] font-black">
                    ${costs.totalEstimate}
                  </strong>
                </div>

                <div className="text-[9px] font-mono text-[#5F5E6B] leading-relaxed space-y-1.5 uppercase font-bold tracking-wider">
                  <div className="flex items-center space-x-1.5 text-[#7B52EE]">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>Bedside Breakfast Benefit Applied</span>
                  </div>
                  <div className="flex items-center space-x-1.5 font-mono">
                    <Shield className="h-3.5 w-3.5 shrink-0 text-[#7B52EE]" />
                    <span>Secure 5-Star Stay Registration</span>
                  </div>
                </div>
              </div>

            </aside>

          </div>
        )}

      </div>
    </section>
  );
}
