import {ApolloServer} from "apollo-server-micro";
import { PrismaClient } from '@prisma/client';
import {importSchema} from "graphql-import";
import Planet from '../../src/models/planet.model.js';
import Star from '../../src/models/star.model.js';
import Satellite from '../../src/models/satellite.model.js';
import CelestialObjectInterface from '../../src/models/celestialObject.interface.js';


const prisma = new PrismaClient();
const typeDefs = importSchema('./pages/api/schema.graphql');

const resolvers = {

    Query: {
        planet: Planet.get,
        allStars: Star.getMany,
        star: Star.get,
        satellite: Satellite.get
    },
    Mutation: {
        newPlanet: Planet.post,
        updatePlanet: Planet.update,
        deletePlanet: Planet.delete,

        newStar: Star.post,
        updateStar: Star.update,
        deleteStar: Star.delete,

        newSatellite: Satellite.post,
        updateSatellite: Satellite.update,
        deleteSatellite: Satellite.delete,
    },
    // Relations
    Planet: Planet.relations,
    Star: Star.relations,
    Satellite: Satellite.relations,
    // Interfaces
    CelestialObjectInterface


}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    }
});


const startServer = apolloServer.start();

export default async function handler(req, res) {

    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};