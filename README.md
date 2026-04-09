# 🪂 AeroForm AI - Indoor Skydiving Form Analyser

An AI agent that analyses photos of indoor skydiving (body flight) sessions to **score your form, give targeted coaching feedback, and track improvement over time**.

Users just drop a photo and go - **no API key or account needed on their end**. The Groq key lives on your server.

\---

## Running it on your computer

### Step 1 - Make sure Node.js is installed

Check by opening your terminal and running:

```bash
node -v
```

If you see a version number (e.g. `v20.11.0`) you're good. If not, download and install it from [nodejs.org](https://nodejs.org) - choose the LTS version.

### Step 2 - Download the project

Either clone it with Git:

```bash
git clone https://github.com/YOUR\_USERNAME/aeroform-ai.git
cd aeroform-ai
```

Or download the ZIP from GitHub, unzip it, then open your terminal and navigate into the folder:

```bash
cd path/to/aeroform-ai
```

### Step 3 - Install dependencies

```bash
npm install
```

This downloads the packages the server needs. Only needs to be done once.

### Step 4 - Start the server

```bash
npm start
```

You should see:

```
  🪂  AeroForm AI running at http://localhost:5001
```

### Step 5 - Open the app

Open your browser and go to:

```
http://localhost:5001
```

Drop in a tunnel photo and get your coaching report. That's it!

\---

## Stopping the server

Press `Ctrl + C` in the terminal window where the server is running.

\---

## Adapting for other sports

Change the `SYSTEM` prompt in `server.js` to coach any sport where form matters - gymnastics, surfing, yoga, martial arts, weightlifting, dance. Just describe what to look for and what JSON structure to return.

\---

## Project structure

```
aeroform-ai/
├── server.js          # Express backend - API key lives here
├── public/
│   └── index.html     # Frontend - users see this in the browser
├── package.json       # Project config and dependencies
├── .env.example       # Copy to .env and add your Groq key
├── .env               # Your local config - never commit this!
└── .gitignore         # Keeps .env and node\_modules out of git
```

\---

## License

MIT - use it, fork it, build on it.

