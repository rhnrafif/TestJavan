import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.body.name !== ""){
        try{
            await prisma.asset.update({
                where:{
                    asset_id : req.body.id
                },
                data : {
                    asset_name : req.body.name
                }
            })
            .then((response)=>{
                res.status(200).json({message : "Asset was Updated"})
            })
        }
        catch(error){
            res.status(500).json({ message: "Error" })
        }        
    }    
}
