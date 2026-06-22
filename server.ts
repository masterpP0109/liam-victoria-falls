/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client safely
// Guard SDK usage on lazy initialization to avoid crash if variable gets configured later
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      try {
        ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize Gemini Client:", err);
      }
    }
  }
  return ai;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Post endpoint for the AI concierge stay advisor
app.post("/api/gemini/advisor", async (req, res) => {
  const { plannerState } = req.body;

  if (!plannerState) {
    return res.status(400).json({ error: "Missing plannerState in request body" });
  }

  const client = getGeminiClient();

  if (!client) {
    console.log("Gemini API key not configured or invalid. Providing elegant premium mock advice.");
    return res.json({
      advisorAiOutput: `### Warm Greetings from Liam Victoria Falls

Thank you for choosing to customize your stay with us. Based on your preferences (**${plannerState.groupType}** trip for **${plannerState.lengthOfStay} nights** from **${plannerState.startDate || "soon"}**), here is your bespoke schedule:

* **Elegant Arrival**: Our private Mercedes shuttle will retrieve you from Victoria Falls Airport. Arrive to chilled lemongrass towels and fresh-pressed juices poolside.
* **Accommodations Recommendation**: We suggest **${plannerState.roomPreference === "full-property" ? "The Entire 8-Studio Property" : "The Zambezi Sanctuary or Livingstone Suite"}** featuring bespoke airconditioning, custom-carved Zebra woodwork, workspace, and a Nespresso cabinet.
* **Suggested Adventure schedule**:
  1. **Day 1**: Settle in and join our **Manager's Sunset Reception** on the deck followed by our rooftop stargazing.
  2. **Day 2**: A guided trek through the **Victoria Falls rainforest** during morning spray, then wind down with a luxury **Zambezi Sunset River Cruise**.
  3. **Day 3**: Enjoy our complimentary hot English breakfast pooled bedside, followed by local artisanal marketplace shopping.
* **Direct Booking Benefit**: By finalizing this reservation, you secure our best-available nightly rates, complimentary breakfast everyday, and premium airport shuttles.

We await your message to secure this custom plan!`,
    });
  }

  try {
    const prompt = `You are the chief 5-star concierge / digital butler at 'Liam Victoria Falls', a recognized 5-star boutique bed and breakfast in Victoria Falls, Zimbabwe.
Generate a beautiful, luxurious, and warm welcome and personalized advisory letter for a guest.

Here is the guest planner information:
- Guest Name: ${plannerState.guestName || "Respected Guest"}
- Travel Group Type: ${plannerState.groupType} (solo, couple, family, group, honeymoon, business)
- Length of Stay: ${plannerState.lengthOfStay} nights
- Origin Country: ${plannerState.originCountry || "Worldwide"}
- Selected Room Config: ${plannerState.roomPreference}
- Experience Interests: ${plannerState.experienceInterests?.join(", ")}
- Special Requests: ${plannerState.specialRequests || "None"}
- Selected Preferences: ${plannerState.guestPreferences?.join(", ")}

Write a highly engaging, scannable response.
Structure it with markdown formatting:
1. An elegant welcome title.
2. A warm paragraph welcoming them.
3. Specific 'Liam Signature Customizations' based on their group type (e.g. romantic turndown for honeymooners, workspace priorities for business, plunge pool fun & breakfast setup for families).
4. A tailored, high-end recommendation of 2 activities based on their experience interests (mentioning proximity like being just 5 minutes from Victoria Falls National Park).
5. A concluding reassurance about their complimentary English breakfast and our premium standards.

Keep the tone incredibly warm, sophisticated, professional, and focused on converting them to request a booking. Use markdown bullet points and bold sections. Do not mention system-level variables or pricing calculations.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const aiText = response.text || "Your personalized stay plan is prepared.";
    res.json({ advisorAiOutput: aiText });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.json({
      error: error.message,
      advisorAiOutput: `### Bespoke Concierge Consultation Prepared for ${plannerState.guestName || "Respected Guest"}

We successfully stored your stayed preferences for your **${plannerState.lengthOfStay}-night** luxury safari experience.

* **Your Luxury Studio Plan**: Our curated **${plannerState.roomPreference || "Studios"}** is perfectly aligned for your **${plannerState.groupType || "custom"}** stay.
* **Liam Proximity Experience**: You'll enjoy fast 5-minute access to Victoria Falls National Park, local shopping streets, and the upper Zambezi rivers.
* **Next Steps**: Select "Send My Personalized Stay Plan" to transmit this request direct to our reservation desk, or check your timeline in the concierge tab!

Our English breakfasts and cooled poolside sunloungers are ready to welcome you.`,
    });
  }
});

// Chat endpoint for the conversational AI Butler
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  const client = getGeminiClient();

  if (!client) {
    console.log("Gemini API key not configured. Using conversational Butler rule-engine fallback.");
    
    // Intelligent Butler Rule Engine Fallback
    const q = message.trim().toLowerCase();
    const prevText = history && history.length > 1 ? history[history.length - 2]?.text?.toLowerCase() : "";
    const butlerLastText = history && history.length > 0 ? history[history.length - 1]?.text?.toLowerCase() : "";

    let reply = "";

    if (q === "yes") {
      reply = "Wondrous! Allow me to introduce our primary activities: daily safaris to Chobe National Park, a private guided rainforest tour (just 5 minutes away), or a premium Sunset River Cruise. Would you like me to tell you more about one of these?";
    } else if (q === "why") {
      if (butlerLastText.includes("build my stay")) {
        reply = "Because our interactive planner lets you customize daily configurations—such as your bed setup, arrival Mercedes transfers, and specific meal requests. Keeping our capacity restricted to eight rooms allows us to dedicate fully custom service to you, Winston.";
      } else {
        reply = "At Liam, we completely abandon crowded public hotel structures to preserve absolute peacefulness. Individualizing every coordinate of your safari, dining, and suite access ensures a truly custom luxury retreat.";
      }
    } else if (q === "ok how" || q.includes("how can i") || q.includes("how to run") || q.includes("how do i")) {
      reply = "Simply click the 'Build My Stay' button in the navigation or scroll directly to the 'Bespoke Experience Planner' block below. I will then walk you through bedrooms, transfers, and activities in under 2 minutes!";
    } else if (q.includes("itinerary") || q.includes("itinary") || q.includes("craft") || q.includes("schedule")) {
      reply = "To craft your perfect itinerary, I highly recommend using our 'Build My Stay' board. Alternatively, I can draft a 3-day layout here: Day 1 Sunset River Cruise, Day 2 Guided Rainforest Trek, Day 3 Rest on our pool deck. Shall we add this as our baseline?";
    } else if (q.includes("breakfast") || q.includes("eat") || q.includes("food") || q.includes("dinner")) {
      reply = "Our complimentary English breakfast is freshly cooked poolside daily with premium sausage, bacon, eggs, toast, fruit, and single-origin filter coffee. We also schedule private dinners under the stargazing canopy on request.";
    } else if (q.includes("falls") || q.includes("waterfall") || q.includes("mist") || q.includes("distance")) {
      reply = "We are centered precisely 5 minutes (3.5 km) from the Victoria Falls Rainforest boundary. In fact, you can see the falls' iconic white mist column rising behind the treetop horizon straight from our rooftop watchtower.";
    } else if (q.includes("pool") || q.includes("deck") || q.includes("dimensions")) {
      reply = "Our slate composite plunge pool deck measures 6m x 3.5m and is surrounded by premium loungers and desert palms. It's exceptionally clean, peaceful, and entirely void of hotel noise.";
    } else if (q.includes("safari") || q.includes("safaris") || q.includes("adventure") || q.includes("chobe")) {
      reply = "We arrange daily game excursions to Botswana's Chobe National Park (famed for Africa's key elephant populations), private helicopter flips, or walking safaris. Direct shuttle coordinates are included for guests.";
    } else if (q.includes("studio") || q.includes("room") || q.includes("apartment") || q.includes("residence")) {
      reply = "We offer exactly 8 air-conditioned sanctuaries. Each contains high-spec hardwoods, a Nespresso station, automated climate controls, and bespoke concrete rain showers. Let me know if you wish to see a photo of our Zambezi or Livingstone suites!";
    } else {
      reply = "I would be honored to coordinate your coordinates today. We coordinate custom transfers from VFA airport, sunset cruises, and direct reservations at the Falls. Would you like to map these out via our interactive 'Build My Stay' planner?";
    }

    return res.json({ butlerResponse: reply });
  }

  try {
    // Format conversation history correctly inside role-based messages for Gemini
    const contents = [];
    
    if (history && Array.isArray(history)) {
      // Map user/butler history into standard user/model conversation structure
      const historyContext = history.slice(-8); // Limit history context to prevent token overflows
      for (const turn of historyContext) {
        if (turn.text && turn.sender) {
          contents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
    }
    
    // Push final question
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are Winston, the Chief 5-Star Concierge Butler at 'Liam Victoria Falls' in Victoria Falls, Zimbabwe.
You are extremely warm, attentive, helpful, and sophisticated. You speak with premium, elegant, yet deeply humble boutique hospitality standards.
Provide incredibly accurate answers about the estate:
- Our 8 air-conditioned studio suites:
  1. "The Zambezi Sanctuary" ($280/night, direct sliding door access to our plunge pool, Zebra artwork, indigo fabrics)
  2. "The Livingstone Premium" ($295/night, concrete-cast designer vanity, dedicated workspace/writing desk)
  3. "Mosi-oa-Tunya Studio" ($275/night, lofty vaulted ceilings, African hardwood carvings)
  4. "Cataract View Sanctuary" ($290/night, scenic sunrise orientations, bespoke leather details)
  5. "The Baobab Loft" ($310/night, private garden access, luxury seating recess, perfect for quiet stays)
  6. "Victoria Terrace Retreat" ($265/night, closest proximity to the rooftop watchtower, quiet position)
  7. "The Royal Spray Studio" ($320/night, honeymooners' favorite, couples lounging setup)
  8. "The Gorge View Sanctuary" ($250/night, direct garden picnic lawn sliding doorway)
- Plunge Pool Deck: Measures exactly 6m x 3.5m, styled with rich grey slate timber composite decking, premium white sunbeds, and a dark wooden-fenced barbecue area surrounded by tall palms.
- Rooftop Watchtower: Climb up our signature timber watchtower stairs to see columns of the misty Falls spray rising above green treetops under the orange sky.
- Proximity: Conveniently 5 mins drive/ride (3.5 km) from the entrance gates of Victoria Falls National Park rainforest.
- Bikes & Artisans: Walk or ride our complimentary bicycles (on request) down to Elephant's Walk Artist Village (4-minute ride) for beautiful handcarvings.
- Complimentary Breakfast: Daily freshly prepared poolside English breakfast (bacon, sausages, eggs, baked beans, organic juices, premium coffee).
- Mercedes Benz airport transfers: Elite private Mercedes transfers to and from Victoria Falls Airport (VFA).

RULES:
- Answer in 2-3 concise, graceful sentences. Maintain an elegant, easy chat bubble format.
- DO NOT repeat previous phrases or generic greetings once chat has started. Respond to the exact user query.
- Always offer to help them run our interactive "Build My Stay" planner inside the page to finalize booking.`,
        temperature: 0.8,
      }
    });

    const replyText = response.text || "Rest assured, I am here to coordinate every detail of your Victoria Falls journey. Shall we map your stay?";
    res.json({ butlerResponse: replyText });
  } catch (err: any) {
    console.error("Gemini chat endpoint failed, falling back safely:", err);
    res.json({ 
      butlerResponse: "Of course! We are positioned just 5 minutes from Victoria Falls and feature exactly eight beautiful, individual air-conditioned suites. Let's build your custom safari plan using our interactive board."
    });
  }
});

// Setup development or production server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled production assets from /dist folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liam Victoria Falls server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
