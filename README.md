## Travel Itinerary Backend
##### http://localhost:8000 or 
### Run the app
```bash
uvicorn app.main:app --reload
```

### Seed the database
```bash
python -m app.seed
```

### Endpoints
- POST `/itineraries/` - Create itinerary
- GET `/itineraries/` - View itineraries
- GET `/recommendations/{nights}` - Get recommended itinerary


## Travel Itinerary Frontend
##### http://localhost:3000 
### Run the app
```bash
npm run dev
```

