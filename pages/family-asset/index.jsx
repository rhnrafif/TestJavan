import {PrismaClient} from "@prisma/client";

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
                                <Th>Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                        {data.map((e)=>(
                            <Tr key={e.asset_id}>
                                <Td className="font-medium">{e.asset_name}</Td>
                                <Td className="flex gap-2">
                                    <Link href={`/asset-records/edit/${e.asset_id}`} className="w-[70px] h-[30px] bg-green-600 text-white rounded font-semibold flex justify-center items-center">Update</Link>
                                    <button className="w-[70px] h-[30px] bg-red-500 rounded font-semibold" onClick={()=>{handleDelete(e.asset_id)}}>Delete</button>
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
        where : {
            id : 'asc'
        }
    })

    return{
        props:{
            data : result
        }
    }
}