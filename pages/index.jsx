import {useQuery, gql, useMutation} from '@apollo/client';
import CelestialObject from "../src/components/CelestialObject";
import {ALL_STARS_QUERY} from "../src/graphql/queries";
import {DELETE_STAR, NEW_STAR_MUTATION} from "../src/graphql/mutations";
import Head from "next/head";


function HomePage() {
    const {data: queryData} = useQuery(ALL_STARS_QUERY);
    const stars = queryData?.allStars?.data;

    const newObjectInitialFields = {name: '', radius: 0, mass: 0, symbol: ''};


    const makeProps = (stars) => {
        const mainObject = {name: 'Universe'};
        const orbitingObjects = {title: 'Stars', type: 'stars', list: stars};

        const newObject = {mutation: NEW_STAR_MUTATION, initialFields: newObjectInitialFields, title: 'star'}
        return {mainObject, orbitingObjects, newObject};
    }

    return (stars && <>
        <Head>
            <title>Apollo Demo | Universe</title>
            <link rel="icon" href="/favicon.png"/>
        </Head>
        <CelestialObject {...makeProps(stars)} />
    </>);
}

export default HomePage;


