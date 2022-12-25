import { PrismaClient } from "@prisma/client"
import {} from "@prisma/client"

const prisma = new PrismaClient();

export default async function getByName(req, res){
    try{
        await prisma.member.findFirst({
            where : {
                member_name : req.query.name
            }
        }).then((response)=>{
            res.status(200).json({ data : response})
        })
    }
    catch(error){
        res.status(404).json({message : "Not Found"})
    }
}