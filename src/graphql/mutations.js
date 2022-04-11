import {gql} from "@apollo/client";

export const NEW_STAR_MUTATION = gql`
    mutation newObject($name: String!, $symbol: String, $mass: Int, $radius: Int, ) {
        newStar(name: $name, radius: $radius, mass: $mass, symbol: $symbol) {code, data {...on Star {slug} }}
    }
`;

export const NEW_PLANET_MUTATION = gql`
    mutation newObject($name: String!, $symbol: String, $mass: Int, $radius: Int, $aphelion: Int, $perihelion: Int, $orbitalPeriod: Int, $starId: Int) {
        newPlanet(name: $name, radius: $radius, mass: $mass, symbol: $symbol, aphelion: $aphelion, perihelion: $perihelion, orbitalPeriod: $orbitalPeriod, starId: $starId) {code, data {...on Planet {slug} }}
    }
`;

export const NEW_SATELLITE_MUTATION = gql`
    mutation newObject($name: String!, $symbol: String, $mass: Int, $radius: Int, $aphelion: Int, $perihelion: Int, $orbitalPeriod: Int, $planetId: Int) {
        newSatellite(name: $name, radius: $radius, mass: $mass, symbol: $symbol, aphelion: $aphelion, perihelion: $perihelion, orbitalPeriod: $orbitalPeriod, planetId: $planetId) {code, data {...on Satellite {slug} }}
    }
`;

export const UPDATE_SATELLITE_MUTATION = gql`
    mutation updateObject($id: ID!, $symbol: String, $mass: Int, $radius: Int, $aphelion: Int, $perihelion: Int, $orbitalPeriod: Int) {
        updateSatellite(id: $id, radius: $radius, mass: $mass, symbol: $symbol, aphelion: $aphelion, perihelion: $perihelion, orbitalPeriod: $orbitalPeriod) {code, data {...on Satellite {slug} }}
    }
`;

export const UPDATE_PLANET_MUTATION = gql`
    mutation updateObject($id: ID!, $symbol: String, $mass: Int, $radius: Int, $aphelion: Int, $perihelion: Int, $orbitalPeriod: Int) {
        updatePlanet(id: $id, radius: $radius, mass: $mass, symbol: $symbol, aphelion: $aphelion, perihelion: $perihelion, orbitalPeriod: $orbitalPeriod) {code, data {...on Planet {slug} }}
    }
`;

export const UPDATE_STAR_MUTATION = gql`
    mutation updateObject($id: ID!, $symbol: String, $mass: Int, $radius: Int) {
        updateStar(id: $id, radius: $radius, mass: $mass, symbol: $symbol) {code, data {...on Star {slug} }}
    }
`;



export const DELETE_PLANET = gql`
    mutation deletePlanet($id: ID!) {
        deletePlanet(id: $id) {code}
    }
`;

export const DELETE_STAR = gql`
    mutation deleteStar($id: ID!) {
        deleteStar(id: $id) {code}
    }
`;

export const DELETE_SATELLITE = gql`
    mutation deleteSatellite($id: ID!) {
        deleteSatellite(id: $id) {code}
    }
`;