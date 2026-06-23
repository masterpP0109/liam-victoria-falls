/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Studios from "./components/Studios";
import Amenities from "./components/Amenities";
import Experiences from "./components/Experiences";
import Location from "./components/Location";
import Testimonials from "./components/Testimonials";
import StayPlanner from "./components/StayPlanner";
import ReservationsPortal from "./components/ReservationsPortal";
import FloatingConcierge from "./components/FloatingConcierge";
import PainPoints from "./components/PainPoints";
import { PlannerState, ItineraryFeedback, InquiryLead } from "./types";
import { 
  BarChart3, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle,
  Eye,
  Calendar,
  MessageSquare,
  Compass
} from "lucide-react";

export default function App() {
  const [page, setPage] = useState<"home" | "planner" | "portal" | "studios" | "experiences">("home");
  const [inquiries, setInquiries] = useState<InquiryLead[]>([]);
  const [preSelectedRoom, setPreSelectedRoom] = useState<string>("");
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>(["falls-tour", "sunset-cruise"]);

  // Conversion-Focused Realtime Log Tracking State
  const [analyticsLogs, setAnalyticsLogs] = useState<{ id: string; time: string; text: string }[]>([]);
  const [metrics, setMetrics] = useState({
    visits: 1,
    views: 1,
    builderStarts: 0,
    builderCompletions: 0,
    whatsAppClicks: 0,
    formRequests: 0,
    roomInquiries: 0
  });

  // Load inquiries and metrics on startup
  useEffect(() => {
    const saved = localStorage.getItem("liam_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load inquiries:", err);
      }
    }

    const savedMetrics = localStorage.getItem("liam_metrics");
    if (savedMetrics) {
      try {
        const parse = JSON.parse(savedMetrics);
        setMetrics((prev) => ({ ...prev, ...parse, visits: parse.visits + 1 }));
      } catch (err) {
        console.error("Failed to load metrics:", err);
      }
    } else {
      logAnalyticsEvent("System initialized: 5-star CRM & booking system online.");
    }
  }, []);

  // Sync local data
  const syncInquiriesState = (updated: InquiryLead[]) => {
    setInquiries(updated);
    localStorage.setItem("liam_inquiries", JSON.stringify(updated));
  };

  const syncMetricsState = (updatedMetrics: typeof metrics) => {
    setMetrics(updatedMetrics);
    localStorage.setItem("liam_metrics", JSON.stringify(updatedMetrics));
  };

  const logAnalyticsEvent = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAnalyticsLogs((prev) => [{ id: Math.random().toString(), time: timestamp, text: msg }, ...prev.slice(0, 15)]);
  };

  // Tracking Action bindings
  const trackCTAButton = (actionName: string) => {
    logAnalyticsEvent(`Conversion tracked: '${actionName}' CTA trigger registered.`);
    if (actionName.includes("WhatsApp")) {
      const up = { ...metrics, whatsAppClicks: metrics.whatsAppClicks + 1 };
      syncMetricsState(up);
    } else if (actionName.includes("Build") || actionName.includes("Planner")) {
      const up = { ...metrics, builderStarts: metrics.builderStarts + 1 };
      syncMetricsState(up);
    }
  };

  const handleStartPlannerOnHero = () => {
    trackCTAButton("Hero: Build My Custon Stay");
    setPreSelectedRoom("");
    setPage("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreRoomsOnHero = () => {
    trackCTAButton("Hero: Explore 8 Studios");
    const el = document.getElementById("studios");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectRoomOnGrid = (roomId: string) => {
    trackCTAButton(`Rooms: Pre-selected studio '${roomId}'`);
    const up = { ...metrics, roomInquiries: metrics.roomInquiries + 1 };
    syncMetricsState(up);
    
    setPreSelectedRoom(roomId);
    setPage("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleExperienceOnGrid = (expId: string) => {
    setSelectedExcursions((prev) => {
      const isAdded = prev.includes(expId);
      if (isAdded) {
        logAnalyticsEvent(`Itinerary update: Removed experience '${expId}'`);
        return prev.filter((id) => id !== expId);
      } else {
        logAnalyticsEvent(`Itinerary update: Added experience '${expId}'`);
        return [...prev, expId];
      }
    });
  };

  const handlePlanFinished = (plannerData: PlannerState, feedback: ItineraryFeedback) => {
    trackCTAButton("Planner Step: Form finished & submitted");
    const newInquiry: InquiryLead = {
      id: "lead-" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: "pending",
      plannerState: plannerData,
      itineraryFeedback: feedback
    };

    const updated = [newInquiry, ...inquiries];
    syncInquiriesState(updated);

    const upMet = { 
      ...metrics, 
      builderCompletions: metrics.builderCompletions + 1,
      formRequests: metrics.formRequests + 1
    };
    syncMetricsState(upMet);

    logAnalyticsEvent(`CRM lead captured successfully: Registered interest for '${plannerData.guestName}'`);
    
    // Redirect to Portal to review
    setPage("portal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    syncInquiriesState(updated);
    logAnalyticsEvent(`CRM: Trash action - Deleted stay plan #${id.substring(0, 5)}`);
  };

  return (
    <div className="bg-white min-h-screen text-[#111111] selection:bg-[#7B52EE] selection:text-white">
      
      {/* 24/7 Sticky Luxury Navbar */}
      <Navbar 
        onNavigate={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        activePage={page === "studios" || page === "experiences" ? "home" : page}
        submittedInquiryCount={inquiries.length}
      />

      {/* Main routing display */}
      <main>
        {page === "home" ? (
          <>
            <Hero 
              onStartPlanner={handleStartPlannerOnHero}
              onExploreRooms={handleExploreRoomsOnHero}
            />
            <About />
            <Studios 
              onSelectRoom={handleSelectRoomOnGrid} 
              previewOnly={true} 
              onViewAll={() => { setPage("studios"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
            <PainPoints />
            <Amenities />
            <Experiences 
              onSelectExperience={handleToggleExperienceOnGrid}
              selectedExperiences={selectedExcursions}
              previewOnly={true}
              onViewAll={() => { setPage("experiences"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
            <Location />
            <Testimonials />
          </>
        ) : page === "studios" ? (
          <div className="pt-28 min-h-screen bg-[#F5F5F5] pb-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 text-left">
              <button 
                onClick={() => { setPage("home"); setTimeout(() => document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#7B52EE] hover:underline font-bold uppercase cursor-pointer"
              >
                <span>← BACK TO MAIN OVERVIEW</span>
              </button>
            </div>
            <Studios onSelectRoom={handleSelectRoomOnGrid} previewOnly={false} />
          </div>
        ) : page === "experiences" ? (
          <div className="pt-28 min-h-screen bg-[#F5F5F5] pb-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 text-left">
              <button 
                onClick={() => { setPage("home"); setTimeout(() => document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#7B52EE] hover:underline font-bold uppercase cursor-pointer"
              >
                <span>← BACK TO MAIN OVERVIEW</span>
              </button>
            </div>
            <Experiences 
              onSelectExperience={handleToggleExperienceOnGrid}
              selectedExperiences={selectedExcursions}
              previewOnly={false}
            />
          </div>
        ) : page === "planner" ? (
          <StayPlanner 
            onPlanComplete={handlePlanFinished}
            preSelectedRoomId={preSelectedRoom}
          />
        ) : (
          <ReservationsPortal 
            inquiries={inquiries}
            onDeleteInquiry={handleDeleteInquiry}
            onNavigateToPlanner={() => setPage("planner")}
          />
        )}
      </main>

      {/* 24/7 AI Butler Chat Box */}
      <FloatingConcierge />

      {/* Premium Elegant 5-Star Luxury Footer */}
      <footer className="bg-[#F8F7F9] border-t border-[#E5E5E7] py-20 px-6 sm:px-8 lg:px-12 text-[#5F5E6B] font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Column A: Corporate Disclaimer & Brand Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start space-y-3">
              <div className="bg-[#111111] border border-[#7B52EE]/20 text-white rounded-md px-3.5 py-1.5 font-sans flex flex-col items-center justify-center leading-none tracking-widest shrink-0 select-none">
                <span className="font-sans font-black text-xs block leading-none tracking-tight">
                  @LIAM
                </span>
                <span className="text-[6.5px] font-sans font-bold tracking-[0.12em] text-[#7B52EE] block uppercase leading-none mt-1">
                  Victoria Falls
                </span>
              </div>
              <span className="font-serif tracking-[0.12em] text-xs font-black text-[#111111]">THE SANCTUARY HERITAGE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#5F5E6B] max-w-sm font-light">
              An officially classified 5-star boutique bed & breakfast in Victoria Falls, Zimbabwe. We preserve absolute seclusion with just eight individually hand-crafted, air-conditioned studio residences, a private pool deck, and local safaris curated directly by our personal butler desk.
            </p>
            <div className="text-[9.5px] font-mono text-[#7B52EE] tracking-wider uppercase font-bold flex items-center space-x-2">
              <Award className="h-4 w-4 text-[#7B52EE] shrink-0" />
              <span>OFFICIALLY CERTIFIED FIVE-STAR STANDARDS</span>
            </div>
          </div>

          {/* Column B: Direct Booking Assurance */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-[11px] font-black text-[#111111] tracking-widest uppercase">
              The Direct Booking Assurance
            </h4>
            <div className="space-y-3 text-[11px] text-[#5F5E6B] leading-relaxed font-light">
              <p>
                Planning your stay directly with our digital concierge grants you priority access to individual room setups, complimentary hot poolside breakfasts, and direct VIP shuttle tracking.
              </p>
              <div className="flex items-center space-x-2 text-[#7B52EE] font-mono text-[9px] tracking-widest uppercase font-bold">
                <ShieldCheck className="h-4 w-4 text-[#7B52EE] shrink-0" />
                <span>Secure Booking & Private Data Safe</span>
              </div>
            </div>
          </div>

          {/* Column C: Location Details & Estate Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-[11px] font-black text-[#111111] tracking-widest uppercase">
              The Sanctuary
            </h4>
            <div className="space-y-3.5 text-[11px] text-[#5F5E6B] font-mono leading-relaxed">
              <div className="flex items-start space-x-2 font-sans font-light">
                <MapPin className="h-4 w-4 text-[#7B52EE] shrink-0 mt-0.5" />
                <span>324 Oak Avenue, Rockview Heights, Victoria Falls, Zimbabwe</span>
              </div>
              <p className="border-t border-[#E5E5E7] pt-2.5">
                Reservations: <span className="text-[#111111] font-bold">reservations@liamvictoriafalls.com</span>
              </p>
              <p>
                Telephone: <span className="text-[#111111] font-bold">+263 83 284 1234</span>
              </p>
            </div>
          </div>

        </div>

        {/* Outer Legal Line */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#E5E5E7] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#5F5E6B] font-mono uppercase tracking-wider">
          <div className="text-left font-light">
            © {new Date().getFullYear()} Liam Victoria Falls Boutique Hotel. All rights reserved. Registered Zimbabwe Lodging Board #VF-832-5S.
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4 font-bold text-[#7B52EE]">
            <span className="hover:text-[#7B52EE]/80 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-[#7B52EE]/80 transition-colors cursor-pointer">STAY TERMS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

