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
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
							grandTotal: { type: "number" },
							orderItems: {
								type: "array",
								items: {
								type: "object",
								properties: {
									name: { type: "string" },
									productId: { type: "string" },
									price: { type: "number" },
									qty: { type: "number" },
								}
								}
							},
							createdBy: { type: "string" },
							status: { type: "string" }
							}
						}
					}
				}
			}

			#swagger.responses[201] = {
			description: "Order created successfully",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
							data: {
								type: "object",
								properties: {
								_id: { type: "string" },
								grandTotal: { type: "number" },
								orderItems: {
									type: "array",
									items: {
									type: "object",
									properties: {
										name: { type: "string" },
										productId: { type: "string" },
										price: { type: "number" },
										qty: { type: "number" },
										_id: { type: "string" }
									}
									}
								},
								createdBy: { type: "string" },
								status: { type: "string" },
								createdAt: { type: "string", format: "date-time" },
								updatedAt: { type: "string", format: "date-time" }
								}
							},
							message: { type: "string" }
							}
						}
					}
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

		#swagger.security = [{
			"bearerAuth": []
		}]

		#swagger.parameters['limit'] = {
			in: 'query',
			type: 'integer',
			description: 'Jumlah item yang ditampilkan per halaman',
			required: false,
			default: 10
		}

		#swagger.parameters['page'] = {
			in: 'query',
			type: 'integer',
			description: 'Halaman yang diinginkan',
			required: false,
			default: 1
		}

		#swagger.parameters['search'] = {
			in: 'query',
			type: 'string',
			description: 'Cari order berdasarkan nama produk',
			required: false
		}

		#swagger.responses[200] = {
			description: "Daftar orders berhasil didapatkan",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
						data: {
							type: "array",
							items: {
							type: "object",
								properties: {
									_id: { type: "string" },
									grandTotal: { type: "number" },
									orderItems: {
									type: "array",
									items: {
										type: "object",
										properties: {
										name: { type: "string" },
										productId: { type: "string" },
										price: { type: "number" },
										qty: { type: "number" },
										_id: { type: "string" }
										}
									}
									},
									createdBy: { type: "string" },
									status: { type: "string" },
									createdAt: { type: "string", format: "date-time" },
									updatedAt: { type: "string", format: "date-time" }
								}
							}
						},
						message: { type: "string" }
						}
					}
				}
			}
		}
		#swagger.responses[500] = {
			description: "Gagal mendapatkan orders",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
						data: { type: "string" },
						message: { type: "string" }
						}
					}
				}
			}
		}
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

		#swagger.description = 'Endpoint untuk mendapatkan semua orders berdasarkan ID pengguna yang terautentikasi.'
		
		#swagger.security = [{
			"bearerAuth": []
		}]

		#swagger.parameters['limit'] = {
			in: 'query',
			type: 'integer',
			description: 'Jumlah item yang ditampilkan per halaman',
			required: false,
			default: 10
		}
		#swagger.parameters['page'] = {
			in: 'query',
			type: 'integer',
			description: 'Halaman yang diinginkan',
			required: false,
			default: 1
		}
		#swagger.parameters['search'] = {
			in: 'query',
			type: 'string',
			description: 'Cari order berdasarkan nama produk',
			required: false
		}	
	
		#swagger.responses[200] = {
		description: "Daftar orders untuk pengguna berhasil didapatkan",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
						data: {
							type: "array",
							items: {
							type: "object",
								properties: {
										_id: { type: "string" },
										grandTotal: { type: "number" },
										orderItems: {
										type: "array",
										items: {
											type: "object",
											properties: {
											name: { type: "string" },
											productId: { type: "string" },
											price: { type: "number" },
											qty: { type: "number" },
											_id: { type: "string" }
											}
										}
									},
									createdBy: { type: "string" },
									status: { type: "string" },
									createdAt: { type: "string", format: "date-time" },
									updatedAt: { type: "string", format: "date-time" }
								}
							}
						},
						message: { type: "string" }
						}
					}
				}
			}
		}

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
	#swagger.parameters['id'] = {
		in: 'path',
		description: 'ID order yang ingin diambil',
		required: true,
		type: 'string'
	}
   	#swagger.responses[200] = {
      	description: "Detail order berhasil didapatkan",
      	content: {
         	"application/json": {
            	schema: {
					type: "object",
					properties: {
						data: {
							type: "object",
							properties: {
								_id: { type: "string" },
								grandTotal: { type: "number" },
								orderItems: {
								type: "array",
								items: {
									type: "object",
									properties: {
										name: { type: "string" },
										productId: { type: "string" },
										price: { type: "number" },
										qty: { type: "number" },
										_id: { type: "string" }
									}
								}
							},
							createdBy: { type: "string" },
							status: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" }
						}
					},
					message: { type: "string" }
					}
            	}	
         	}
      	}
   	}
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
		#swagger.description = 'Endpoint untuk menghapus order berdasarkan ID.'
		#swagger.parameters['id'] = {
			in: 'path',
			description: 'ID order yang ingin dihapus',
			required: true,
			type: 'string'
		}
		#swagger.responses[200] = {
			description: "Order berhasil dihapus",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							data: {
							type: "string",
							description: "ID order yang dihapus"
							},
							message: { type: "string" }
						}
					}
				}
			}
		}
		#swagger.responses[404] = {
			description: "Order tidak ditemukan",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							data: { type: "string" },
							message: { type: "string" }
						}
					}
				}
			}
		}
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