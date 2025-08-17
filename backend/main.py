from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import sqlite3
import json
import os
from datetime import datetime
from typing import List, Dict, Any
import hashlib
from pydantic import BaseModel

app = FastAPI(title="Provenance API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
def init_db():
    conn = sqlite3.connect('database/playground.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            score INTEGER DEFAULT 0,
            badges TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Quiz results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quiz_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            quiz_type TEXT,
            score INTEGER,
            total_questions INTEGER,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
os.makedirs('database', exist_ok=True)
os.makedirs('uploads', exist_ok=True)
init_db()

class UserCreate(BaseModel):
    username: str

class QuizResult(BaseModel):
    username: str
    quiz_type: str
    score: int
    total_questions: int

@app.get("/")
async def root():
    return {"message": "Provenance API"}

@app.post("/analyze")
async def analyze_media(file: UploadFile = File(...)):
    """Analyze uploaded media for authenticity markers"""
    try:
        # Save uploaded file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Mock analysis - in production, integrate C2PA SDK and AI detection
        analysis_result = mock_analyze_file(file_path, file.filename)
        
        return analysis_result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def mock_analyze_file(file_path: str, filename: str) -> Dict[str, Any]:
    """Advanced mock file analysis with realistic C2PA/watermark detection"""
    
    # Generate consistent results based on filename
    file_hash = hashlib.md5(filename.encode()).hexdigest()
    hash_int = int(file_hash[:8], 16)
    
    # Determine authenticity with more sophisticated logic
    if "ai" in filename.lower() or "generated" in filename.lower() or "synthetic" in filename.lower():
        authenticity = "AI-Generated"
        confidence = 0.88 + (hash_int % 12) / 100
        reason = "Multiple AI generation indicators detected"
        risk_level = "high"
    elif "real" in filename.lower() or "authentic" in filename.lower() or "camera" in filename.lower():
        authenticity = "Authentic"
        confidence = 0.92 + (hash_int % 8) / 100
        reason = "Strong provenance signals and content credentials verified"
        risk_level = "low"
    else:
        authenticity = "Inconclusive"
        confidence = 0.45 + (hash_int % 35) / 100
        reason = "Insufficient provenance data for confident determination"
        risk_level = "medium"
    
    # Advanced C2PA metadata simulation
    has_c2pa = hash_int % 3 == 0
    c2pa_data = generate_mock_c2pa_data(has_c2pa, hash_int, authenticity)
    
    # SynthID watermark detection
    synthid_data = generate_mock_synthid_data(hash_int, authenticity)
    
    # EXIF and technical analysis
    technical_analysis = generate_technical_analysis(file_path, hash_int)
    
    # Provenance chain
    provenance_chain = generate_provenance_chain(hash_int, authenticity)
    
    return {
        "authenticity": authenticity,
        "confidence": round(confidence, 2),
        "reason": reason,
        "risk_level": risk_level,
        "c2pa_metadata": c2pa_data,
        "synthid_watermark": synthid_data,
        "technical_analysis": technical_analysis,
        "provenance_chain": provenance_chain,
        "file_info": {
            "name": filename,
            "size": os.path.getsize(file_path) if os.path.exists(file_path) else 0,
            "type": filename.split('.')[-1].upper() if '.' in filename else "UNKNOWN"
        },
        "timestamp": datetime.now().isoformat()
    }

def generate_mock_c2pa_data(has_c2pa: bool, hash_int: int, authenticity: str) -> Dict[str, Any]:
    """Generate realistic C2PA metadata"""
    if not has_c2pa:
        return {
            "present": False,
            "status": "No C2PA manifest found",
            "explanation": "This file does not contain Content Credentials metadata"
        }
    
    creators = ["Canon EOS R5", "iPhone 14 Pro", "Adobe Photoshop", "DALL-E 3", "Midjourney", "Stable Diffusion"]
    actions = ["captured", "edited", "generated", "enhanced", "cropped", "filtered"]
    
    return {
        "present": True,
        "status": "Valid C2PA manifest",
        "creator": creators[hash_int % len(creators)],
        "creation_time": datetime.now().isoformat(),
        "actions": [
            {
                "action": actions[hash_int % len(actions)],
                "software": creators[hash_int % len(creators)],
                "timestamp": datetime.now().isoformat()
            }
        ],
        "signature_valid": authenticity != "AI-Generated",
        "explanation": "Content Credentials verify the creation and editing history of this media"
    }

def generate_mock_synthid_data(hash_int: int, authenticity: str) -> Dict[str, Any]:
    """Generate SynthID watermark detection results"""
    has_watermark = hash_int % 4 == 0 or authenticity == "AI-Generated"
    
    if not has_watermark:
        return {
            "detected": False,
            "confidence": 0.0,
            "explanation": "No invisible watermarks detected using SynthID technology"
        }
    
    return {
        "detected": True,
        "confidence": 0.85 + (hash_int % 15) / 100,
        "watermark_type": "SynthID" if authenticity == "AI-Generated" else "Unknown",
        "generator": "Google Imagen" if hash_int % 2 == 0 else "DeepMind",
        "explanation": "Invisible watermark detected indicating AI-generated content"
    }

def generate_technical_analysis(file_path: str, hash_int: int) -> Dict[str, Any]:
    """Generate technical file analysis"""
    return {
        "compression_artifacts": hash_int % 3 == 0,
        "metadata_consistency": hash_int % 5 != 0,
        "pixel_patterns": {
            "suspicious_regions": hash_int % 7,
            "noise_analysis": "consistent" if hash_int % 2 == 0 else "irregular"
        },
        "exif_data": {
            "camera_make": "Canon" if hash_int % 3 == 0 else None,
            "software": "Adobe Photoshop" if hash_int % 4 == 0 else None,
            "gps_coordinates": hash_int % 6 == 0
        }
    }

def generate_provenance_chain(hash_int: int, authenticity: str) -> List[Dict[str, Any]]:
    """Generate provenance chain history"""
    if authenticity == "AI-Generated":
        return [
            {
                "step": 1,
                "action": "Generated",
                "tool": "AI Model",
                "timestamp": datetime.now().isoformat(),
                "verified": True
            }
        ]
    
    chain = []
    steps = ["Captured", "Imported", "Edited", "Exported"]
    
    for i, step in enumerate(steps[:hash_int % 3 + 1]):
        chain.append({
            "step": i + 1,
            "action": step,
            "tool": "Professional Software",
            "timestamp": datetime.now().isoformat(),
            "verified": hash_int % (i + 2) == 0
        })
    
    return chain

@app.get("/quiz")
async def get_quiz():
    """Get MIL training scenarios for the learning game"""
    quiz_questions = [
        {
            "id": 1,
            "type": "election_scenario",
            "scenario": "Election Misinformation",
            "question": "During election season, you see this image claiming to show a massive rally. What's the most reliable way to verify its authenticity?",
            "options": [
                {"id": "A", "image": "/test-media/election_real_rally.jpg", "label": "Verified Rally Photo"},
                {"id": "B", "image": "/test-media/election_ai_crowd.jpg", "label": "Suspicious Crowd Image"}
            ],
            "correct_answer": "A",
            "explanation": "The verified photo shows proper C2PA metadata from a trusted news source, while the suspicious image lacks provenance data and shows AI generation artifacts in crowd rendering."
        },
        {
            "id": 2,
            "type": "disaster_scenario", 
            "scenario": "Crisis Misinformation",
            "question": "Breaking news shows disaster footage. Which verification method is most important?",
            "image": "/test-media/disaster_real_flood.jpg",
            "options": [
                {"id": "A", "text": "Check social media shares"},
                {"id": "B", "text": "Verify C2PA content credentials and cross-reference with official sources"},
                {"id": "C", "text": "Look at image quality only"},
                {"id": "D", "text": "Count the likes and comments"}
            ],
            "correct_answer": "B",
            "explanation": "C2PA content credentials provide cryptographic proof of origin and editing history, essential for verifying disaster footage authenticity."
        },
        {
            "id": 3,
            "type": "deepfake_detection",
            "scenario": "Celebrity Deepfake",
            "question": "A video shows a celebrity making controversial statements. What should you check first?",
            "options": [
                {"id": "A", "image": "/test-media/celebrity_real_interview.jpg", "label": "Official Interview"},
                {"id": "B", "image": "/test-media/celebrity_ai_deepfake.jpg", "label": "Suspicious Video"}
            ],
            "correct_answer": "A",
            "explanation": "Official interviews have proper content credentials and can be verified through multiple sources, while deepfakes often lack provenance data."
        },
        {
            "id": 4,
            "type": "social_media_literacy",
            "scenario": "Social Media Verification",
            "question": "On social media, how can you distinguish between authentic personal content and AI-generated influencer posts?",
            "options": [
                {"id": "A", "text": "Check follower count"},
                {"id": "B", "text": "Look for SynthID watermarks and content credentials"},
                {"id": "C", "text": "Count engagement rates"},
                {"id": "D", "text": "Check posting frequency"}
            ],
            "correct_answer": "B",
            "explanation": "SynthID watermarks and C2PA content credentials are technical indicators that can definitively identify AI-generated content, unlike social metrics which can be manipulated."
        },
        {
            "id": 5,
            "type": "news_verification",
            "scenario": "Breaking News Analysis",
            "question": "You see breaking news footage of civil unrest. Which image shows proper verification indicators?",
            "options": [
                {"id": "A", "image": "/test-media/news_real_protest.jpg", "label": "Verified News Footage"},
                {"id": "B", "image": "/test-media/news_ai_violence.jpg", "label": "Unverified Content"}
            ],
            "correct_answer": "A",
            "explanation": "Verified news footage includes proper attribution, C2PA metadata, and can be cross-referenced with multiple credible sources."
        }
    ]
    
    return {"questions": quiz_questions}

@app.post("/score")
async def submit_score(result: QuizResult):
    """Submit quiz results and update user score"""
    conn = sqlite3.connect('database/playground.db')
    cursor = conn.cursor()
    
    try:
        # Get or create user
        cursor.execute("SELECT id, score FROM users WHERE username = ?", (result.username,))
        user = cursor.fetchone()
        
        if not user:
            cursor.execute("INSERT INTO users (username, score) VALUES (?, ?)", 
                         (result.username, result.score))
            user_id = cursor.lastrowid
            total_score = result.score
        else:
            user_id, current_score = user
            total_score = current_score + result.score
            cursor.execute("UPDATE users SET score = ? WHERE id = ?", (total_score, user_id))
        
        # Record quiz result
        cursor.execute("""
            INSERT INTO quiz_results (user_id, quiz_type, score, total_questions)
            VALUES (?, ?, ?, ?)
        """, (user_id, result.quiz_type, result.score, result.total_questions))
        
        conn.commit()
        
        return {
            "success": True,
            "new_total_score": total_score,
            "badges_earned": check_badges(total_score)
        }
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

def check_badges(score: int) -> List[str]:
    """Check which badges user has earned"""
    badges = []
    if score >= 10:
        badges.append("First Steps")
    if score >= 50:
        badges.append("Metadata Detective")
    if score >= 100:
        badges.append("Fake-Spotter Pro")
    if score >= 200:
        badges.append("Provenance Master")
    return badges

@app.get("/leaderboard")
async def get_leaderboard():
    """Get top scoring users"""
    conn = sqlite3.connect('database/playground.db')
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT username, score, badges 
        FROM users 
        ORDER BY score DESC 
        LIMIT 10
    """)
    
    results = cursor.fetchall()
    conn.close()
    
    leaderboard = []
    for i, (username, score, badges_json) in enumerate(results):
        badges = json.loads(badges_json) if badges_json else []
        leaderboard.append({
            "rank": i + 1,
            "username": username,
            "score": score,
            "badges": badges
        })
    
    return {"leaderboard": leaderboard}

@app.get("/feed")
async def get_social_feed():
    """Get simulated social media feed with AI labels"""
    feed_posts = [
        {
            "id": 1,
            "username": "@nature_lover",
            "content": "Amazing sunset from my hike today! 🌅",
            "image": "/test-media/sunset_real.jpg",
            "ai_label": None,
            "likes": 234,
            "is_ai": False
        },
        {
            "id": 2,
            "username": "@art_creator",
            "content": "Created this digital artwork using AI tools ✨",
            "image": "/test-media/ai_artwork.jpg",
            "ai_label": "AI-generated content",
            "likes": 156,
            "is_ai": True
        },
        {
            "id": 3,
            "username": "@photographer_pro",
            "content": "Street photography from downtown",
            "image": "/test-media/street_photo.jpg",
            "ai_label": None,
            "likes": 89,
            "is_ai": False
        },
        {
            "id": 4,
            "username": "@tech_enthusiast",
            "content": "Look at this incredible landscape!",
            "image": "/test-media/ai_landscape.jpg",
            "ai_label": None,  # Unlabeled AI content - harder to detect
            "likes": 312,
            "is_ai": True
        }
    ]
    
    return {"posts": feed_posts}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)