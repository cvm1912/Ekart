import { CreateLocation, GetLocationByAddress, GetAllLocations, GetLocationById } from '../Controller/Location.controller';
import { Router } from 'express';

const router = Router();

router.post('/create',
    /* #swagger.tags = ['Location']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Create a new location',
        schema: {
            name: 'string',
            latitude: 'number',
            longitude: 'number'
        }
    } */
    CreateLocation);

router.get('/geocode',
    /* #swagger.tags = ['Location']
    #swagger.parameters['address'] = {
        in: 'query',
        description: 'Address to geocode',
        required: true,
        type: 'string'
    } */
    GetLocationByAddress);

router.get('/all',
    /* #swagger.tags = ['Location']
    #swagger.description = 'Get all locations' */
    GetAllLocations);

router.get('/:id',
    /* #swagger.tags = ['Location']
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Location ID',
        required: true,
        type: 'string'
    } */
    GetLocationById);

export default router;