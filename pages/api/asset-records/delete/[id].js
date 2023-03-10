import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleDelete(req, res){
    try{
        const data = await prisma.asset.findUnique({
            where : {
                asset_id : parseInt(req.query.id)
            }
        })
        await prisma.asset.update({
            where : {
                asset_id : parseInt(req.query.id)
            },
            data : {
                asset_name : data.member_name,
                isDeleted : true
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