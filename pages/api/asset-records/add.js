import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.body.name !== ""){
        try{
            await prisma.asset.create({
                data : {
                    asset_name : req.body.name,
                    isDeleted : false
                }
            })
            .then((response)=>{
                res.status(201).json({message : "Asset was Created"})
            })
        }
        catch(error){
            res.status(500).json({ message: "Error" })
        }        
    }    
}
