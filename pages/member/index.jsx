import {PrismaClient} from "@prisma/client";
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer} from '@chakra-ui/react'
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router"


const prisma = new PrismaClient();
export default function Members({data = []}){


    //router
    const router = useRouter();

    //handle delete
    const handleDelete = async(id)=>{
        
        const res = await axios.delete(`http://localhost:3000/api/member/delete/${id}`)
        .then((res)=>{
            if(res.status === 200){
                router.push('/member')
            }
        })
        .catch((err)=>{})
    }

    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100' >
                <div className="container min-h-screen flex flex-col items-center pt-5 max-w-lg mx-auto">
                    <div className="my-5 mx-auto text-2xl">
                        <p>Family Member List</p>
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
                            <Tr key={e.member_id}>
                                <Td className="font-medium">{e.member_name}</Td>
                                <Td className="flex gap-2">
                                    <Link href={`/member/edit/${e.member_id}`} className="w-[70px] h-[30px] bg-green-600 text-white rounded font-semibold flex justify-center items-center">Update</Link>
                                    <button className="w-[70px] h-[30px] bg-red-500 rounded text-white font-semibold" onClick={()=>{handleDelete(e.member_id)}}>Delete</button>
                                </Td>
                            </Tr>
                        ))}                                               
                            </Tbody>
                        </Table>
                    </TableContainer>

                ) : (
                <div>
                    <h3 className="font-semibold">No Member, Please add some records..</h3>
                </div>)}                    
                
                <div className="mt-5 flex gap-5">
                    <Link href={'/member/add'} className="w-[120px] h-[40px] bg-sky-500 rounded font-semibold flex justify-center items-center text-white" >
                    Add Member
                    </Link>
                    <Link href={'/'} className="w-[80px] h-[40px] bg-gray-900 rounded font-semibold flex justify-center items-center text-white" >
                    Home
                    </Link>         
                </div>
                </div>                
            </main>
        </>
    )
}

export async function getServerSideProps(){
    const result = await prisma.member.findMany({
        where : {
            isDeleted : false
        },
        orderBy : {
            member_id : 'asc'
        }
    })
    
    return{
        props :{
            data : result
        }
    }
}