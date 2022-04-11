import prismaUtils from '../utils/prisma.js';

const postPlanet = async (parent, args, context) => prismaUtils.postGeneric(args, context.prisma.planet);

const getPlanet = async (parent, args, context) => prismaUtils.getGeneric(args, context.prisma.planet);

const updatePlanet = async (parent, args, context) => prismaUtils.updateGeneric(args, context.prisma.planet, parent);

const deletePlanet = async (parent, args, context) => prismaUtils.deleteGeneric(args, context.prisma.planet);

const relationsPlanet= () => {
    const fields = ['star', 'satellites'];
    return prismaUtils.relationsGeneric('planet', fields);
}


const Planet = {
    post: postPlanet,
    get: getPlanet,
    update: updatePlanet,
    delete: deletePlanet,
    relations: relationsPlanet()
}

export default Planet;
