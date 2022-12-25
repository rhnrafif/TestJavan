import {PrismaClient} from "@prisma/client";
import {useRouter} from "next/router"
import {useForm} from "react-hook-form"
import axios from "axios";

const prisma = new PrismaClient()
export default function Update({data}){

    //useform
    const {handleSubmit, register} = useForm();

    //router
    const router = useRouter();    

    //submitform
    const submitForm = async(e)=>{
        try{

            const request = {
                id : data.member_id,
                name : e.name
            }

            axios.post("http://localhost:3000/api/member/update", request)
            .then((res)=>{
                if(res.status === 200){
                    router.push('/member')
                }
            })
        }
        catch(error){
            
        }
    }

    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100' >
                <div className="w-[360px] h-[220px] p-4 rounded-lg flex flex-col gap-4 justify-around items-center bg-gray-900 mx-auto mt-[200px]">
                    <p className="text-white font-semibold text-2xl">Edit Member Record</p>
                    <form action="" className="flex flex-col items-center" autoComplete="off" onSubmit={handleSubmit(submitForm)} >
                        <div className="flex flex-col gap-4 items-center mb-4">
                            <label htmlFor="name" className="text-lg text-white">New Name</label>
                            <input className="rounded h-8 p-2" type="text" name="name" 
                            {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="w-[100px] h-[40px] rounded-md bg-green-600 text-white">Edit Asset</button>
                            <button onClick={()=>{router.back()}} className="w-[50px] h-[40px] rounded-md bg-slate-300 text-black">Back</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(ctx){

    const result = await prisma.member.findUnique({
        where : {
            member_id : parseInt(ctx.params.id)
        }
    })

    return{
        props :{
            data : result
        }
    }
}