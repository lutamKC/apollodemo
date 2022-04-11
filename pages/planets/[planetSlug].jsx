import {useQuery, useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import CelestialObject from "../../src/components/CelestialObject";
import {PLANET_QUERY} from "../../src/graphql/queries";
import {DELETE_PLANET, NEW_SATELLITE_MUTATION, UPDATE_PLANET_MUTATION} from "../../src/graphql/mutations";
import Head from "next/head";


function PlanetPage() {
    const router = useRouter();
    const {planetSlug} = router.query;


    const {data} = useQuery(PLANET_QUERY, {variables: {planetSlug}});
    const planet = data?.planet?.data;

    const [deleteMutationFn] = useMutation(DELETE_PLANET);


    const makeProps = (planet) => {
        const {name, symbol, radius, mass, star, satellites} = planet;
        const mainObject = {
            name, symbol, radius, mass, type: 'Planet',
            around: {name: star.name, slug: star.slug, type: 'stars'}
        };
        const orbitingObjects = {title: 'Satellites', type: 'satellites', list: satellites};

        const newObjectInitialFields = {
            planetId: planet.id,
            name: '',
            radius: 0,
            mass: 0,
            symbol: '',
            perihelion: 0,
            aphelion: 0,
            orbitalPeriod: 0
        };
        const newObject = {mutation: NEW_SATELLITE_MUTATION, initialFields: newObjectInitialFields, title: 'satellite'}


        const updateObject = {
            mutation: UPDATE_PLANET_MUTATION,
            initialFields: {...newObjectInitialFields, ...planet},
            title: 'planet'
        }
        delete updateObject.initialFields.name;

        const deleteObject = () => (
            deleteMutationFn({variables: {id: planet.id}}).then(() => {
                router.push(`/stars/${planet.star.slug}`);
                setTimeout(() => location.reload());
            })
        );

        return {mainObject, orbitingObjects, newObject, deleteObject, updateObject};
    }


    return (planet && <>
        <Head>
            <title>Apollo Demo | {planet.name}</title>
            <link rel="icon" href="/favicon.png"/>
        </Head>
        <CelestialObject {...makeProps(planet)} />
    </>)
}

export default PlanetPage;

