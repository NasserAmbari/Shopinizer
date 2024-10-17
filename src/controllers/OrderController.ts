import { Request, Response } from "express";

import {
	create,
	findAll,
	findOne,
	update,
	remove,
} from "../services/OrderService";
import { IPaginationQuery } from "../utils/interfaces";
import * as Yup from "yup";

export default {
	async create(req: Request, res: Response) {
		console.log(req.body);
		console.log("anjr");
		throw new Error();
		try {
			const result = await create(req.body);
			res.status(201).json({
				data: result,
				message: "Success create Order",
			});
		} catch (error) {
			const err = error as Error;
			res.status(500).json({
				data: err.message,
				message: "Failed create Order",
			});
		}
	},

	async findAll(req: Request, res: Response) {
		try {
			const {
				limit = 10,
				page = 1,
				search,
			} = req.query as unknown as IPaginationQuery;

			const query = {};

			if (search) {
				Object.assign(query, {
					name: { $regex: search, $options: "i" },
				});
			}
			const result = await findAll(query, limit, page);
			res.status(200).json({
				data: result,
				message: "Success get all Orders",
			});
		} catch (error) {
			const err = error as Error;
			res.status(500).json({
				data: err.message,
				message: "Failed get all Orders",
			});
		}
	},

	async findOne(req: Request, res: Response) {
		try {
			const result = await findOne(req.params?.id);

			res.status(200).json({
				data: result,
				message: "Success get one Order",
			});
		} catch (error) {
			const err = error as Error;
			res.status(500).json({
				data: err.message,
				message: "Failed get one Order",
			});
		}
	},

	async update(req: Request, res: Response) {
		try {
			const result = await update(req.params?.id, req.body);

			res.status(200).json({
				data: result,
				message: "Success update Order",
			});
		} catch (error) {
			const err = error as Error;
			res.status(500).json({
				data: err.message,
				message: "Failed update Order",
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const result = await remove(req.params?.id);

			res.status(200).json({
				data: result,
				message: "Success delete Order",
			});
		} catch (error) {
			const err = error as Error;
			res.status(500).json({
				data: err.message,
				message: "Failed delete Order",
			});
		}
	},
};


const createValidationSchema = Yup.object().shape({
	name: Yup.string().required(),
	price: Yup.number().required(),
	category: Yup.string().required(),
	description: Yup.string().required(),
	images: Yup.array().of(Yup.string()).required().min(1),
	qty: Yup.number().required().min(1),
});