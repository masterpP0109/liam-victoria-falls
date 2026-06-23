/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoomStudio, AmenityItem, NearbyExperience, TestimonialItem } from "./types";

export const STUDIOS: RoomStudio[] = [
  {
    id: "zambezi-studio",
    name: "The Zambezi Sanctuary",
    tagline: "Individually styled luxury overlooking the landscaped poolside deck",
    description: "Our signature ground-floor luxury studio, styled with contemporary African accents, premium indigo fabrics, and bespoke hand-selected artwork. Features direct sliding door access to the pool deck.",
    images: [
      "uploaded_image:2|https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "uploaded_image:6|https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 1 },
    amenities: [
      "Air Conditioning",
      "Premium Bedding & Linens",
      "Bespoke Work Space",
      "Espresso Maker & Micro-kitchenette",
      "Smart TV with streaming apps",
      "Rainfall Walk-In Shower",
      "In-room Electronic Safe",
      "Plush Bathrobes & Slippers"
    ],
    highlights: ["Ground-floor pool access", "Bespoke zebra artwork", "Fullystocked espresso corner"],
    bedType: "King Bed with Custom Wooden Headboard",
    sizeSquareMeters: 38,
    basePriceNightUSD: 280
  },
  {
    id: "livingstone-suite",
    name: "The Livingstone Premium",
    tagline: "A majestic space combining modern workspace comfort with relaxed elegance",
    description: "Designed for premium comfort, this studio offers generous spacing, an elegant seating recess, and high-specification workspace. Fully air-conditioned with concrete-cast designer bathroom features.",
    images: [
      "uploaded_image:28|https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      "uploaded_image:9|https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 0 },
    amenities: [
      "Air Conditioning",
      "Double Bed with Luxury Matress",
      "Dedicated Workspace and desk",
      "Nespresso Coffee Station",
      "Smart TV",
      "Bespoke Concrete washbasin",
      "Luxury Rainfall Shower",
      "Microwave & Mini-Fridge"
    ],
    highlights: ["Spacious writing desk", "Contemporary dark concrete sinks", "Premium private orientation"],
    bedType: "King Bed",
    sizeSquareMeters: 40,
    basePriceNightUSD: 295
  },
  {
    id: "mosi-studio",
    name: "Mosi-oa-Tunya Studio",
    tagline: "Inspired by 'The Smoke That Thunders' with high ceilings and elevated views",
    description: "An elegant studio option celebrating our proximity to Victoria Falls. Features original local art, high architectural ceilings, and a relaxing seating arrangement with premium leather armchairs.",
    images: [
      "uploaded_image:15|https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 1 },
    amenities: [
      "Air Conditioning",
      "Superb Premium Linens",
      "Comfortable Reading Chair",
      "Espresso Maker",
      "Smart HD TV",
      "Bespoke Rainfall Walk-in Shower",
      "Mini Fridge with complimentary minerals",
      "Private Wardrobe with Safe"
    ],
    highlights: ["High vaulted ceiling", "Viewing tower proximity", "Locally-crafted wooden styling"],
    bedType: "King Bed",
    sizeSquareMeters: 36,
    basePriceNightUSD: 275
  },
  {
    id: "cataract-view",
    name: "Cataract View Sanctuary",
    tagline: "Unrivalled luxury on our upper tier with scenic sunrise views",
    description: "Featuring soft neutral tones, custom leather elements, and beautiful morning light. Features a modern concrete architectural finish in the bathroom and an bespoke mini-bar area.",
    images: [
      "uploaded_image:12|https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 0 },
    amenities: [
      "Air Conditioning",
      "Premium Down Bedding",
      "Work-friendly table and USB connections",
      "Espresso Maker",
      "Bespoke Rain Shower",
      "Premium Bathroom toiletries",
      "Smart TV & high-speed Wi-Fi",
      "In-room safety locker"
    ],
    highlights: ["First-light sunrise view", "Sleek rainfall walk-in shower", "Signature leather seating"],
    bedType: "King Bed",
    sizeSquareMeters: 37,
    basePriceNightUSD: 290
  },
  {
    id: "baobab-loft",
    name: "The Baobab Loft",
    tagline: "A peaceful garden sanctuary designed for relaxation and space",
    description: "Tucked away for ultimate privacy, the Baobab Loft features comfortable leather sofas, customized wooden features, and a tranquil ambient setting. Perfect for long-term stays or focused remote working.",
    images: [
      "uploaded_image:10|https://images.unsplash.com/photo-1611891404779-497061209f4a?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 2 },
    amenities: [
      "Air Conditioning",
      "Comfortable Sleeper Sofa for child",
      "Spacious workspace nook",
      "Espresso Station & Cereal Bar",
      "Smart TV & Soundbar",
      "En-suite designer bathroom",
      "Rainfall Shower & custom washbasin",
      "Private Wardrobe & dressing gowns"
    ],
    highlights: ["Extended workspace footprint", "Private garden view", "Comfortable living recess"],
    bedType: "King Bed + Single Sleeper Sofa",
    sizeSquareMeters: 45,
    basePriceNightUSD: 310
  },
  {
    id: "victoria-terrace",
    name: "Victoria Terrace Retreat",
    tagline: "Direct connection to the rooftop viewing deck and sky-lounge",
    description: "Perfectly placed for guests looking to maximize their time on our rooftop viewing deck. This air-conditioned sanctuary features rich natural finishes and modern hotel features.",
    images: [
      "uploaded_image:21|https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 0 },
    amenities: [
      "Air Conditioning",
      "Premium Linen & Duvet",
      "Cosy study corner",
      "Italian Espresso machine",
      "Smart TV",
      "Modern walk-in concrete shower",
      "Electronic room lock and safe",
      "Complimentary bathrobe and slippers"
    ],
    highlights: ["Closest access to viewing deck", "Quiet orientation", "Custom safari headboards"],
    bedType: "King Bed",
    sizeSquareMeters: 35,
    basePriceNightUSD: 265
  },
  {
    id: "royal-spray",
    name: "The Royal Spray Studio",
    tagline: "Indulgent luxury designed with romantic escapes in mind",
    description: "Liam's favorite honeymoon destination. Exquisite wooden custom craft, luxurious linens, mood lighting, and access to the outdoor terrace. A premium space styled to inspire.",
    images: [
      "uploaded_image:30|https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 0 },
    amenities: [
      "Air Conditioning",
      "Ultra-deluxe King bed with customized headboard",
      "Cozy lounging sofa with ambient lighting",
      "Espresso Machine with local coffee selection",
      "Smart TV and high-end soundbar",
      "Modern grey-cast concrete shower sanctuary",
      "In-room premium bar cabinet",
      "Complimentary champagne on arrival"
    ],
    highlights: ["Honeymoon turndown service available", "Custom couples lounging area", "Close proximity to pool deck"],
    bedType: "Deluxe King Bed",
    sizeSquareMeters: 42,
    basePriceNightUSD: 320
  },
  {
    id: "gorge-sanctuary",
    name: "The Gorge View Sanctuary",
    tagline: "Secluded sanctuary with direct access to the garden picnic area",
    description: "Enjoy natural serenity in this beautifully appointed ground-floor studio. Styled with timber worktops, concrete cast finishes and customized fittings, it provides a perfect baseline of luxury.",
    images: [
      "uploaded_image:14|https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: { adults: 2, children: 1 },
    amenities: [
      "Air Conditioning",
      "Premium Double Bed with luxury topper",
      "Bespoke workspace",
      "Espresso & hot beverage station",
      "Smart Flat-screen TV",
      "En-suite custom rainfall shower",
      "Garden-adjacent sliding doorway",
      "Wardrobe workspace unit"
    ],
    highlights: ["Direct garden entry", "Calm and peaceful positioning", "Handcrafted local artifact styling"],
    bedType: "Double Bed",
    sizeSquareMeters: 34,
    basePriceNightUSD: 250
  }
];

export const AMENITIES: AmenityItem[] = [
  {
    name: "Outdoor Deck & Plunge Pool",
    category: "property",
    description: "A beautifully styled wooden deck and private swimming pool, complete with loungers, perfect for cooling off after exploring the Victoria Falls.",
    icon: "Pool" // correspond to Lucide icon name or handled in UI
  },
  {
    name: "Rooftop Viewing Terrace & Tower",
    category: "property",
    description: "Climb our viewing tower to catch glimpses of the majestic Victoria Falls spray coloring the horizon, or enjoy evening drinks under the African sky.",
    icon: "Compass"
  },
  {
    name: "Complimentary English Breakfast",
    category: "service",
    description: "Freshly prepared. Includes eggs, crisp bacon, premium sausage, baked beans, toast, fresh juices, and hot coffee served poolside.",
    icon: "Coffee"
  },
  {
    name: "Manager's Sunset Reception",
    category: "service",
    description: "Enjoy sunset drinks and local appetizers hosted by the property manager. Connect with fellow travelers and get personalized adventure tips.",
    icon: "Wine"
  },
  {
    name: "High-Specification Workspaces",
    category: "room",
    description: "Individually furnished in each studio, featuring comfortable desk seating, high-speed Wi-Fi, and multiple charging interfaces.",
    icon: "Laptop"
  },
  {
    name: "Garden Picnic Lawn",
    category: "property",
    description: "A beautifully manicured quiet garden area with outdoor seating, ideal for crisp mornings or relaxed afternoon reading.",
    icon: "TreePine"
  },
  {
    name: "High-Speed complimentary Wi-Fi",
    category: "service",
    description: "Stay fully connected with properties-wide high-speed wireless network, ideal for business remote working, checking activities, or streaming.",
    icon: "Wifi"
  },
  {
    name: "Secure Private Parking & Security",
    category: "service",
    description: "Gated entry, secure private parking bays for self-drive guests, and 24/7 dedicated property monitoring for infinite peace of mind.",
    icon: "ShieldCheck"
  }
];

export const EXPERIENCES: NearbyExperience[] = [
  {
    id: "falls-tour",
    name: "Victoria Falls Guided National Park Trek",
    category: "nature",
    duration: "3-4 Hours",
    description: "A fully guided excursion into the Victoria Falls rainforest. Learn about the rich history and geomorphology, and stand before the world's largest falling sheet of water (just 5-mins away!).",
    icon: "CloudRain",
    image: "uploaded_image:3|https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "mild",
    priceUSD: 45
  },
  {
    id: "sunset-cruise",
    name: "Premium Zambezi Sunset River Cruise",
    category: "relaxation",
    duration: "2.5 Hours",
    description: "Glide elegantly past sleeping hippos and elephants on the upper Zambezi. Includes premium drinks, fresh gourmet finger food, and a front-row seat to a dramatic orange African sunset.",
    icon: "Ship",
    image: "uploaded_image:5|https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "mild",
    priceUSD: 85
  },
  {
    id: "helicopter-flight",
    name: "The 'Flight of Angels' Helicopter Tour",
    category: "adventure",
    duration: "15 min Flight",
    description: "The ultimate vantage point. Soar in a state-of-the-art helicopter over the Falls, the deep gorges, and surrounding national parks. Unrivalled travel photography opportunity.",
    icon: "Compass",
    image: "uploaded_image:24|https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "high",
    priceUSD: 175
  },
  {
    id: "chobe-safari",
    name: "Chobe National Park Full-Day Safari (Botswana)",
    category: "nature",
    duration: "Full-Day (10 hrs)",
    description: "Pre-arranged border crossing into Botswana. Includes a riverboat safari on the Chobe river and a land 4x4 game drive to witness Africa's largest elephant population up close.",
    icon: "Compass",
    image: "uploaded_image:25|https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "medium",
    priceUSD: 165
  },
  {
    id: "ele-encounter",
    name: "Elephant Sanctuary & Dinner Experience",
    category: "cultural",
    duration: "4 Hours",
    description: "Meet elephants rescued from drought or poaching, feed them alongside skilled naturalists, followed by an elegant, outdoor dinner under the southern stars.",
    icon: "Sparkles",
    image: "uploaded_image:26|https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "mild",
    priceUSD: 110
  },
  {
    id: "bungee-adventure",
    name: "Victoria Falls Bridge Bungee & Swing",
    category: "adventure",
    duration: "2 Hours",
    description: "Plunge 111 meters into the sheer spectacular gorge of the Zambezi, or ride the bridge swing with the roaring Falls as your canvas. Strictly for the adventure seeker.",
    icon: "Activity",
    image: "uploaded_image:31|https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    adventureLevel: "high",
    priceUSD: 160
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    author: "Elena & David Sterling",
    country: "United Kingdom",
    rating: 5,
    content: "Absolutely magical! Liam Victoria Falls represents the pinnacle of boutique hospitality. We stayed for our honeymoon and the team made us feel like royalty. The Zambezi studio was immaculate, the private plunge pool incredibly clean and refreshing, and climbing the viewing tower in the evening to see the light Victoria Falls mist in the distance is something we will never forget.",
    aspect: "service",
    date: "May 2026"
  },
  {
    id: "t2",
    author: "Marcus Van Wyk",
    country: "South Africa",
    rating: 5,
    content: "Five star classification in every way possible. The cleanliness is of clinical standards, the mini kitchenette and workspaces are wonderfully appointed for a hybrid trip, and the bed comfort is phenomenal. But the highlight has to be the complimentary English breakfast—crisp bacon, sausages, and freshly made eggs that rivalled any top-tier restaurant in London.",
    aspect: "breakfast",
    date: "June 2026"
  },
  {
    id: "t3",
    author: "Keiko Tanaka",
    country: "Japan",
    rating: 5,
    content: "The location is extremely advantageous! It's an easy 5-minute drive into the National Park and nearby artisanal crafts shops. After a busy daily safari, returned to the calm swimming deck and relaxed under the garden canopy. Each bedroom is completely quiet, air-conditioning runs perfectly, and the rainfall walk-in showers feel beautiful.",
    aspect: "location",
    date: "April 2026"
  },
  {
    id: "t4",
    author: "The Patterson Family",
    country: "United States",
    rating: 5,
    content: "We booked multiple studios for our family and it felt exceptionally exclusive. Outstanding pool lounge deck, highly secure, with high-speed WiFi that handled all our devices. The manager hosted a beautiful sunset reception that was so warm and welcoming. We used their stay customizer and it mapped our safari activities flawlessly.",
    aspect: "comfort",
    date: "June 2026"
  }
];
