import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleDelete(req, res){
    try{
        const data = await prisma.familyAsset.findUnique({
            where : {
                id : parseInt(req.query.id)
            }
        })
        await prisma.familyAsset.update({
            where : {
                id : parseInt(req.query.id)
            },
            data : {
                id : data.id,
                name : data.name,
                asset : data.asset,
                isDeleted : true
            }
        })
        .then(()=>{
            res.status(200).json({message : "Record was deleted"})
        })
    }
    catch(error){
        res.status(500).json({message : "Error"})
    }
}