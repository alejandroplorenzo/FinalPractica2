import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/products.ts";

const getProducts = async (_req: Request, res: Response) => {
    try{
        const product = await ProductsModel.find().exec();
        if (!product) {
            res.status(404).send("Product not found");
            return;
        }
        res.status(200).send(product);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getProducts;