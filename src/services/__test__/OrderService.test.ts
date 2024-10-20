import mongoose from "mongoose";
import OrderModel, { Order } from "../../models/OrderModel";
import { create, findAll, findOne, remove } from "../OrderService";

jest.mock("../../models/OrderModel");
const mockOrderModel = OrderModel as unknown as jest.Mocked<
  typeof OrderModel
>; 

afterEach(() => {
    mockOrderModel.find.mockClear();
    mockOrderModel.create.mockClear();
    mockOrderModel.findById.mockClear();
    mockOrderModel.findOneAndDelete.mockClear();
});

describe("OrderService.test.ts", () => {
    test("create", async () => {
        const mockOrder: Order = {
            _id: new mongoose.Types.ObjectId(),
            grandTotal: 20000,
            orderItems: [
                { 
                    name: "Product A",
                    productId: new mongoose.Types.ObjectId(),
                    price: 10000,
                    qty: 2,
                },
            ],
            status: "pending", 
            createdBy: new mongoose.Types.ObjectId(),
        };
    
        const mockCreate = jest.fn().mockResolvedValue(mockOrder);
    
        jest.spyOn(OrderModel, 'create').mockImplementation(mockCreate);
    
        const order = await create(mockOrder.orderItems, mockOrder.createdBy.toString());
    
        expect(order?._id).toEqual(mockOrder._id);
    }, 20000); 
    

    test("findAll", async () => {
        // mockOrder sekarang adalah array yang berisi satu objek Order
        const mockOrder: Order[] = [{
            _id: new mongoose.Types.ObjectId(),
            grandTotal: 20000,
            orderItems: [
                { 
                    name: "Product A",
                    productId: new mongoose.Types.ObjectId(),
                    price: 10000,
                    qty: 2,
                },
            ],
            status: "pending",  
            createdBy: new mongoose.Types.ObjectId(),  
        }]; 
    
        const mockFind = jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockOrder),
        });
    
        mockOrderModel.find.mockImplementation(mockFind);
    
        const allOrder = await findAll({});

        expect(allOrder.length).toBe(1);
    });
    

    test("findOne", async () => {
        const mockOrder: Order = {
            _id: new mongoose.Types.ObjectId(),
            grandTotal: 20000,
            orderItems: [
                { 
                    name: "Product A",
                    productId: new mongoose.Types.ObjectId(),
                    price: 10000,
                    qty: 2,
                },
            ],
            status: "pending",  
            createdBy: new mongoose.Types.ObjectId(),  
        }; 
    
        const mockFindById = jest.fn().mockResolvedValue(mockOrder);
        mockOrderModel.findById.mockImplementation(mockFindById);
    
        const order = await findOne("order-id");
    
    
        expect(order).toEqual(mockOrder);
    });

    test("remove", async () => {
        const mockId = new mongoose.Types.ObjectId();

        const mockFindOneAndDelete = jest.fn().mockResolvedValue({});

        mockOrderModel.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

        const order = await remove(mockId.toString());

        expect(order).toEqual({});
    });
});