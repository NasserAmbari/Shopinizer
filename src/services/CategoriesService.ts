import CategoriesModel, { Category } from "../models/CategoriesModel"

const create = async (payload: Category): Promise<Category> => {
    const result = await CategoriesModel.create(payload);
    return result;
};

const findAll = async (query: any, limit: number = 10, page: number = 1): Promise<Category[]> => {
    const result = await CategoriesModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
    return result;
}

const findOne = async (id: string): Promise<Category | null> => {
    const result = await CategoriesModel.findById(id);
    return result;
}

const update = async (id: string, payload: Category): Promise<Category | null> => {
    const result = await CategoriesModel.findOneAndUpdate({ _id: id}, payload,{ new: true});
    return result;
}

const remove = async (id: string): Promise<Category | null> => {
    const result = await CategoriesModel.findOneAndDelete({_id: id});
    return result;
}

export {
    create,
    findAll,
    findOne,
    update,
    remove
}