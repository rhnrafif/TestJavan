import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handleAdd(req, res){

    try{
        const data = await prisma.member.findFirst({
            where : {
                member_name : req.query.name,
                isDeleted : false
            }
        })

        if(data == null){
            const result = await prisma.member.create({
            data : {
                member_name : req.query.name,
                isDeleted : false
            }
            })
            .then(()=>{
                res.status(201).json({message : "Member was created"})
            })
        }
        res.status(200).json({ message : data.member_name })        
    }
    catch(error){
        res.status(200).json({ })
    }

}