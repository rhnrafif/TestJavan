import {PrismaClient} from "@prisma/client";
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer} from '@chakra-ui/react'
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router"

const prisma = new PrismaClient();
export default function FamilyAsset({data = []}){

    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100' >
                <div className="container min-h-screen flex flex-col items-center pt-5 max-w-lg mx-auto">
                    <div className="my-5 mx-auto text-2xl">
                        <p>Family Asset List</p>
                    </div>  
                {(data.length > 0) ? (

                    <TableContainer>
                        <Table variant='simple' size='sm'>
                            <Thead>
                            <Tr className="text-base">
                                <Th>Name</Th>
                                <Th>Asset</Th>
                                <Th>Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                        {data.map((e)=>(
                            <Tr key={e.id}>
                                <Td className="font-medium">{e.name}</Td>
                                <Td className="font-medium">{e.asset}</Td>
                                <Td className="flex gap-2">
                                    <button className="w-[70px] h-[30px] bg-red-500 rounded font-semibold" onClick={()=>{handleDelete(e.id)}}>Delete</button>
                                </Td>
                            </Tr>
                        ))}                                               
                            </Tbody>
                        </Table>
                    </TableContainer>

                ) : (
                <div>
                    <h3 className="font-semibold">No Asset, Please add some records..</h3>
                </div>)}                    
                
                </div>                
            </main>
        </>
    )
}

export async function getServerSideProps(){

    const result = await prisma.familyAsset.findMany({
        where :{
            isDeleted : false
        },
        orderBy : {
            id : 'asc'
        }
    })

    return{
        props:{
            data : result
        }
    }
}