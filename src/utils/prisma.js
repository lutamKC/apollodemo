import {makeUpdatedModel} from './dataHandling';
import slugify from 'slugify';

const postGeneric = async (args, prismaModelObject) => {
    const newObject = await prismaModelObject.create({
        data: {
            name: args.name,
            slug: slugify(args.name.toLowerCase()),
            ...makeUpdatedModel(args)
        }
    });
    return {code: 200, data: newObject};
};

const getGeneric = async (args, prismaModelObject) => {
    const retrievedObject = await prismaModelObject.findMany({
        where: {
            slug: {
                equals:`${args.slug}`
            }
        },
    });
    return {code: (retrievedObject.length  ? 200 : 404), data: retrievedObject[0]};
}
const getManyGeneric = async (prismaModelObject) => {
    const retrievedObjects = await prismaModelObject.findMany();
    return {code: 200, data: retrievedObjects};
}

const updateGeneric = async (args, prismaModelObject) => {
    const objectId = parseInt(args.id, 10);
    if (await itExistsAlready(prismaModelObject, objectId)) {
        return prismaModelObject.update({
            where: {
                id: objectId
            },
            data: {...makeUpdatedModel(args)}
        })
        .then((updatedObject) => ({code: 200, data: updatedObject}))
        .catch((e) => {console.log(e); return {code: 500, message: e.meta.cause}});
    }
    return {code: 404}
}

const deleteGeneric = async (args, prismaModelObject) => {
    const objectId = parseInt(args.id, 10);

    if (await itExistsAlready(prismaModelObject, objectId)) {
        return prismaModelObject.delete({
            where: {
                id: objectId
            },
        })
        .then(() => ({code: 200}))
        .catch(() => ({code: 500}));
    }
    return {code: 404}
}

const itExistsAlready = async (prismaModelObject, objectId) => {
    const objectData = await prismaModelObject.findUnique({
        where: {
            id: objectId
        },
    });
    return objectData !== null;
}

const findUniqueByParent = (parent, context, model) => context.prisma[model].findUnique({where: {id: parent.id}})

const relation = (model, name) => (parent, args, context) => findUniqueByParent(parent,context, model)[name]()


const relationsGeneric = (model, fields) => {
    let result = {};
    fields.forEach((fieldName) => {
        result = {
            ...result,
            [fieldName]: relation(model, fieldName)
        }
    });
    return result
}

const prismaUtils = {
    getGeneric, getManyGeneric, postGeneric, updateGeneric, deleteGeneric, relationsGeneric
}

export default prismaUtils;
