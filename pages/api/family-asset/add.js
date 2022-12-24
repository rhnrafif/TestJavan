import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleAdd(req, res){

    try{

        if(req.body.name !== ""){
            const result = await prisma.familyAsset.create({
            data : {
                name : req.body.name,
                asset : req.body.asset,
                isDeleted : false
            }
            })
            .then(()=>{
                res.status(201).json({message : "Member was created"})
            })
        }        
    }
    catch(error){
        res.status(500).json({message : "Error"})
    }

}