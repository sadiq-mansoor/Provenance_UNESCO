# 🕵️ Provenance — Media Literacy Platform

*Become a digital truth seeker — learn to spot AI-generated content and protect yourself from misinformation.*

<div align="center">
  <img src="mutemisinfo.png" alt="Provenance" width="800" style="border-radius: 16px;">
</div>

<p align="center">
  <a href="https://provenance.sadiqmansoor.tech/"><img src="https://img.shields.io/badge/Live%20Demo-provenance.sadiqmansoor.tech-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/TensorFlow.js-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

## 🌟 Overview

**Provenance** is an educational platform that teaches media literacy and AI-detection skills through
an interactive, hands-on experience. It turns complex concepts — C2PA content credentials, SynthID
watermarks, provenance-chain analysis — into accessible learning, and pairs them with a live analysis
lab where users upload media and get an authenticity assessment.

**Try it live:** https://provenance.sadiqmansoor.tech/

> **Note on detection:** the analysis lab combines real technical checks (EXIF metadata, compression
> and pixel-pattern analysis) with **simulated** C2PA/SynthID modules that stand in for those
> commercial SDKs. It is a teaching and demonstration tool, not a forensic-grade verifier.

### 🎯 Who it's for
Educators, journalists, and media professionals (primary); students, researchers, and media-literacy
advocates (secondary); and any institution running digital-literacy programs.

## ✨ Key Features

### 🧭 AI Provenance Lab
- Upload images/videos for authenticity analysis with a **traffic-light** (green/yellow/red) risk score
- EXIF metadata inspection, compression-artifact and pixel-pattern analysis
- Simulated C2PA content-credentials and SynthID watermark checks
- Multi-format support (JPG, PNG, WebP, video, audio)

### 🎓 Interactive Learning
- Expert-level media-literacy quiz (deepfakes, AI content, manipulation tactics)
- Forensic Detection Lab with real-vs-fake sample sets across scenarios (elections, disasters, breaking news)
- Social-feed simulation to practice spotting fakes in a realistic environment
- Progress tracking, achievements, and a certification path

### 🏆 Social & Gamification
- Leaderboard, user profiles, progress analytics, and community reports

### 🔍 Fact-Check Lab
- Reverse-image lookup, URL/source credibility checks, and fact search

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18 · Tailwind CSS · Framer Motion · React Router · Radix UI · React Dropzone |
| **Backend** | FastAPI · Uvicorn · Pydantic · SQLite |
| **Media/AI** | Pillow · ExifRead · TensorFlow.js (client-side) · simulated C2PA/SynthID modules |

## 🚀 Quick Start

**Prerequisites:** Python 3.8+ · Node.js 16+ · ~500 MB free space.

```bash
# 1. Initialize test media + database
python setup.py

# 2. Backend
cd backend && pip install -r requirements.txt && python main.py

# 3. Frontend (new terminal)
cd frontend && npm install && npm start
```
Windows/macOS/Linux users can also use the bundled `start.bat` / `start.sh`.

**Access:** Frontend `http://localhost:3000` · API `http://localhost:8000` · API docs `http://localhost:8000/docs`

## 📁 Project Structure

```
setup.py                 # initializes test media + SQLite database
demo_api.py              # API testing / demonstration script
start.bat / start.sh     # automated startup
backend/                 # FastAPI server + endpoints
frontend/                # React app (components: UploadTest, Quiz, ForensicLab, LearningHub, SocialFeed, Leaderboard)
database/playground.db   # user data, scores, progress
test-media/              # curated real-vs-AI sample images by scenario
```

## 📊 Core API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/analyze` | POST | Upload and analyze a media file |
| `/quiz` · `/quiz/submit` | GET/POST | Retrieve questions · submit answers |
| `/leaderboard` | GET | Rankings and stats |
| `/feed` | GET | Simulated social-media posts |
| `/users` | POST | Create a user account |

```bash
curl -X POST "http://localhost:8000/analyze" -F "file=@sample_image.jpg"
```

## 🗺️ From Prototype to Production

To take this beyond a demo you would: swap SQLite for PostgreSQL, add JWT authentication, integrate a
real **C2PA SDK** and production AI-detection models, and add rate limiting, logging, and HTTPS.

## 🙏 Acknowledgments

Educational framing follows the **UNESCO Media and Information Literacy** framework. Built with FastAPI,
React, and the open-source community.

---
<div align="center">
  <strong>Built for digital truth seekers — empowering people to navigate the digital world with confidence.</strong>
</div>
