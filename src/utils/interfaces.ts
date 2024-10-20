import { Request } from "express";

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface IReqUser extends Request {
  user: {
    roles: string[],
    id: string,
  };
};

export interface IReqProduct extends Request {
  product: {
    name: string,
    productId: string,
    price: number,
    quantity: number,
  };
};