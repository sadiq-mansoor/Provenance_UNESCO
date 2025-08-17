#!/usr/bin/env python3
"""
Setup script for Provenance
Creates placeholder test images and initializes the project
"""

import os
from PIL import Image, ImageDraw, ImageFont
import sqlite3

def create_placeholder_image(filename, text, color, size=(800, 600), scenario=None):
    """Create a placeholder image with text and MIL scenario context"""
    img = Image.new('RGB', size, color=color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fall back to default if not available
    try:
        font_large = ImageFont.truetype("arial.ttf", 48)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Main text (centered)
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2 - 40
    
    draw.text((x, y), text, fill='white', font=font_large)
    
    # Scenario context
    if scenario:
        scenario_bbox = draw.textbbox((0, 0), scenario, font=font_small)
        scenario_width = scenario_bbox[2] - scenario_bbox[0]
        scenario_x = (size[0] - scenario_width) // 2
        draw.text((scenario_x, y + 80), scenario, fill=(255,255,255,200), font=font_small)
    
    # Add professional border and watermark area
    draw.rectangle([0, 0, size[0]-1, size[1]-1], outline='white', width=4)
    
    # Add corner indicators for different types
    if 'AI' in filename or 'generated' in filename:
        # AI indicator
        draw.rectangle([size[0]-100, 10, size[0]-10, 40], fill='red', outline='white', width=2)
        draw.text((size[0]-90, 15), 'AI', fill='white', font=font_small)
    elif 'real' in filename or 'authentic' in filename:
        # Authentic indicator  
        draw.rectangle([size[0]-120, 10, size[0]-10, 40], fill='green', outline='white', width=2)
        draw.text((size[0]-110, 15), 'VERIFIED', fill='white', font=font_small)
    
    img.save(f"test-media/{filename}")
    print(f"Created {filename}")

def setup_test_media():
    """Create test media files with MIL scenarios"""
    os.makedirs('test-media', exist_ok=True)
    
    # Election scenario images
    create_placeholder_image('election_real_rally.jpg', 'CAMPAIGN\nRALLY', (34, 139, 34), 
                            scenario='Election 2024 - Verified by Reuters')
    create_placeholder_image('election_ai_crowd.jpg', 'MASSIVE\nCROWD', (220, 20, 60), 
                            scenario='Election 2024 - AI Generated Crowd')
    
    # Disaster scenario images  
    create_placeholder_image('disaster_real_flood.jpg', 'FLOOD\nDAMAGE', (70, 130, 180),
                            scenario='Hurricane Coverage - AP Photo')
    create_placeholder_image('disaster_ai_destruction.jpg', 'CITY\nDESTROYED', (255, 69, 0),
                            scenario='Fake Disaster - AI Generated')
    
    # Breaking news scenarios
    create_placeholder_image('news_real_protest.jpg', 'PEACEFUL\nPROTEST', (34, 139, 34),
                            scenario='Live Coverage - BBC News')
    create_placeholder_image('news_ai_violence.jpg', 'VIOLENT\nCLASHES', (220, 20, 60),
                            scenario='Misleading Content - AI Generated')
    
    # Celebrity/Deepfake scenarios
    create_placeholder_image('celebrity_real_interview.jpg', 'OFFICIAL\nINTERVIEW', (70, 130, 180),
                            scenario='Verified Celebrity Statement')
    create_placeholder_image('celebrity_ai_deepfake.jpg', 'SHOCKING\nSTATEMENT', (138, 43, 226),
                            scenario='Deepfake - AI Generated Face')
    
    # Social media scenarios
    create_placeholder_image('social_real_selfie.jpg', 'VACATION\nSELFIE', (255, 140, 0),
                            scenario='Personal Photo - iPhone 14 Pro')
    create_placeholder_image('social_ai_influencer.jpg', 'PERFECT\nLIFE', (255, 69, 0),
                            scenario='AI Influencer - Synthetic Person')
    
    # Legacy files for compatibility
    create_placeholder_image('real_photo1.jpg', 'AUTHENTIC\nPHOTO', (34, 139, 34))
    create_placeholder_image('ai_photo1.jpg', 'AI\nGENERATED', (220, 20, 60))
    create_placeholder_image('sample_photo.jpg', 'SAMPLE\nIMAGE', (105, 105, 105))

def setup_database():
    """Initialize the database"""
    os.makedirs('database', exist_ok=True)
    
    conn = sqlite3.connect('database/playground.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            score INTEGER DEFAULT 0,
            badges TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
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
    
    # Add some sample data
    cursor.execute("INSERT OR IGNORE INTO users (username, score, badges) VALUES (?, ?, ?)", 
                   ('demo_user', 150, '["First Steps", "Metadata Detective", "Fake-Spotter Pro"]'))
    cursor.execute("INSERT OR IGNORE INTO users (username, score, badges) VALUES (?, ?, ?)", 
                   ('ai_detective', 89, '["First Steps", "Metadata Detective"]'))
    cursor.execute("INSERT OR IGNORE INTO users (username, score, badges) VALUES (?, ?, ?)", 
                   ('media_expert', 234, '["First Steps", "Metadata Detective", "Fake-Spotter Pro", "Provenance Master"]'))
    
    conn.commit()
    conn.close()
    print("Database initialized with sample data")

def main():
    print("Setting up Provenance...")
    
    setup_test_media()
    setup_database()
    
    print("\n✅ Setup complete!")
    print("\nNext steps:")
    print("1. Backend: cd backend && pip install -r requirements.txt && python main.py")
    print("2. Frontend: cd frontend && npm install && npm start")
    print("3. Open http://localhost:3000 in your browser")

if __name__ == "__main__":
    main()