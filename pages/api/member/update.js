import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.body.name !== ""){
        try{
            await prisma.member.update({
                where:{
                    member_id : req.body.id
                },
                data : {
                    member_name : req.body.name,
                    isDeleted : false
                }
            })
            .then((response)=>{
                res.status(200).json({message : "Member was Updated"})
            })
        }
        catch(error){
            res.status(500).json({ message: "Error" })
        }        
    }    
}
