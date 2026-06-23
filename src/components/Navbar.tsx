/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Compass, Menu, X, Calendar, UserSquare2 } from "lucide-react";
import gsap from "gsap";

interface NavbarProps {
  onNavigate: (page: "home" | "planner" | "portal") => void;
  activePage: "home" | "planner" | "portal";
  submittedInquiryCount: number;
}

export default function Navbar({ onNavigate, activePage, submittedInquiryCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP sticky scroll micro-scale down contraction
  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        scale: scrolled ? 0.96 : 1.0,
        y: scrolled ? 6 : 0,
        paddingLeft: scrolled ? "1.25rem" : "1.75rem",
        paddingRight: scrolled ? "1.25rem" : "1.75rem",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
        boxShadow: scrolled ? "0 10px 35px -10px rgba(123, 82, 238, 0.07), 0 1px 3px rgba(229, 229, 231, 0.4)" : "0 1px 2px rgba(0,0,0,0.01)",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [scrolled]);

  const handleLinkClick = (page: "home" | "planner" | "portal", sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    if (sectionId && page === "home") {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 flex justify-center pointer-events-none">
      {/* Centered Capsule Container */}
      <div
        ref={navContainerRef}
        id="navbar-capsule"
        className="w-full max-w-5xl h-14 bg-white/80 backdrop-blur-xl border border-[#E5E5E7] px-7 rounded-full flex items-center justify-between pointer-events-auto transition-colors duration-300 shadow-sm"
      >
        {/* Brand Logo - Left */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => handleLinkClick("home")}
          id="nav-logo"
        >
          <Compass className="h-4.5 w-4.5 text-[#7B52EE] group-hover:rotate-45 transition-transform duration-500" />
          <div className="flex flex-col text-left">
            <span className="font-serif tracking-[0.22em] text-black font-black text-xs leading-none">
              LIAM
            </span>
            <span className="text-[10px] font-sans tracking-[0.08em] text-[#7B52EE] uppercase leading-none mt-0.5 font-bold">
              Victoria Falls
            </span>
          </div>
        </div>

        {/* Navigation Links - Center (Desktop) */}
        <nav className="hidden md:flex items-center space-x-7 font-sans text-xs tracking-wider text-[#5F5E6B] font-semibold">
          <button
            onClick={() => handleLinkClick("home", "about")}
            className={`hover:text-[#7B52EE] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold ${
              activePage === "home" ? "hover:text-[#7B52EE]" : ""
            }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => handleLinkClick("home", "studios")}
            className="hover:text-[#7B52EE] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
          >
            STUDIOS
          </button>
          <button
            onClick={() => handleLinkClick("home", "amenities")}
            className="hover:text-[#7B52EE] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
          >
            AMENITIES
          </button>
          <button
            onClick={() => handleLinkClick("home", "experiences")}
            className="hover:text-[#7B52EE] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
          >
            EXPERIENCES
          </button>
          <button
            onClick={() => handleLinkClick("home", "location")}
            className="hover:text-[#7B52EE] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
          >
            LOCATION
          </button>

          {/* User Custom Plans Page */}
          <button
            id="nav-plans-link"
            onClick={() => handleLinkClick("portal")}
            className={`relative flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all font-bold ${
              activePage === "portal"
                ? "bg-[#7B52EE]/10 text-[#7B52EE] border-[#7B52EE]/30"
                : "border-transparent text-[#5F5E6B] hover:text-[#7B52EE] hover:border-[#E5E5E7]"
            }`}
          >
            <UserSquare2 className="h-3.5 w-3.5 text-[#7B52EE]" />
            <span>MY PLANS</span>
            {submittedInquiryCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7B52EE] text-white font-sans font-bold text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center">
                {submittedInquiryCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Call / Toggle - Right */}
        <div className="flex items-center space-x-2.5">
          {/* Calendar Planner CTA (Desktop) */}
          <button
            id="nav-planner-cta"
            onClick={() => handleLinkClick("planner")}
            className={`hidden md:flex font-sans tracking-wide text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 items-center space-x-1.5 ${
              activePage === "planner"
                ? "bg-[#7B52EE]/10 text-[#7B52EE] border border-[#7B52EE]/20"
                : "bg-[#7B52EE] hover:bg-[#5E27EA] text-white active:scale-95 shadow-sm"
            }`}
          >
            <Calendar className="h-3 w-3 text-white" />
            <span>PLAN STAY</span>
          </button>

          {/* Mobile Menu Button (Mobile) */}
          <button
            id="nav-mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-1.5 text-black hover:bg-[#7B52EE]/5 rounded-full md:hidden flex items-center justify-center transition-colors shadow-none"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Container */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border border-[#E5E5E7] w-[calc(100%-2rem)] max-w-sm rounded-[24px] absolute top-16 right-4 py-5 px-5 space-y-4 shadow-xl z-50 animate-fade-in pointer-events-auto text-left">
          <div className="flex flex-col space-y-2 font-sans text-xs tracking-wider text-[#5F5E6B] font-semibold">
            <button
              onClick={() => handleLinkClick("home", "about")}
              className="text-left py-2.5 border-b border-[#E5E5E7]/40 hover:text-[#7B52EE]"
            >
              ABOUT HOTEL
            </button>
            <button
              onClick={() => handleLinkClick("home", "studios")}
              className="text-left py-2.5 border-b border-[#E5E5E7]/40 hover:text-[#7B52EE]"
            >
              8 RESIDENCES
            </button>
            <button
              onClick={() => handleLinkClick("home", "amenities")}
              className="text-left py-2.5 border-b border-[#E5E5E7]/40 hover:text-[#7B52EE]"
            >
              AMENITIES
            </button>
            <button
              onClick={() => handleLinkClick("home", "experiences")}
              className="text-left py-2.5 border-b border-[#E5E5E7]/40 hover:text-[#7B52EE]"
            >
              EXPERIENCES
            </button>
            <button
              onClick={() => handleLinkClick("home", "location")}
              className="text-left py-2.5 border-b border-[#E5E5E7]/40 hover:text-[#7B52EE]"
            >
              LOCATION MAP
            </button>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#E5E5E7]">
            <button
              onClick={() => handleLinkClick("portal")}
              className="w-full py-2.5 bg-white text-black border border-[#E5E5E7] rounded-full font-sans text-[11px] font-medium tracking-wide flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <UserSquare2 className="h-3.5 w-3.5 text-[#7B52EE]" />
              <span>CONCIERGE PORTAL ({submittedInquiryCount})</span>
            </button>
            <button
              onClick={() => handleLinkClick("planner")}
              className="w-full py-3 bg-[#7B52EE] hover:bg-[#5E27EA] text-white font-sans text-[11px] font-bold tracking-wide rounded-full flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Calendar className="h-3.5 w-3.5 text-white" />
              <span>BUILD MY STAY</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
