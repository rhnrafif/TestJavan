import { PrismaClient } from "@prisma/client"
import {} from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleDelete(req, res){
    try{
        await prisma.asset.delete({
            where : {
                asset_id : parseInt(req.query.id)
            }
        })
        .then(()=>{
            res.status(200).json({message : "Asset was deleted"})
        })
    }
    catch(error){
        res.status(500).json({message : "Error"})
    }
}