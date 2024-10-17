import OrderModel, { Order } from "../models/OrderModel";

interface IFindAll {
    query?: unknown;
    limit: number;
    page: number;
}

const create = async (payload: Order): Promise<Order> => {
	const result = await OrderModel.create(payload);
	return result;
};

const findAll = async (
	query: any,
	limit: number = 10,
	page: number = 1
): Promise<Order[]> => {
	const result = await OrderModel.find(query)
		.limit(limit)
		.skip((page - 1) * limit)
		.sort({ createdAt: -1 });
	return result;
};

const findOne = async (id: string): Promise<Order | null> => {
	const result = await OrderModel.findById(id);
	return result;
};

const update = async (
	id: string,
	payload: Order
): Promise<Order | null> => {
	const result = await OrderModel.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

const remove = async (id: string): Promise<Order | null> => {
	const result = await OrderModel.findOneAndDelete({
		_id: id,
	});
	return result;
};

export { IFindAll, create, findAll, findOne, update, remove };
