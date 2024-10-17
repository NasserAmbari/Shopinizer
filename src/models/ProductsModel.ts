import mongoose, { Types } from "mongoose";

export interface Product {
	_id?: Types.ObjectId;
	name: string;
	description: string;
	images: string[];
	price: number;
	qty: number;
	slug: string;
	categoryId: Types.ObjectId;
	createdAt: string;
	updatedAt: string;
}

const Schema = mongoose.Schema;

const ProductsSchema = new Schema<Product>(
	{
		name: {
			type: Schema.Types.String,
			required: true,
		},
		description: {
			type: Schema.Types.String,
			required: true,
		},
		images: {
			type: [Schema.Types.String],
			required: true,
		},
		price: {
			type: Schema.Types.Number,
			required: true,
		},
		qty: {
			type: Schema.Types.Number,
			required: true,
			min: [1, "Minimal qty adalah 1"],
		},
		slug: {
			type: String,
			unique: true,
		},
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: "Categories",
		},
	},
	{
		timestamps: true,
	}
);

ProductsSchema.pre("save", function (next) {
	const product = this;

	if (!product.slug) {
		product.slug = product.name.toLowerCase().split(" ").join("-");
	}

	next();
});

const ProductsModel = mongoose.model("Products", ProductsSchema);

export default ProductsModel;
