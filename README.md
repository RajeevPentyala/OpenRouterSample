# OpenRouter Chat App

A simple React chat application that uses [OpenRouter](https://openrouter.ai/) to talk to AI models for free.

Built as a learning project to demonstrate how to integrate OpenRouter's API with React using plain etch() — no extra libraries needed.

## What You'll Learn

- How to sign up for OpenRouter and get an API key
- How to call AI models using a simple HTTP request
- How to build a chat UI with React

## Tech Stack

- **React** (via Vite) — UI framework
- **OpenRouter API** — AI model gateway
- **NVIDIA Nemotron 3 Super** — Free AI model (1M token context)
- **Plain fetch()** — No SDK needed, just HTTP

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An OpenRouter account and API key ([sign up free](https://openrouter.ai/))

## Quick Start

1. **Clone this repo**
   `ash
   git clone https://github.com/YOUR_USERNAME/openrouter-chat.git
   cd openrouter-chat
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Add your API key**
   - Copy `.env.example` to `.env`
   - Replace `sk-or-v1-your-key-here` with your actual OpenRouter API key
   `ash
   cp .env.example .env
   `

4. **Run the app**
   `ash
   npm run dev
   `

5. **Open in browser** — http://localhost:5173

## How It Works

The app makes a POST request to OpenRouter's chat completions endpoint:

`
POST https://openrouter.ai/api/v1/chat/completions
Headers: Authorization: Bearer YOUR_KEY
Body: { model: "nvidia/nemotron-3-super-120b-a12b:free", messages: [...] }
`

That's it! OpenRouter's API is OpenAI-compatible, so if you've used the OpenAI API before, this works the same way — just pointed at a different URL.

### Why we explicitly specify the model

We pass `nvidia/nemotron-3-super-120b-a12b:free` in our code to tell OpenRouter exactly which model to use. OpenRouter also offers an "Auto Router" feature (`model: "openrouter/auto"`) that automatically picks the best model for each request — but for learning purposes, we explicitly choose our free NVIDIA model so we know exactly what's running and avoid unexpected costs.

## Important Notes

- **Free tier**: The NVIDIA model is free but logs prompts to improve the model. Don't send sensitive data.
- **Rate limits**: Free models have rate limits (~20 requests/minute).
- **API key security**: The key is exposed in browser network tab. This is fine for learning — production apps should proxy through a backend.

## Blog Post

Read the full tutorial: [Step by Step | OpenRouter – Pick a Free AI Model and Build a React Chat App](https://rajeevpentyala.com/2026/05/21/openrouter-pick-a-free-ai-model-and-build-a-react-chat-app/)

## License

MIT
