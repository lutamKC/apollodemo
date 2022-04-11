import prismaUtils from '../utils/prisma.js';

const postSatellite = async (parent, args, context) => prismaUtils.postGeneric(args, context.prisma.satellite);

const getSatellite = async (parent, args, context) => prismaUtils.getGeneric(args, context.prisma.satellite);

const updateSatellite = async (parent, args, context) => prismaUtils.updateGeneric(args, context.prisma.satellite);

const deleteSatellite = async (parent, args, context) => prismaUtils.deleteGeneric(args, context.prisma.satellite);

const relationsSatellite = () => {
    const fields = ['planet'];
    return prismaUtils.relationsGeneric('satellite', fields);
}


const Satellite = {
    post: postSatellite,
    get: getSatellite,
    update: updateSatellite,
    delete: deleteSatellite,
    relations: relationsSatellite()
}

export default Satellite;
