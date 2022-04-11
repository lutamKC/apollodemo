import prismaUtils from '../utils/prisma.js';

const postStar = async (parent, args, context) => prismaUtils.postGeneric(args, context.prisma.star);

const getStar = async (parent, args, context) => prismaUtils.getGeneric(args, context.prisma.star);

const getManyStars = async (parent, args, context) => prismaUtils.getManyGeneric(context.prisma.star)

const updateStar = async (parent, args, context) => prismaUtils.updateGeneric(args, context.prisma.star);

const deleteStar = async (parent, args, context) => prismaUtils.deleteGeneric(args, context.prisma.star);

const relationsStar = () => {
    const fields = ['planets'];
    return prismaUtils.relationsGeneric('star', fields);
}



const Star = {
    post: postStar,
    get: getStar,
    getMany: getManyStars,
    update: updateStar,
    delete: deleteStar,
    relations: relationsStar()

}


export default Star;