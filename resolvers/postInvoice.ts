import { Request, Response } from "npm:express@4.18.2";
import InvoiceModel from "../db/invoice.ts";
import ProductsModel from "../db/products.ts"; 

const postInvoice = async (req: Request, res: Response) => {
    try{
        const {client, products} = req.body;
        if(!client || !products ){
            res.status(400).send("Client and products are required");
            return;
        }

        const alreadyExists = await InvoiceModel.findOne({ client }).exec();
        if (alreadyExists) {
          res.status(400).send("Invoice already exists");
          return;
        }

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            const Datos = products[i];
            const { id, stock } = Datos;
            const product = await ProductsModel.findById(id).exec();
            if (!product) {
              res.status(400).send("El producto no existe." );
              return;
            }
            total += product.price * stock;
        }

        const newInvoice = new InvoiceModel({ client, products, total});
        await newInvoice.save();

        res.status(200).send({
            client: newInvoice.client,
            products: newInvoice.products,
            total: newInvoice.total,
            id: newInvoice._id.toString(),
          });


    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default postInvoice;