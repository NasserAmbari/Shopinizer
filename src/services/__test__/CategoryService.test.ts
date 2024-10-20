import mongoose from "mongoose";
import CategoryModel, { Category } from "../../models/CategoriesModel";
import { create, findAll, findOne, remove, update } from "../CategoriesService";

jest.mock("../../models/CategoriesModel");
const mockCategoryModel = CategoryModel as unknown as jest.Mocked<
  typeof CategoryModel
>; 

afterEach(() => {
    mockCategoryModel.find.mockClear();
    mockCategoryModel.create.mockClear();
    mockCategoryModel.findById.mockClear();
    mockCategoryModel.findOneAndUpdate.mockClear();
    mockCategoryModel.findOneAndDelete.mockClear();
});

describe("CategotyService.test.ts", () => {
    test("create", async () => {
        const mockCategories: Category = {
            _id: new mongoose.Types.ObjectId(),
            name: "Electronic",
            description: "Electro Goes bzzz..",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };
    
        const mockCreate = jest.fn().mockResolvedValue(mockCategories);
    
        mockCategoryModel.create.mockImplementation(mockCreate);
    
        const category = await create(mockCategories);
    
        expect(category?._id).toBe(mockCategories._id);
    });

    test("findAll", async () => {
        const mockCategories: Category[] = [
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Electronic",
            description: "Electro Goes bzzz..",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          },
        ];
    
        const mockFind = jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          sort: jest.fn().mockResolvedValue(mockCategories),
        });
    
        mockCategoryModel.find.mockImplementation(mockFind);
    
        const allCategories = await findAll({});
        expect(allCategories.length).toBe(1);
    });

    test("findOne", async () => {
        const mockCategories: Category = {
            _id: new mongoose.Types.ObjectId(),
            name: "Electronic",
            description: "Electro Goes bzzz..",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          };
    
        const mockFindById = jest.fn().mockResolvedValue(mockCategories);
    
        mockCategoryModel.findById.mockImplementation(mockFindById);
    
        const category = await findOne("category-id");
    
        expect(category?.name).toBe(mockCategories.name);
    });

    test("update", async () => {
        const mockId = new mongoose.Types.ObjectId();
        const mockCategories: Category = {
            _id: new mongoose.Types.ObjectId(),
            name: "Electronic",
            description: "Electro Goes bzzz..",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };
    
        const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockCategories);
    
        mockCategoryModel.findOneAndUpdate.mockImplementation(mockFindOneAndUpdate);
    
        const category = await update(mockId.toString(), mockCategories);
    
        expect(category?.name).toBe(mockCategories.name);
    });

    test("remove", async () => {
        const mockId = new mongoose.Types.ObjectId();

        const mockFindOneAndDelete = jest.fn().mockResolvedValue({});

        mockCategoryModel.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

        const category = await remove(mockId.toString());

        expect(category).toEqual({});
    });

    test('sample', () => {
        expect(true).toBeTruthy();
    });
})