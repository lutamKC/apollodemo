import {useQuery, gql, useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import CelestialObject from "../../src/components/CelestialObject";
import {DELETE_SATELLITE, DELETE_STAR, UPDATE_SATELLITE_MUTATION} from "../../src/graphql/mutations";
import {SATELLITE_QUERY} from "../../src/graphql/queries";
import Head from "next/head";


function SatellitePage() {
    const router = useRouter();
    const {satelliteSlug} = router.query;


    const {data} = useQuery(SATELLITE_QUERY, {variables: {satelliteSlug}});
    const satellite = data?.satellite?.data;

    const [deleteMutationFn] = useMutation(DELETE_SATELLITE);


    const makeProps = (satellite) => {
        const {name, symbol, radius, mass, planet} = satellite;
        const mainObject = {
            name, symbol, radius, mass,
            type: 'Satellite',
            around: {
                name: planet.name, type: 'planets', slug: planet.slug,
                around: {name: planet.star.name, type: 'stars', slug: planet.star.slug}
            }
        };

        const updateObject = {
            mutation: UPDATE_SATELLITE_MUTATION,
            initialFields: {...satellite},
            title: 'satellite'
        };
        delete updateObject.initialFields.name;

        const deleteObject = () => (
            deleteMutationFn({variables: {id: satellite.id}}).then(() => {
                router.push(`/planets/${planet.slug}`);
                setTimeout(() => location.reload(), 1)
            })
        );


        return {mainObject, deleteObject, updateObject};
    }


    return (satellite && <>
            <Head>
                <title>Apollo Demo | {satellite.name}</title>
                <link rel="icon" href="/favicon.png"/>
            </Head><CelestialObject {...makeProps(satellite)} />
        </>);
}

export default SatellitePage;

