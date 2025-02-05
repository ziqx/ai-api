import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Route to interact with Ollama
app.post("/api/generate", async (req: any, res: any) => {
  try {
    const { model, prompt } = req.body;

    if (!model || !prompt) {
      return res.status(400).json({ error: "Model and prompt are required" });
    }

    const ollamaResponse = await axios.post(`${OLLAMA_HOST}/api/generate`, {
      model,
      prompt,
    });

    res.json(ollamaResponse.data);
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    res.status(500).json({ error: "Failed to get response from Ollama" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Ziqx AI API is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
