import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Tutor Chat Endpoint powered by Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, tutor } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const currentTutor = tutor || "Dr. Elena Vance";
    
    // Construct system instruction based on tutor identity
    let systemInstruction = "";
    if (currentTutor === "Dr. Elena Vance") {
      systemInstruction = `You are Dr. Elena Vance, an elite Humanities and English Language tutor at ScholarElite. 
Your tone is highly academic yet warm, encouraging, and elegant. You speak with intellectual depth but keep things highly accessible for students and parents.
Your goal is to guide the student or parent with structured, insightful replies, using literary analogies or clear grammar examples when appropriate.
Keep your responses concise (1-3 paragraphs) and always remain professional and encouraging.`;
    } else if (currentTutor === "Dr. Markus Chen") {
      systemInstruction = `You are Dr. Markus Chen, a senior Physics and Calculus tutor at ScholarElite.
Your tone is analytical, practical, friendly, and extremely clear. You love breaking down complex equations or laws of physics into simple everyday analogies (like skateboard momentum or boiling water).
Always maintain a supportive and curious scientific mindset. Keep your responses structured (using brief bullet points for steps where appropriate) and around 1-3 paragraphs.`;
    } else {
      systemInstruction = `You are Sarah Johnson, the Support Administrator at ScholarElite.
Your tone is extremely friendly, helpful, highly organized, and professional. You assist parents and students with scheduling, billing, payments, subscription plans, technical issues, and matching them with tutors.
Keep your responses reassuring, clean, and direct.`;
    }

    const client = getGeminiClient();
    if (!client) {
      // Return a simulated high-quality response if Gemini Key is missing
      console.warn("GEMINI_API_KEY is not defined. Falling back to simulated response.");
      const lastMsg = messages[messages.length - 1]?.content || "Hello";
      let mockReply = "";
      
      if (currentTutor === "Dr. Elena Vance") {
        mockReply = `Thank you for reaching out! While the cloud-AI service is currently initializing, I wanted to assure you that your analytical approach to our literary text is highly commendable. Let's look closely at how the narrative structure enhances the themes we discussed in class. Please let me know what specific paragraph you would like to analyze next!`;
      } else if (currentTutor === "Dr. Markus Chen") {
        mockReply = `Great question! While the physics engine is warming up, let's think about this conceptually: the key is to always isolate your variables first. For the gravitational force, remember it's inversely proportional to the square of the distance. Try sketching a free-body diagram and tell me what forces you see acting on the object!`;
      } else {
        mockReply = `Hello there! I'd be absolutely delighted to assist you with your scheduling or subscription options. Our standard monthly package covers comprehensive tutor matches and structured milestone roadmaps. Let me know which module you're interested in booking, and I can coordinate that for you right away!`;
      }

      return res.json({ text: mockReply, simulated: true });
    }

    // Map message list to Gemini contents format
    // We only take the last 10 messages for token efficiency
    const recentMessages = messages.slice(-10);
    const contents = recentMessages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I apologize, I could not generate a response. Please try again." });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Failed to generate tutor response", details: error.message });
  }
});

// Vite / static file serving integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
