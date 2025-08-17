# Development Guide

## Architecture Overview

Provenance Playground is built with a modern web stack:

- **Frontend**: React with TailwindCSS for styling and Framer Motion for animations
- **Backend**: FastAPI (Python) providing REST API endpoints
- **Database**: SQLite for user scores and progress tracking
- **Detection**: Mock implementations ready for real C2PA/AI detection integration

## Key Components

### Backend (`/backend`)
- `main.py` - FastAPI server with all endpoints
- Mock file analysis with placeholder C2PA and watermark detection
- SQLite database for user management and scoring
- CORS enabled for frontend communication

### Frontend (`/frontend/src`)
- `App.js` - Main application with routing and navigation
- `components/UploadTest.js` - File upload and analysis interface
- `components/Quiz.js` - Interactive quiz with scoring
- `components/SocialFeed.js` - Simulated social media feed
- `components/Leaderboard.js` - User rankings and achievements

### Test Media (`/test-media`)
- Placeholder images for testing different scenarios
- Real vs AI-generated content samples
- Used by quiz system and social feed simulation

## Development Workflow

### Adding New Features

1. **Backend API Changes**
   - Add new endpoints in `backend/main.py`
   - Update database schema if needed
   - Test with `demo_api.py`

2. **Frontend Components**
   - Create new components in `frontend/src/components/`
   - Add routes in `App.js` if needed
   - Use TailwindCSS classes for styling

3. **Database Updates**
   - Modify `init_db()` function in `main.py`
   - Update `setup.py` for new sample data

### Integrating Real Detection

Replace mock implementations with real services:

1. **C2PA Integration**
   ```python
   # Replace mock_analyze_file() with:
   from c2pa import C2paReader
   
   def analyze_c2pa(file_path):
       reader = C2paReader(file_path)
       return reader.get_provenance_data()
   ```

2. **AI Detection**
   ```python
   # Add real AI detection:
   from transformers import pipeline
   
   classifier = pipeline("image-classification", 
                        model="umm-maybe/AI-image-detector")
   
   def detect_ai_generation(image_path):
       result = classifier(image_path)
       return result[0]['label'] == 'artificial'
   ```

## Testing

### API Testing
```bash
python demo_api.py
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
1. Start both backend and frontend
2. Upload various file types to test analysis
3. Complete quiz to test scoring system
4. Check leaderboard updates
5. Interact with social feed simulation

## Deployment Considerations

### Production Checklist
- [ ] Replace SQLite with PostgreSQL for scalability
- [ ] Add proper authentication and user management
- [ ] Implement real C2PA SDK integration
- [ ] Add rate limiting and file size restrictions
- [ ] Set up proper CORS policies
- [ ] Add comprehensive error handling
- [ ] Implement logging and monitoring

### Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://...
C2PA_API_KEY=your_key_here
MAX_FILE_SIZE=10MB

# Frontend
REACT_APP_API_URL=https://api.yourapp.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Performance Optimization

- Use React.memo for expensive components
- Implement lazy loading for large media files
- Add caching for API responses
- Optimize image sizes and formats
- Consider CDN for static assets

## Security Notes

- Validate all file uploads
- Sanitize user inputs
- Implement proper CORS policies
- Add rate limiting
- Use HTTPS in production
- Regularly update dependencies