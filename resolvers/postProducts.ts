import { Request, Response } from "npm:express@4.18.2";
import ProductsModel from "../db/products.ts"; 

const postProducts = async (req: Request, res: Response) => {
    try{
        const {name, stock, description, price } = req.body;
        if(!name || !price ){
            res.status(400).send("Name and price are required");
            return;
        }

        const alreadyExists = await ProductsModel.findOne({ name }).exec();
        if (alreadyExists) {
          res.status(400).send("Product already exists");
          return;
        }

        const newProduct = new ProductsModel({ name, stock, description, price});
        await newProduct.save();

        res.status(200).send({
            name: newProduct.name,
            stock: newProduct.stock,
            description: newProduct.description,
            price: newProduct.price,
            id: newProduct._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postProducts;