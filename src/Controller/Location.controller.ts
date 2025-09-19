import { Request, Response } from "express";
import prisma from "../config/prisma";
import { mapsConfig } from "../config/maps";
import axios from "axios";

export const CreateLocation = async (Req: Request, Res: Response) => {
    const body = Req.body || {};
    const { name, latitude, longitude } = body;

    if (!name || !latitude || !longitude) {
        return Res.status(400).json({ message: "name, latitude, and longitude are required" });
    }

    const location = await prisma.location.create({
        data: {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
    });

    return Res.status(201).json({
        message: "Location created successfully",
        location
    });
};

// export const GetLocationByAddress = async (Req: Request, Res: Response) => {
//     const { address } = Req.query;

//     if (!address) {
//         return Res.status(400).json({ message: "address is required" });
//     }

//     try {
//         const response = await axios.get(mapsConfig.geocodingUrl, {
//             params: {
//                 address,
//                 key: mapsConfig.apiKey
//             }
//         });

//         const results = response.data.results;
//         if (results.length === 0) {
//             return Res.status(404).json({ message: "Location not found" });
//         }

//         const location = results[0].geometry.location;
//         return Res.status(200).json({
//             address: results[0].formatted_address,
//             latitude: location.lat,
//             longitude: location.lng
//         });
//     } catch (error) {
//         console.error('Geocoding error:', error);
//         return Res.status(500).json({ message: "Failed to get location" });
//     }
// };


export const GetLocationByAddress = async (Req: Request, Res: Response) => {
    const { address } = Req.query;

    if (!address) {
        return Res.status(400).json({ message: "address is required" });
    }

    // Mock geocoding for development (when billing not enabled)
    const mockLocations: { [key: string]: { lat: number, lng: number, formatted: string } } = {
        'delhi': { lat: 28.6139, lng: 77.2090, formatted: 'New Delhi, Delhi, India' },
        'mumbai': { lat: 19.0760, lng: 72.8777, formatted: 'Mumbai, Maharashtra, India' },
        'bangalore': { lat: 12.9716, lng: 77.5946, formatted: 'Bengaluru, Karnataka, India' },
        'new york': { lat: 40.7128, lng: -74.0060, formatted: 'New York, NY, USA' },
        'london': { lat: 51.5074, lng: -0.1278, formatted: 'London, UK' }
    };

    const searchKey = (address as string).toLowerCase();
    const mockResult = Object.keys(mockLocations).find(key => 
        searchKey.includes(key) || key.includes(searchKey)
    );

    if (mockResult) {
        const location = mockLocations[mockResult];
        return Res.status(200).json({
            address: location.formatted,
            latitude: location.lat,
            longitude: location.lng,
            note: "Mock data - Enable Google Cloud Billing for real geocoding"
        });
    }

    return Res.status(404).json({ 
        message: "Location not found in mock data",
        availableLocations: Object.keys(mockLocations),
        note: "Enable Google Cloud Billing for real geocoding"
    });
};
export const GetAllLocations = async (Req: Request, Res: Response) => {
    const locations = await prisma.location.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return Res.status(200).json({
        message: "Locations retrieved successfully",
        locations
    });
};

export const GetLocationById = async (Req: Request, Res: Response) => {
    const { id } = Req.params;

    const location = await prisma.location.findUnique({
        where: { id }
    });

    if (!location) {
        return Res.status(404).json({ message: "Location not found" });
    }

    return Res.status(200).json({
        message: "Location retrieved successfully",
        location
    });
};