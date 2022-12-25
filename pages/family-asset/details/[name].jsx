import {PrismaClient} from "@prisma/client";
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer} from '@chakra-ui/react'
import Link from "next/link";
import {useRouter} from "next/router"
import axios from "axios";

const prisma = new PrismaClient();
export default function FamilyAsset({data = [], member}){

    const router = useRouter();

    //handleDelete
    const handleDelete = async(id)=>{
        
        
        const deleteAsset = await axios.delete(`http://localhost:3000/api/family-asset/delete/${id}`)
        .then((res)=>{
            if(res.status == 200){
                router.push(`/family-asset/details/${member}`)
            }
        })
        .catch((error)=>{
            
        })
    }


    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100' >
                <div className="container min-h-screen flex flex-col items-center pt-5 max-w-lg mx-auto">
                    <div className="my-5 mx-auto text-2xl">
                        <p>{member} Asset List</p>
                    </div>  
                {(data.length > 0) ? (
                    <>
                    <TableContainer>
                        <Table variant='simple' size='sm'>
                            <Thead>
                            <Tr className="text-base">
                                <Th>Name</Th>
                                <Th>Asset</Th>
                                <Th>Price</Th>
                                <Th>Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                        {data.map((e,i)=>(
                            <Tr key={i}>
                                <Td className="font-medium">{e.name}</Td>
                                <Td className="font-medium">{e.asset}</Td>
                                <Td className="font-medium">{e.price}</Td>
                                <Td className="flex gap-2">
                                    <button className="w-[70px] h-[30px] bg-red-500 rounded font-semibold" onClick={()=>{handleDelete(e.id)}}>Delete</button>
                                </Td>
                            </Tr>
                        ))}                                               
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <div className="mt-5 flex gap-5">
                    <Link href={`/family-asset/add-asset/${member}`} className="w-[120px] h-[40px] bg-sky-500 rounded font-semibold flex justify-center items-center text-white" >
                    Add Asset
                    </Link>
                    <button className="w-[120px] h-[40px] bg-gray-900 rounded font-semibold text-white" onClick={()=>{router.back()}}>Back</button>        
                    </div>
                
                </>
                ) : (
                <div>
                    <h3 className="font-semibold">No Asset, Please add some records..</h3>
                </div>)}                    
                
                </div>                
            </main>
        </>
    )
}

export async function getServerSideProps(ctx){

    const result = await prisma.familyAsset.findMany({
        
        where :{
            name : ctx.params.name,
            isDeleted : false
        },
        orderBy : {
            id : 'asc'
        }     
    
    })

    return{
        props:{
            data : result,
            member : ctx.params.name
        }
    }
}