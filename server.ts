import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { classifyHazardOffline } from './src/utils/hazardClassifier.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client, fallback will be used:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'WorkShield AI',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Hazard Analysis API route
app.post('/api/ai/analyze-hazard', async (req, res) => {
  const { description, industry, department, siteLocation } = req.body;

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ error: 'Description is required' });
  }

  // If Gemini API is available, analyze via gemini-3.8-flash with structured JSON response
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are the WorkShield AI Safety Assistant.
Your task is to analyze occupational safety hazard descriptions reported by workers in Construction sites and University Campus operations (Security, Housekeeping, Facilities & Maintenance).
Classify the hazard into one of these exact categories:
- 'Electrical Hazards'
- 'Unsafe Equipment'
- 'Falls & Heights'
- 'Sanitation & Hygiene'
- 'Harassment & Conduct'
- 'Excessive Working Hours'
- 'Chemical & Hazardous Materials'
- 'Other'

Assess severity as 'Critical', 'High', 'Medium', or 'Low'.
Provide a concise 1-sentence summary, suggested priority, 2-4 key hazard tags, immediate recommended safety mitigation action, and relevant OSHA or standard workforce safety regulation reference.
Always remember AI assessments are suggestions, not verified facts.`;

      const prompt = `Hazard Report:
Industry Context: ${industry || 'General Worksite'} ${department ? `(Department: ${department})` : ''}
Location: ${siteLocation || 'Not specified'}
Worker Description: "${description}"

Analyze this hazard and return JSON.`;

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 4500)
      );

      const geminiPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: 'Hazard category',
              },
              severity: {
                type: Type.STRING,
                description: 'Severity: Critical, High, Medium, or Low',
              },
              summary: {
                type: Type.STRING,
                description: 'Concise 1-sentence summary of the hazard',
              },
              suggestedPriority: {
                type: Type.STRING,
                description: 'Suggested priority: Critical, High, Medium, or Low',
              },
              recommendedAction: {
                type: Type.STRING,
                description: 'Immediate safety mitigation recommendation',
              },
              regulationsReference: {
                type: Type.STRING,
                description: 'Relevant OSHA or industry regulation reference',
              },
              keyHazardsDetected: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2 to 4 key detected danger keywords or tags',
              },
            },
            required: [
              'category',
              'severity',
              'summary',
              'suggestedPriority',
              'recommendedAction',
              'regulationsReference',
              'keyHazardsDetected',
            ],
          },
        },
      });

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        return res.json({
          category: parsed.category || 'Other',
          severity: parsed.severity || 'Medium',
          confidenceScore: 0.95,
          summary: parsed.summary,
          suggestedPriority: parsed.suggestedPriority || 'Medium',
          recommendedAction: parsed.recommendedAction,
          regulationsReference: parsed.regulationsReference,
          keyHazardsDetected: parsed.keyHazardsDetected || [],
          isAiGenerated: true,
          disclaimer:
            'AI Suggestion — Not a Verified Fact. Must be inspected and validated by a qualified site safety officer.',
        });
      }
    } catch (error) {
      console.warn('Gemini API request failed, switching to resilient offline classifier:', error);
      // Fallback below
    }
  }

  // Resilient rule-based classifier fallback
  const fallbackResult = classifyHazardOffline(description);
  return res.json(fallbackResult);
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WorkShield AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start WorkShield server:', err);
  process.exit(1);
});
