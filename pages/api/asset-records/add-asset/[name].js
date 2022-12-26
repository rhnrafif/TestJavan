import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleAdd(req, res){

    try{
        const data = await prisma.asset.findFirst({
            where : {
                asset_name : req.query.name,
                isDeleted : false
            }
        })

        if(data == null){
            const result = await prisma.asset.create({
            data : {
                asset_name : req.query.name,
                isDeleted : false
            }
            })
            .then(()=>{
                res.status(201).json({message : "Asset was created"})
            })
        }
        res.status(200).json({ message : data.asset_name })        
    }
    catch(error){
        res.status(200).json({ })
    }

}