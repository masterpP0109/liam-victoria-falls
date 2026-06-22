/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { InquiryLead, RoomStudio } from "../types";
import { STUDIOS, EXPERIENCES } from "../data";
import {
  MessageSquare,
  Mail,
  Trash2,
  Calendar,
  Bed,
  CheckCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";

interface ReservationsPortalProps {
  inquiries: InquiryLead[];
  onDeleteInquiry: (id: string) => void;
  onNavigateToPlanner: () => void;
}

export default function ReservationsPortal({ inquiries, onDeleteInquiry, onNavigateToPlanner }: ReservationsPortalProps) {
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(
    inquiries.length > 0 ? inquiries[0].id : null
  );
  
  // Keep active index robust if lists shift
  const activeInquiry = inquiries.find((i) => i.id === activeInquiryId) || inquiries[0];

  const getStudioDetail = (roomId: string): RoomStudio | undefined => {
    return STUDIOS.find((s) => s.id === roomId);
  };

  // Compile pre-filled WhatsApp API links dynamically
  const generateWhatsAppUrl = (lead: InquiryLead) => {
    const s = lead.plannerState;
    const fb = lead.itineraryFeedback;
    const studio = getStudioDetail(s.roomPreference);
    
    const excursionsStr = s.experienceInterests
      .map((id) => EXPERIENCES.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Hi Liam Victoria Falls! I just formulated my custom stay on your planner deck. 
- *Guest Name*: ${s.guestName}
- *Origin*: ${s.originCountry}
- *Cohort*: ${s.groupType}
- *Stay Dates*: ${s.startDate} (${s.lengthOfStay} Nights)
- *Accommodations*: ${s.roomPreference === "full-property" ? "Full Property Takeover" : studio?.name || "Boutique Studio"}
- *Curated Tours*: ${excursionsStr || "None"}
- *Special Request*: ${s.specialRequests || "None"}
- *Estimated Budget*: $${fb.estimatedTotalCost} subtotal
Please review our dates and advise availability to authorize our reservation!`;

    return `https://wa.me/263772000000?text=${encodeURIComponent(text)}`;
  };

  // Compile pre-filled outlook/mail client draft
  const generateMailtoUrl = (lead: InquiryLead) => {
    const s = lead.plannerState;
    const fb = lead.itineraryFeedback;
    const subject = `Liam Victoria Falls Custom Stay Inquiry - ${s.guestName}`;
    const body = `Liam Victoria Falls Concierge Desk,

I have planned my custom stay via your digital advisor!

RESERVATION DATA SHEET:
- Lead Traveler: ${s.guestName}
- Nationality: ${s.originCountry}
- Group Category: ${s.groupType}
- Arrival Date: ${s.startDate}
- Stay Nights: ${s.lengthOfStay} nights
- Studio: ${s.roomPreference}
- Excursions selected: ${s.experienceInterests.join(", ")}
- Special requests: ${s.specialRequests}

ESTIMATED PRICING PACKAGE:
- Package subtotal estimate: $${fb.estimatedTotalCost} USD

Kindly confirm room availability and dispatch payment options to guarantee our booking.

Kind regards,
${s.guestName}
${s.guestPhone}`;

    return `mailto:reservations@liamvictoriafalls.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="portal-section" className="py-28 bg-[#FFFFFF] text-black min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-[#E5E5E5] pb-10 mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 text-[#666666] font-mono text-[9px] tracking-[0.25em] uppercase">
              <Award className="h-3.5 w-3.5 text-black" />
              <span>DIGITAL CONCIERGE PORTAL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
              My Stay Planner Desk.
            </h1>
            <p className="text-[#666666] font-sans text-xs sm:text-sm max-w-xl font-light mt-3 leading-relaxed">
              Review saved custom itineraries, track active travel details, and instantly authorize formal reservation coordinates directly to our booking department.
            </p>
          </div>
          
          <div className="shrink-0 flex items-center space-x-3 text-xs font-mono">
            <span className="bg-black text-white border border-black px-4 py-2 rounded-full flex items-center space-x-2.5 text-[8.5px] font-bold tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
              <span>ESTATE DESK LIVE SECURED</span>
            </span>
          </div>
        </div>

        {inquiries.length === 0 ? (
          /* Empty State */
          <div className="max-w-lg mx-auto text-center py-16 bg-[#F5F5F5] border border-[#E5E5E5] p-10 rounded-[32px] space-y-6 shadow-sm">
            <Clock className="h-10 w-10 text-[#666666] mx-auto animate-pulse" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-black text-black">No Custom Stay Plans Compiled</h3>
              <p className="text-xs text-[#666666] max-w-sm mx-auto leading-relaxed font-light">
                Compose custom itineraries by adjusting dates, specifying rooms, and getting instant customized advice from our expert digital butler deck.
              </p>
            </div>
            <button
              onClick={onNavigateToPlanner}
              className="px-6 py-3 bg-black hover:bg-black/90 text-white font-mono font-bold text-[9.5px] tracking-widest rounded-full shadow-sm transition-transform active:scale-95 cursor-pointer inline-flex items-center space-x-1.5"
            >
              <span>COMPOSE MY CUSTOM STAY</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* Main active container split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Sidebar List of inquiryleads (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#666666] uppercase block font-bold">
                COMPILED PLANS ({inquiries.length})
              </span>
              
              <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                {inquiries.map((lead) => {
                  const s = lead.plannerState;
                  const isActive = lead.id === activeInquiryId;
                  const room = getStudioDetail(s.roomPreference);
                  return (
                    <div
                      key={lead.id}
                      onClick={() => setActiveInquiryId(lead.id)}
                      className={`p-5 rounded-[22px] border text-left cursor-pointer transition-all ${
                        isActive
                          ? "bg-white border-black shadow-md scale-[1.015]"
                          : "bg-[#F5F5F5] border-[#E5E5E5] hover:border-[#888888]"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[8.5px] text-[#666666] border-b border-[#E5E5E5]/60 pb-2 mb-3">
                        <span className="font-bold">PLAN ID: #{lead.id.substring(0,6).toUpperCase()}</span>
                        <span className="text-black font-semibold">{s.startDate}</span>
                      </div>
                      
                      <h4 className="font-serif text-sm font-black text-black truncate uppercase tracking-wide">
                        {s.guestName || "Estuarine Traveler"}
                      </h4>
                      
                      <p className="text-[11px] text-[#666666] font-sans mt-1 line-clamp-1 font-light">
                        {s.lengthOfStay} nights • {room?.name || "Boutique Residence"}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-[10px] font-mono leading-none">
                        <span className="bg-[#F5F5F5] border border-[#E5E5E5] text-black px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider">
                          {s.groupType}
                        </span>
                        <span className="text-black font-bold">${lead.itineraryFeedback.estimatedTotalCost}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right details panel (8 cols) */}
            <div className="lg:col-span-8 bg-[#F5F5F5] border border-[#E5E5E5] p-6 sm:p-10 rounded-[32px] shadow-sm space-y-8">
              
              {activeInquiry && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E5E5] pb-6 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 text-[#666666] font-mono text-[8.5px] uppercase tracking-widest font-bold mb-1">
                        <span>ESTATE REQUEST ID: #{activeInquiry.id.toUpperCase()}</span>
                        <span>•</span>
                        <span>COMPILED {new Date(activeInquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl font-black text-black leading-none">
                        {activeInquiry.plannerState.guestName}'s Stay.
                      </h2>
                    </div>

                    {/* Active Status */}
                    <div className="shrink-0 flex items-center space-x-2 bg-white border border-[#E5E5E5] px-3.5 py-1.5 rounded-full text-black font-mono text-[9px] uppercase font-bold tracking-wider">
                      <Clock className="w-3.5 h-3.5 animate-spin shrink-0 text-black animate-duration-1000" />
                      <span>PENDING VERIFICATION</span>
                    </div>
                  </div>

                  {/* Summary grid details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-[#E5E5E5] font-mono text-[10px] text-[#666666]">
                    <div>
                      <span className="text-[#888888] block mb-0.5 uppercase tracking-wide">Residence</span>
                      <strong className="text-black block text-xs font-semibold leading-relaxed truncate">
                        {getStudioDetail(activeInquiry.plannerState.roomPreference)?.name || "Full Buyout"}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#888888] block mb-0.5 uppercase tracking-wide">Category</span>
                      <strong className="text-black block text-xs font-semibold leading-relaxed capitalize">
                        {activeInquiry.plannerState.groupType}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#888888] block mb-0.5 uppercase tracking-wide">Duration</span>
                      <strong className="text-black block text-xs font-semibold leading-relaxed">
                        {activeInquiry.plannerState.lengthOfStay} Nights
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#888888] block mb-0.5 uppercase tracking-wide">Total Quote</span>
                      <strong className="text-black block text-xs font-black">
                        ${activeInquiry.itineraryFeedback.estimatedTotalCost}
                      </strong>
                    </div>
                  </div>

                  {/* Selected Excursions list */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-xs font-black text-black tracking-widest uppercase pb-1 border-b border-[#E5E5E5]/60">
                      Excursion Tickets
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-black">
                      {activeInquiry.plannerState.experienceInterests.map((expId) => {
                        const exp = EXPERIENCES.find((e) => e.id === expId);
                        if (!exp) return null;
                        return (
                          <div key={expId} className="bg-white border border-[#E5E5E5] p-4 rounded-xl flex items-center space-x-3 shadow-inner">
                            <CheckCircle className="h-4 w-4 text-black shrink-0" />
                            <div>
                              <strong className="text-black font-black font-serif block text-xs leading-none">{exp.name}</strong>
                              <span className="text-[9.5px] font-mono text-[#666666] block mt-1.5 font-semibold">{exp.duration} • prebooked slot</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Response Block */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-1.5 text-black font-mono text-[9px] uppercase font-bold tracking-widest">
                      <Sparkles className="h-4.5 w-4.5 text-black" />
                      <span>LOBBY BUTLER DRAFT ADVICE • POWERED BY GEMINI AI</span>
                    </div>

                    <div className="bg-white border border-[#E5E5E5] p-6 rounded-2xl relative">
                      <div className="font-sans text-xs leading-relaxed text-[#666666] space-y-4 max-h-[350px] overflow-y-auto pr-1 font-light custom-scrollbar">
                        {activeInquiry.itineraryFeedback.advisorAiOutput ? (
                          <div className="whitespace-pre-line text-xs">
                            {activeInquiry.itineraryFeedback.advisorAiOutput}
                          </div>
                        ) : (
                          <p className="text-[#666666] italic">Concierge analysis drafted. Ready for review...</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Authorization Triggers */}
                  <div className="space-y-4 pt-6 border-t border-[#E5E5E5]">
                    <span className="font-mono text-[8.5px] tracking-[0.25em] text-[#666666] uppercase block font-bold">
                      AUTHORIZE CONCIERGE RESORT DISPATCH
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* WhatsApp Priority */}
                      <a
                        href={generateWhatsAppUrl(activeInquiry)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-black border border-black hover:bg-black/90 text-white rounded-xl transition-all font-serif flex items-center justify-center space-x-3.5 group cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="h-5 w-5 text-white shrink-0" />
                        <div className="text-left font-serif">
                          <span className="block text-white font-black text-sm leading-tight uppercase tracking-wider">Authorize WhatsApp</span>
                          <span className="block text-[9px] font-mono text-white/80 font-semibold uppercase tracking-widest mt-0.5">Priority 2-min locks</span>
                        </div>
                      </a>

                      {/* Email option */}
                      <a
                        href={generateMailtoUrl(activeInquiry)}
                        className="p-4 bg-white hover:bg-[#F5F5F5] border border-[#E5E5E5] text-black rounded-xl transition-all font-mono text-xs tracking-wider flex items-center justify-center space-x-3 cursor-pointer"
                      >
                        <Mail className="h-5 w-5 text-black shrink-0" />
                        <div className="text-left font-mono">
                          <span className="block text-black font-bold leading-tight uppercase text-[10px] tracking-wider">Dispatch Email Copy</span>
                          <span className="block text-[8.5px] text-[#666666] mt-1 tracking-wider uppercase font-semibold">Pre-compiled attachment</span>
                        </div>
                      </a>

                    </div>

                    {/* Delete Plan trigger */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => onDeleteInquiry(activeInquiry.id)}
                        className="text-[#666666] hover:text-red-600 font-mono text-[9px] uppercase tracking-widest flex items-center space-x-1 p-2 border border-transparent hover:border-[#E5E5E5] rounded-full cursor-pointer duration-150"
                        title="Delete itinerary details"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>SCRAP THIS STAY PLAN</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
