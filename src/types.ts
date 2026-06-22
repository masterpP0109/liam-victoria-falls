/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoomStudio {
  id: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
  capacity: { adults: number; children: number };
  amenities: string[];
  highlights: string[];
  bedType: string;
  sizeSquareMeters: number;
  basePriceNightUSD: number;
}

export interface AmenityItem {
  name: string;
  category: "property" | "room" | "service";
  description: string;
  icon: string;
}

export interface NearbyExperience {
  id: string;
  name: string;
  category: "adventure" | "relaxation" | "cultural" | "nature";
  duration: string;
  description: string;
  icon: string;
  image: string;
  adventureLevel: "mild" | "medium" | "high";
  priceUSD: number;
}

export interface PlannerState {
  step: number;
  originCountry: string;
  groupType: "solo" | "couple" | "family" | "group" | "honeymoon" | "business" | "";
  startDate: string;
  lengthOfStay: number; // in nights
  budgetPreference: "luxury" | "premium-luxury" | "group-booking" | "flexible" | "";
  roomPreference: string;
  experienceInterests: string[]; // e.g. "falls", "safari", "cruise", "shopping", "relaxation", etc.
  guestPreferences: string[]; // e.g., "breakfast", "quiet", "scenic-views", "work-friendly", "family-friendly"
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface ItineraryFeedback {
  suggestedStayType: string;
  estimatedNightlyCost: number;
  estimatedTotalCost: number;
  recommendedRoomIds: string[];
  suggestedActivityIds: string[];
  conciergeNotes: string;
  advisorAiOutput?: string; // Generated from the Gemini endpoint
}

export interface InquiryLead {
  id: string;
  createdAt: string;
  status: "pending" | "reviewed" | "confirmed";
  plannerState: PlannerState;
  itineraryFeedback: ItineraryFeedback;
}

export interface TestimonialItem {
  id: string;
  author: string;
  country: string;
  rating: number;
  content: string;
  aspect: "cleanliness" | "breakfast" | "comfort" | "service" | "location";
  date: string;
}
