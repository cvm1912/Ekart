

# Enable Google Maps API & Get API Key
1. Go to Google Cloud Console 👉 https://console.cloud.google.com/
2. create a new project and give it a name (e.g., maps-integration) and create 
3. From the left menu → APIs & Services → Library.
4. Search and enable:
    * Maps JavaScript API (needed for embedding maps in frontend)
    * Geocoding API (optional – convert address ↔ lat/lng)
    * Places API (optional – search restaurants, hotels, etc.)
    * Distance Matrix API (optional – calculate distances/routes)

5. Create API Key -> Go to APIs & Services → Credentials. Click Create Credentials → API Key.
6. Secure your API Key (important ⚠️) In the API key settings: Application restrictions: Choose HTTP referrers (if frontend) or IP addresses (if backend).
7. Store API Key in your project If using backend (Node/Express + TS): put it in .env
   * GOOGLE_MAPS_API_KEY=your_api_key_here


# ADD PRISMA ORM

model Location {
  id        String   @id @default(uuid()) // Unique ID
  name      String   // Name of the location (e.g. "Delhi Office")
  latitude  Float    // Latitude (e.g. 28.6139)
  longitude Float    // Longitude (e.g. 77.2090)
  createdAt DateTime @default(now())
}
