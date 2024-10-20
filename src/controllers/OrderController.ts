import { Request, Response } from "express";

import {
	create,
	findAll,
	findAllByUser,
	findOne,
	remove,
} from "../services/OrderService";
import { IPaginationQuery, IReqUser, IReqProduct } from "../utils/interfaces";
import * as Yup from "yup";

export default {
	async create(req: Request, res: Response) {
		/**
		#swagger.tags = ['Orders']
		#swagger.security = [{
		"bearerAuth": []
		}]
		
		#swagger.requestBody = {
			required: true,
			schema: {
				$ref: "#/components/schemas/OrderCreateRequest"
			}
		}
		*/
		try {
			const createdBy = (req as IReqUser).user.id;
			const { orderItems } = req.body
			const result = await create(orderItems, createdBy);
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
		/**
		#swagger.tags = ['Orders']
		
		*/
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

	async findAllByUser(req: Request, res: Response) {
		/**
		#swagger.tags = ['Orders']
		#swagger.security = [{
			"bearerAuth": []
		}]
		*/
		try {
			const userId = (req as IReqUser).user.id;
			const {
				limit = 10,
				page = 1,
				search,
			} = req.query as unknown as IPaginationQuery;

			const result = await findAllByUser(limit, page, userId);
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
		/**
		#swagger.tags = ['Orders']
		#swagger.security = [{
			"bearerAuth": []
		}]
		*/
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

	async delete(req: Request, res: Response) {
		/**
		#swagger.tags = ['Orders']
		#swagger.security = [{
			"bearerAuth": []
		}]
		*/
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