	import mongoose, { Types } from "mongoose";
	import UserModel from "./UserModel";
	import mail from "../utils/mail";

	export interface OrderItem {
		name: string;
		productId: Types.ObjectId;
		price: number;
		qty: number;
	}

	export interface Order {
		_id?: Types.ObjectId;
		grandTotal: number;
		orderItems: OrderItem[];
		status: "pending" | "completed" | "cancelled";
		createdBy: Types.ObjectId;
	}

	export type OrderItems = OrderItem[];  

	const Schema = mongoose.Schema;
	const emailSender = process.env.ZOHO_EMAIL;

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
					qty: {
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

	OrdersSchema.post("save", async function (doc, next) {
		const order = doc;
		const user = await UserModel.findById(order.createdBy);

		if (!user) {
		  throw new Error(`User with ID ${order.createdBy} not found`);
		}

		const content = await mail.render("OrderInvoice.ejs", {
		  customerName: user?.fullName,
		  orderItems: order.orderItems,
		  grandTotal: order.grandTotal,
		  contactEmail: emailSender,
		  companyName: "Shopinizer",
		  year: new Date().getFullYear(),
		});
	  
		await mail.send({
		  to: user.email,
		  subject: "Register Success",
		  content,
		});
	  
		next();
	  });


	const OrdersModel = mongoose.model("Order", OrdersSchema);

	export default OrdersModel
