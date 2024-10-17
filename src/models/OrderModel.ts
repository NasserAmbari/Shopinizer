import mongoose, { Types } from "mongoose";

export interface OrderItem {
	name: string;
	productId: Types.ObjectId;
	price: number;
	quantity: number;
}

export interface Order {
	_id?: Types.ObjectId;
	grandTotal: number;
	orderItems: OrderItem[];
    status: "pending" | "completed" | "cancelled";
	createdBy: Types.ObjectId;
}

const Schema = mongoose.Schema;

const OrdersSchema = new Schema<Order>(
	{
		grandTotal: {
			type: Schema.Types.Number,
		},
		orderItems: [
			{
				name: {
					type: Schema.Types.String,
					required: true,
				},
				productId: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				price: {
					type: Schema.Types.Number,
					required: true,
				},
				quantity: {
					type: Schema.Types.Number,
					required: true,
					min: 1,
					max: 5,
				},
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);


const OrdersModel = mongoose.model("Order", OrdersSchema);

export default OrdersModel
