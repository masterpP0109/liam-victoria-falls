/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Sparkles, Server, Zap, RefreshCw, FileText, Compass, AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PainPointItem {
  id: string;
  category: string;
  title: string;
  symptom: string;
  solution: string;
  outcome: string;
  metrics: string;
}

const PAIN_POINTS: PainPointItem[] = [
  {
    id: "resort-overcrowding",
    category: "EXCLUSIVE SOLITUDE",
    title: "Avoiding the Tourist Resort Paradox",
    symptom: "Massive 200-room luxury hotels in Victoria Falls bring endless tour buses, crowded buffet lines, and noisy pool decks, destroying the tranquil feeling of the African bush.",
    solution: "The Sanctity of Eight. By strictly reserving the estate to only 8 independent studio suites, you enjoy absolute quietude. The infinity lounge, poolside terrace, and rooftop observation decks remain a peaceful haven, often entirely yours.",
    outcome: "A quiet, private retreat with customized personal space and zero-friction lounging.",
    metrics: "Maximum 16 elite guests on-site at any time"
  },
  {
    id: "power-grid-drops",
    category: "INFRASTRUCTURAL SECURITY",
    title: "Pristine Power & Uninterrupted High-Speed Wifi",
    symptom: "Municipal power outages and unstable grid grids are common in Zimbabwe, frequently causing dropped calls, failed zoom meetings, and warm, unlivable hotel rooms.",
    solution: "Autonomous Off-Grid Redundancy. The Liam runs on high-capacity industrial Tesla/Victron solar-lithium energy storage systems. Our water source is filtered from a private, deep-rock borehole, and dual redundant Starlink satellite arrays deliver 200+ Mbps across the estate.",
    outcome: "100% continuous uptime for dual-zone climate portals, chilled micro-kitchens, and server-tier connectivity.",
    metrics: "99.99% independent energy & network uptime guarantee"
  },
  {
    id: "rigid-itineraries",
    category: "BESPOKE FREEDOM",
    title: "Escaping Rigid, Pre-Packaged Tour Timelines",
    symptom: "Standard agents push guests into strict, crowded 5:00 AM group open-safaris, leaving you locked into fixed, uncomfortable timetables that cause travel fatigue.",
    solution: "Private Naturalist Guilds. No micro-management. When you lock in your custom itinerary, you are paired with a dedicated naturalist driver and private cruiser. Go on game drives at your preferred hour, take custom-cooked bush picnics, or arrange deep-sunset boat dispatches at a moment notice.",
    outcome: "Complete authority over your days with flexible start times and spontaneous detours.",
    metrics: "100% private, on-demand executive logistics"
  },
  {
    id: "tech-disconnect",
    category: "WORK-LIFE HARMONY",
    title: "The Silent 'Work-Safari' Disconnect",
    symptom: "High-earning creators, founders, and executives struggle to disconnect entirely. Weak resort hotel Wi-Fi forces you to choose between your boardroom responsibilities and family memory-making.",
    solution: "Seamless Tech-Fusing. Every room features ergonomic workstation desks with fast multi-port charging hubs, combined with our secure local cloud printer. While your family tracks big game with their private guide, you can participate in critical board meetings in our quiet library lounge with flawless fidelity.",
    outcome: "Peace of mind knowing you can instantly log in and handle key decisions without interrupting the vacation.",
    metrics: "Dedicated executive business desks in every residence"
  }
];

export default function PainPoints() {
  const [activeTab, setActiveTab] = useState<string>("resort-overcrowding");

  const currentItem = PAIN_POINTS.find(item => item.id === activeTab) || PAIN_POINTS[0];

  return (
    <section id="solutions" className="py-28 bg-white text-black relative border-b border-[#E5E5E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Module Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-8 text-left space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-[#7B52EE] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              <Shield className="h-4 w-4 text-[#7B52EE]" />
              <span>THE LIAM HOSPITALITY DIFFERENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
              Resolving Elevated <span className="text-[#7B52EE] italic font-normal">Safari Pain Points</span>.
            </h2>
            <p className="text-[#5F5E6B] font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              High-end luxury travel should liberate you, not construct new worries. Here is how Liam's meticulous planning and infrastructure resolve the standard friction points of sub-Saharan hospitality.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right text-left">
            <span className="inline-block text-[9.5px] font-mono text-black uppercase tracking-wider bg-[#F5F2FF] border border-[#7B52EE]/25 px-4 py-2 rounded-full font-bold">
              Autonomous 5-Star Standards
            </span>
          </div>
        </div>

        {/* Master Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Tab Selector Buttons (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5 text-left h-full justify-center">
            <span className="font-mono text-[8px] tracking-[0.15em] text-[#5F5E6B] font-bold block mb-1 uppercase">
              SELECT TRAVEL CONCERN
            </span>
            {PAIN_POINTS.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-4 ${
                    isActive 
                      ? "border-[#7B52EE] bg-[#F5F2FF]/60 shadow-md ring-1 ring-[#7B52EE]/25" 
                      : "border-[#E5E5E7] bg-white hover:border-[#7B52EE]/40 hover:bg-[#F5F5F5]/60"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive 
                      ? "bg-[#7B52EE] border-[#7B52EE] text-white" 
                      : "bg-[#F5F5F5] border-[#E5E5E7] text-[#5F5E6B] group-hover:border-[#7B52EE]"
                  }`}>
                    {item.id === "resort-overcrowding" && <Users className="h-4 w-4" />}
                    {item.id === "power-grid-drops" && <Zap className="h-4 w-4" />}
                    {item.id === "rigid-itineraries" && <Compass className="h-4 w-4" />}
                    {item.id === "tech-disconnect" && <Server className="h-4 w-4" />}
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[8.5px] text-[#7B52EE] font-bold tracking-wider uppercase">
                      {item.category}
                    </span>
                    <strong className="block font-serif text-[13.5px] font-black text-black leading-tight">
                      {item.title}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E5E7] rounded-[32px] p-8 md:p-10 shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 h-44 w-44 bg-[#F5F2FF]/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="space-y-6">
              
              {/* Category indicator */}
              <div className="flex items-center space-x-2 text-[#7B52EE] font-mono text-[9px] uppercase tracking-widest font-semibold pb-4 border-b border-[#F5F5F5]">
                <HelpCircle className="h-4 w-4" />
                <span>DIAGNOSTIC RESOLUTION &bull; {currentItem.category}</span>
              </div>

              {/* Title label */}
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-black tracking-tight">
                {currentItem.title}
              </h3>

              {/* The Patient Pain Point Box */}
              <div className="bg-red-50/50 border border-red-100 p-5 rounded-2xl space-y-2.5">
                <div className="flex items-center space-x-2 text-red-600 font-mono text-[9px] uppercase tracking-wider font-bold">
                  <AlertCircle className="h-4 w-4" />
                  <span>The Client's Real Pain Point</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans font-light">
                  {currentItem.symptom}
                </p>
              </div>

              {/* The Liam Solution Box */}
              <div className="bg-[#F5F2FF]/40 border border-[#7B52EE]/20 p-5 rounded-2xl space-y-2.5">
                <div className="flex items-center space-x-2 text-[#7B52EE] font-mono text-[9px] uppercase tracking-wider font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>How Liam Solves It Perfectly</span>
                </div>
                <p className="text-xs text-neutral-800 leading-relaxed font-sans mt-1">
                  {currentItem.solution}
                </p>
              </div>

            </div>

            {/* Bottom Outcome Summary & Metric indicator */}
            <div className="mt-8 pt-6 border-t border-[#F5F5F5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left space-y-0.5">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#5F5E6B] font-bold block">EXPERIENTIAL OUTCOME</span>
                <span className="text-xs font-serif text-black font-semibold italic">{currentItem.outcome}</span>
              </div>
              
              <div className="bg-[#7B52EE] text-white px-4 py-2 rounded-xl text-left shadow-sm">
                <span className="font-mono text-[8px] uppercase tracking-wider opacity-80 block font-semibold">SECURITY METRIC</span>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold tracking-wide">{currentItem.metrics}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
