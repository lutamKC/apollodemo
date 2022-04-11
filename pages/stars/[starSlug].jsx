import {useMutation, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import CelestialObject from "../../src/components/CelestialObject";
import {STAR_QUERY} from "../../src/graphql/queries";
import {
    DELETE_STAR,
    NEW_PLANET_MUTATION,
    UPDATE_STAR_MUTATION
} from "../../src/graphql/mutations";
import Head from 'next/head';


function StarPage() {
    const router = useRouter();
    const {starSlug} = router.query;

    const {data} = useQuery(STAR_QUERY, {variables: {starSlug}});
    const star = data?.star?.data;

    const [deleteMutationFn] = useMutation(DELETE_STAR);

    const makeProps = (star) => {
        const {name, symbol, radius, mass} = star;
        const mainObject = {name, symbol, radius, mass, type: 'Star'};
        const orbitingObjects = {title: 'Planets', type: 'planets', list: star.planets};

        const newObjectInitialFields = {
            starId: star.id,
            name: '',
            radius: 0,
            mass: 0,
            symbol: '',
            perihelion: 0,
            aphelion: 0,
            orbitalPeriod: 0
        };
        const newObject = {mutation: NEW_PLANET_MUTATION, initialFields: newObjectInitialFields, title: 'planet'}

        const updateObject = {
            mutation: UPDATE_STAR_MUTATION,
            initialFields: {...star},
            title: 'star'
        };
        delete updateObject.initialFields.name;

        const deleteObject = () => (
            deleteMutationFn({variables: {id: star.id}}).then(() => {
                router.push('/');
                setTimeout(() => location.reload(), 1);
            })
        );

        return {mainObject, orbitingObjects, newObject, deleteObject, updateObject};
    }


    return (star && <>
        <Head>
            <title>Apollo Demo | {star.name}</title>
            <link rel="icon" href="/favicon.png"/>
        </Head>
        <CelestialObject {...makeProps(star)}  />
    </>);
}

export default StarPage;

