import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleAdd(req, res){

    try{

        if(req.body.name !== ""){
            const result = await prisma.member.create({
            data : {
                member_name : req.body.name,
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