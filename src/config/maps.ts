export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export const mapsConfig = {
    apiKey: GOOGLE_MAPS_API_KEY,
    baseUrl: 'https://maps.googleapis.com/maps/api',
    geocodingUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
    placesUrl: 'https://maps.googleapis.com/maps/api/place'
};