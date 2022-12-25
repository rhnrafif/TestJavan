import {PrismaClient} from "@prisma/client";
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer} from '@chakra-ui/react'
import Link from "next/link";
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
                    <>
                    <TableContainer>
                        <Table variant='simple' size='sm'>
                            <Thead>
                            <Tr className="text-base">
                                <Th>Name</Th>
                                <Th>Total Asset</Th>
                                <Th>Total Value</Th>
                                <Th>Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {console.info(data)}
                        {data.map((e,i)=>(
                            <Tr key={i}>
                                <Td className="font-medium">{e.name}</Td>
                                <Td className="font-medium">{e._count.asset}</Td>
                                <Td className="font-medium">{e._sum.price}</Td>
                                <Td className="flex gap-2">
                                    <Link href={`/family-asset/details/${e.name}`} className="w-[70px] h-[30px] bg-sky-500 rounded font-semibold flex justify-center items-center">Details</Link>
                                </Td>
                            </Tr>
                        ))}                                               
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <div className="mt-5 flex gap-5">
                    <Link href={'/family-asset/add'} className="w-[120px] h-[40px] bg-sky-500 rounded font-semibold flex justify-center items-center text-white" >
                    Add Record
                    </Link>
                    <Link href={'/'} className="w-[120px] h-[40px] bg-gray-900 rounded font-semibold flex justify-center items-center text-white" >
                    Home
                    </Link>         
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

export async function getServerSideProps(){

    const result = await prisma.familyAsset.groupBy({
        
        by : ['name'],
        where : {
            isDeleted : false
        },
        _sum : {
            price : true,
        },
        _count : {
            asset : true,
        }
    })
    
    // const result = await prisma.familyAsset.findMany({
        
    //     where :{
    //         isDeleted : false
    //     },
    //     orderBy : {
    //         id : 'asc'
    //     }       
    
    // })

    return{
        props:{
            data : result
        }
    }
}