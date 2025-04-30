## Travel Itinerary Backend
##### http://localhost:8000 or 

### Setup 
create an env in travel_backend

install requirements.txt


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

