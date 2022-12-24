import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleDelete(req, res){
    try{
        const data = await prisma.member.findUnique({
            where : {
                member_id : parseInt(req.query.id)
            }
        })
        await prisma.member.update({
            where : {
                member_id : parseInt(req.query.id)
            },
            data : {
                member_name : data.member_name,
                isDeleted : true
            }
        })
        .then(()=>{
            res.status(200).json({message : "Member was deleted"})
        })
    }
    catch(error){
        res.status(500).json({message : "Error"})
    }
}