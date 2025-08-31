# Report Submission System Setup

## 🚀 Quick Start

### 1. Start the Backend
```bash
python start_backend.py
```
This will start the FastAPI backend on `http://localhost:8000`

### 2. Test the Backend
```bash
python test_report_submission.py
```
This will verify that the report submission system is working correctly.

### 3. Start the Frontend
```bash
cd frontend
npm start
```
The frontend will be available at `http://localhost:3000`

## 📋 Features

### ✅ What Works Now:
- **Complete Report Form** with file upload
- **Real File Upload** (images/videos up to 10MB)
- **Form Validation** 
- **Backend API Integration**
- **Database Storage** (SQLite)
- **Immediate Display** in community feed
- **User Scoring** (50 points per report)
- **Fallback Mode** (works even if backend is down)

### 🔧 How to Use:
1. Click "Report Content" button in the Cases tab
2. Fill out the form:
   - **Title**: Brief description of the content
   - **Description**: Why you think it's suspicious
   - **Location**: Where you found it (optional)
   - **Category**: Type of misinformation
   - **Upload**: Drag & drop or click to upload media
3. Click "Submit Report"
4. Your report appears immediately in the feed

## 🛠️ Troubleshooting

### Backend Not Starting?
- Make sure you have Python 3.7+ installed
- Install dependencies: `pip install fastapi uvicorn python-multipart`
- Check if port 8000 is available

### Frontend Errors?
- The system has a fallback mode that works without the backend
- Reports will be stored locally and displayed immediately
- Check browser console for detailed error messages

### File Upload Issues?
- Maximum file size: 10MB
- Supported formats: JPEG, PNG, GIF, WebP, MP4, WebM
- Make sure the file isn't corrupted

## 📁 File Structure
```
backend/
├── main.py              # FastAPI backend with report endpoints
├── database/            # SQLite database storage
└── uploads/reports/     # Uploaded media files

frontend/src/components/
└── SocialFeed.js        # Report submission UI

test_report_submission.py # Backend testing script
start_backend.py         # Backend startup script
```

## 🔍 API Endpoints

- `POST /submit-report` - Submit new report
- `GET /community-reports` - Get all reports  
- `GET /test` - Test backend connectivity
- `GET /uploads/reports/{filename}` - Serve uploaded files

## 💾 Database Schema

Reports are stored in `community_reports` table with:
- id, title, description, content_type
- location, category, media_path
- submitted_by, verification_status
- upvotes, downvotes, created_at

## 🎯 Next Steps

The report submission system is fully functional! Users can now:
- Upload suspicious content they find online
- Provide detailed descriptions
- See their reports in the community feed
- Earn points for contributing
- Help build a database of real misinformation cases