import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts"; 

const postClient = async (req: Request, res: Response) => {
    try{
        const {name, cif } = req.body;
        if(!name || !cif ){
            res.status(400).send("Name and cif are required");
            return;
        }

        const alreadyExists = await ClientModel.findOne({ name }).exec();
        if (alreadyExists) {
          res.status(400).send("Client already exists");
          return;
        }

        const newClient = new ClientModel({ name, cif});
        await newClient.save();

        res.status(200).send({
            name: newClient.name,
            cif: newClient.cif,
            id: newClient._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postClient;