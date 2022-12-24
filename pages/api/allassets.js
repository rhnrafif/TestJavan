import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export default async function AllAsset(req, res){
    try{

        const data = ""
    }
    catch(error){
        res.status(500).json({message : "Error"})
    }
}