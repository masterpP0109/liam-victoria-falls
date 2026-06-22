/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles } from "lucide-react";

interface ChatMessage {
  sender: "user" | "butler";
  text: string;
}

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>( [
    {
      sender: "butler",
      text: "Warm greetings! I am Liam's concierge butler. How may I customize your itinerary today? You can ask about our 8 air-conditioned studios, plunge pool deck dimensions, rooftop tower, or nearby safaris.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Quick responder database
  const getButlerResponse = (query: string): string => {
    const q = query.trim().toLowerCase();
    
    // Explicit requested high-end response triggers
    if (
      q === "yes" || 
      q === "why" || 
      q === "ok how" || 
      q.includes("itinary") || 
      q.includes("itinerary") || 
      q.includes("craft") || 
      q.includes("plan") || 
      q.includes("how")
    ) {
      return "Outstanding question. At Liam Victoria Falls, we coordinate curated transfers, daily safaris, sunset river cruises, and custom dining setups. I highly recommend running our interactive 'Build My Stay' planner to map these options perfectly!";
    }
    
    if (q.includes("breakfast")) {
      return "Complimentary poolside English gourmet breakfast is served poolside daily. It includes fresh eggs, crisp bacon, sausage, baked beans, customized local fruits, organic juices, and premium single-origin filter coffees.";
    }
    if (q.includes("falls") || q.includes("waterfall") || q.includes("mist")) {
      return "Our boutique hotel lies exactly 3.5 km (a 5-minute drive/ride) from the Victoria Falls National Park rainforest boundary entrance. Guests can also observe the falls' spectacular mist columns straight from our Rooftop Viewing Deck.";
    }
    if (q.includes("pool") || q.includes("deck") || q.includes("swim") || q.includes("dimensions")) {
      return "The plunge pool measures a tailored 6m x 3.5m with deep wood-deck alignments, perfect for refreshing dips. Several of our residences, such as The Zambezi Sanctuary, have direct ground-floor sliding doors leading poolside.";
    }
    if (q.includes("airport") || q.includes("transfer") || q.includes("shuttle") || q.includes("vfa")) {
      return "We coordiante premium private airport transfers using our pristine Mercedes-Benz luxury sedans. Our driver greets you directly beside the baggage immigration exit gate. You can add this on Step 08 of your custom Stay Plan.";
    }
    if (q.includes("malaria") || q.includes("pills") || q.includes("safe")) {
      return "Victoria Falls is highly secure and peaceful. We advise consulting your personal physician regarding standard malaria precautions before travel. All suites feature fully sealed multi-layer insect-screened windows and silent split aircon.";
    }
    if (q.includes("buyout") || q.includes("buy out") || q.includes("entire") || q.includes("whole") || q.includes("8")) {
      return "We provide an elite private haven of only eight fully climate-controlled suites, combining rigorous five-star services, high-spec work spaces, and personal itinerary curation. You can book the entire property exclusively.";
    }
    if (q.includes("rate") || q.includes("pricing") || q.includes("cost") || q.includes("price")) {
      return "Rates range from $250 to $320 per night, including gourmet poolside breakfast, fast Wi-Fi, and viewing deck access. Our interactive Stay Planner calculates exact totals based on selected durations and guided safaris.";
    }
    return "Outstanding question. At Liam Victoria Falls, we coordinate curated transfers, daily safaris, sunset river cruises, and custom dining setups. I highly recommend running our interactive 'Build My Stay' planner to map these options perfectly!";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    const historySnapshot = [...chatHistory];
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historySnapshot }),
      });
      
      if (!response.ok) {
        throw new Error("Server chat route error status " + response.status);
      }
      
      const data = await response.json();
      const reply = data.butlerResponse || "I am here to coordinate every detail for you.";
      setChatHistory((prev) => [...prev, { sender: "butler", text: reply }]);
    } catch (err) {
      console.error("Gemini server-side route query failed, using direct helper fallback:", err);
      setTimeout(() => {
        const resp = getButlerResponse(userMessage);
        setChatHistory((prev) => [...prev, { sender: "butler", text: resp }]);
      }, 750);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floaty Concierge Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-black text-white hover:bg-black/80 flex items-center justify-center shadow-2xl transition-all duration-300 hover:rotate-[8deg] active:scale-95 group border border-black cursor-pointer relative"
          title="Chat with Concierge Butler"
        >
          <MessageSquare className="h-5.5 w-5.5 group-hover:scale-110 transition-transform text-white" />
          {/* Unread notification dot */}
          <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#00C853] border-2 border-white rounded-full animate-bounce"></span>
        </button>
      )}

      {/* Floating Messenger Box */}
      {isOpen && (
        <div className="bg-white border border-[#E5E5E7] rounded-[24px] w-80 sm:w-85 shadow-2xl overflow-hidden flex flex-col h-[420px] animate-fade-in text-black">
          {/* Header */}
          <div className="bg-[#F5F5F5] p-4.5 border-b border-[#E5E5E7] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-white border border-[#E5E5E7] flex items-center justify-center shadow-sm">
                <Sparkles className="h-4 w-4 text-[#00C853]" />
              </div>
              <div className="text-left animate-pulse">
                <span className="font-serif text-xs font-black text-black leading-none uppercase tracking-wider block">Estate Butler</span>
                <span className="text-[9.5px] font-mono tracking-widest text-[#5F5E6B] block uppercase mt-0.5 font-bold">Concierge Helpdesk</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#5F5E6B] hover:text-[#00C853] hover:bg-[#00C853]/5 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Chat feed */}
          <div className="flex-1 p-4.5 overflow-y-auto space-y-4.5 custom-scrollbar text-xs">
            {chatHistory.map((ch, idx) => (
              <div
                key={idx}
                className={`flex ${ch.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-[18px] p-3 text-left leading-relaxed shadow-sm ${
                    ch.sender === "user"
                      ? "bg-[#00C853] text-white font-semibold"
                      : "bg-white border border-[#E5E5E7] text-black font-light"
                  }`}
                >
                  {ch.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E5E5E7] rounded-[18px] px-4 py-2 text-[#5F5E6B] font-mono text-[9px] uppercase tracking-wider flex items-center space-x-2 animate-pulse shadow-sm">
                  <Loader2 className="h-3 w-3 animate-spin text-[#00C853] shrink-0" />
                  <span> butler drafting...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input control */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#F5F5F5] border-t border-[#E5E5E7] flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about breakfast, falls, pool..."
              className="flex-1 bg-white border border-[#E5E5E7] rounded-full px-4 py-2 text-xs text-black focus:outline-none focus:border-[#00C853] font-sans font-light shadow-inner"
            />
            <button
              type="submit"
              className="p-2 bg-[#00C853] hover:bg-[#00C853]/90 text-white rounded-full transition-all active:scale-90 cursor-pointer shrink-0 shadow-md"
              aria-label="Send messenger message"
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
