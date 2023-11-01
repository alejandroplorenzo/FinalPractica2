import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";

const getClient = async (_req: Request, res: Response) => {
    try{
        const client = await ClientModel.find().exec();
        if (!client) {
            res.status(404).send("Client not found");
            return;
        }
        res.status(200).send(client);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getClient;