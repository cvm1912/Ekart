# Node mailer 
npm i --save-dev @types/nodemailer



# Config 

1.  Generate 6-digit OTP
2.  Get OTP expiry time (2 min)
3.  Generate Token
4.  Hash Password
5.  Compare With HashPassword


# twillio 

npm install twilio
npm install @types/twilio


# Add Twilio Configuration to env 
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER


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



