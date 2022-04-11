const __resolveType = (obj) => {
    if (obj.planetId !== undefined) {
        return 'Satellite';
    }
    if (obj.starId !== undefined) {
        return 'Planet';
    }
    return 'Star';
};

const CelestialObjectInterface = {
    __resolveType
}

export default CelestialObjectInterface;
