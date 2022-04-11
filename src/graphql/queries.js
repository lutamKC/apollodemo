import {gql} from "@apollo/client";

export const STAR_QUERY = gql`
    query fetchData($starSlug: String!){
        star(slug:$starSlug) {code, data {...on Star {id, symbol, name, radius, mass, planets { slug, symbol, name}}}}
    }`

export const ALL_STARS_QUERY = gql`
    {
        allStars{code, data {...on Star {id, name, slug, symbol}}}
    }`;

export const PLANET_QUERY = gql`
    query fetchData($planetSlug: String!){
        planet(slug:$planetSlug) {code, data {...on Planet {id, name, symbol, radius, star{name, slug}, satellites {symbol, slug, name}}}}
    }`;

export const SATELLITE_QUERY = gql`
    query fetchData($satelliteSlug: String!){
        satellite(slug:$satelliteSlug) {code, data {...on Satellite {id, name, symbol, radius, planet {name, slug, star{name, slug}}}}}
    }
`;