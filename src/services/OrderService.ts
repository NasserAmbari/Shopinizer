import { Types } from "mongoose";

import OrderModel, { OrderItems, OrderItem ,Order } from "../models/OrderModel";
import UserModel from "../models/UserModel";
import ProductsModel from "../models/ProductsModel";

interface IFindAll {
    query?: unknown;
    limit: number;
    page: number;
}

const reduceProductsById = async (id: Types.ObjectId, quantity: number): Promise<OrderItem> => {
	const data = await ProductsModel.findById(id);

	if (!data) {
        throw new Error("Product not found");
    }

	if (quantity > data.qty) {
		throw new Error("not enough stock im dorry :(");
	}

	const updatedProduct = await ProductsModel.findByIdAndUpdate(
        id,
        { $inc: { qty: -quantity } }, // Mengurangi quantity
        { new: true } // Mengembalikan produk yang sudah diperbarui
    );
	
	if (!updatedProduct) {
		throw new Error("Failed to update product quantity");
	}

	const product = {
        name: updatedProduct.name,
        productId: updatedProduct._id,
        price: updatedProduct.price,
        qty: updatedProduct.qty, 
    };
	return product;
};

const getGrandTotal = (item: OrderItem[]) => {
	return item.reduce((accumulator,current) => {return accumulator + current.price},0)
}

const create = async (payload: OrderItem[], createdBy: string) => {
	let order: OrderItem[] = [];

	for (const item of payload) {
        const data = await reduceProductsById(item.productId, item.qty);
		const itemOrder = {
			name:data.name,
			productId: data.productId,
			price: data.price * item.qty,
			qty: item.qty,
		};
		order.push(itemOrder);
    }

	const grandTotal = getGrandTotal(order);
	
	const payloadOrder = {
		grandTotal: grandTotal,
		orderItems : order,
		createdBy: createdBy,
		status: "pending"
	}
	   
	const result = await OrderModel.create(payloadOrder);
	return result;
};

const findAll = async (
	query: any,
	limit: number = 10,
	page: number = 1,
): Promise<Order[]> => {
	const result = await OrderModel.find(query)
		.limit(limit)
		.skip((page - 1) * limit)
		.sort({ createdAt: -1 });
	return result;
};


const findAllByUser = async (
	limit: number = 10,
	page: number = 1,
	userId: string
): Promise<Order[]> => {

	const userExists = await UserModel.exists({ _id: userId });

	const result = await OrderModel.find({ createdBy: userId })
		.limit(limit)
		.skip((page - 1) * limit)
		.sort({ createdAt: -1 });
	return result;
};

const findOne = async (id: string): Promise<Order | null> => {
	const result = await OrderModel.findById(id);
	return result;
};

const remove = async (id: string): Promise<Order | null> => {
	const result = await OrderModel.findOneAndDelete({
		_id: id,
	});
	return result;
};

export { IFindAll, create, findAll, findAllByUser, findOne, remove };
