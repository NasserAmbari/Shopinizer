import { Request, Response } from "express";
import {
	create,
	findAll,
	findOne,
	update,
	remove,
} from "../services/CategoriesService";
import { IPaginationQuery } from "../utils/interfaces";

export default {
  
  async create(req: Request, res: Response) {
    /**
    #swagger.tags = ['Categories']

    #swagger.requestBody = {
      required: true,
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Kendaraan",
            description: "Nama kategori"
          },
          description: {
            type: "string",
            example: "Mobilmu apa yok ?",
            description: "Deskripsi kategori"
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "Kategori berhasil dibuat",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  _id: { type: "string", description: "ID kategori" },
                  name: { type: "string", description: "Nama kategori" },
                  description: { type: "string", description: "Deskripsi kategori" },
                  createdAt: { type: "string", format: "date-time", description: "Tanggal dibuat" },
                  updatedAt: { type: "string", format: "date-time", description: "Tanggal diupdate" }
                }
              },
              message: { type: "string" }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "Gagal membuat kategori",
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
      const result = await create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },

  async findAll(req: Request, res: Response) {
    /**
    #swagger.tags = ['Categories']
    #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Jumlah item yang ditampilkan per halaman',
        required: false,
        type: 'integer',
        example: 10
    }

    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Halaman yang ditampilkan',
        required: false,
        type: 'integer',
        example: 1
    }

    #swagger.parameters['search'] = {
        in: 'query',
        description: 'Pencarian berdasarkan nama kategori',
        required: false,
        type: 'string',
        example: 'Kendaraan'
    }

    #swagger.responses[200] = {
      description: "Berhasil mengambil semua kategori",
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
                    _id: { type: "string", description: "ID kategori" },
                    name: { type: "string", description: "Nama kategori" },
                    description: { type: "string", description: "Deskripsi kategori" },
                    createdAt: { type: "string", format: "date-time", description: "Tanggal dibuat" },
                    updatedAt: { type: "string", format: "date-time", description: "Tanggal diupdate" }
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
      description: "Gagal mengambil kategori",
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
        message: "Success get all products",
      });

    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all products",
      });
    }
  },

  async findOne(req: Request, res: Response) {
    /**
    #swagger.tags = ['Categories']

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID kategori yang ingin diambil',
        required: true,
        type: 'string'
    }

    #swagger.responses[200] = {
      description: "Berhasil mengambil satu kategori",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  _id: { type: "string", description: "ID kategori" },
                  name: { type: "string", description: "Nama kategori" },
                  description: { type: "string", description: "Deskripsi kategori" },
                  createdAt: { type: "string", format: "date-time", description: "Tanggal dibuat" },
                  updatedAt: { type: "string", format: "date-time", description: "Tanggal diupdate" }
                }
              },
              message: { type: "string" }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: "Kategori tidak ditemukan",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "Gagal mengambil kategori",
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
      const result = await findOne(req.params?.id);

      if (!result) {
        return res.status(404).json({
          message: "There is no Categories",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success get one product",
      });

    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },

  async update(req: Request, res: Response) {
    /**
    #swagger.tags = ['Categories']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID kategori yang ingin diupdate',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      required: true,
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Kendaraan",
            description: "Nama kategori"
          },
          description: {
            type: "string",
            example: "Mobilmu apa yok ?",
            description: "Deskripsi kategori"
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "Kategori berhasil diupdate",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  _id: { type: "string", description: "ID kategori" },
                  name: { type: "string", description: "Nama kategori" },
                  description: { type: "string", description: "Deskripsi kategori" },
                  createdAt: { type: "string", format: "date-time", description: "Tanggal dibuat" },
                  updatedAt: { type: "string", format: "date-time", description: "Tanggal diupdate" }
                }
              },
              message: { type: "string" }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "Kategori tidak ditemukan",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "Gagal mengupdate kategori",
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
      const result = await update(req.params?.id, req.body);

      res.status(200).json({
        data: result,
        message: "Success update product",
      });

    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },
  
  async delete(req: Request, res: Response) {
    /**
    #swagger.tags = ['Categories']

    #swagger.security = [{
        "bearerAuth": []
    }]

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID kategori yang ingin dihapus',
        required: true,
        type: 'string'
    }

    #swagger.responses[200] = {
      description: "Kategori berhasil dihapus",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "string",
                description: "ID kategori yang dihapus"
              },
              message: { type: "string" }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: "Kategori tidak ditemukan",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "Gagal menghapus kategori",
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
        message: "Success delete product",
      });
      
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};
